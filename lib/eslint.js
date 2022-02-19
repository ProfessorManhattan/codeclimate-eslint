const fs = require('fs')
const glob = require('glob')
const stream = require('stream')

const patch = require('./eslint-patch')()
const docs = require('./docs')()
const BatchSanitizer = require('./batch-sanitizer')
const EngineConfig = require('./engine-config')
const checks = require('./checks')
const computeFingerprint = require('./compute-fingerprint')

const { ESLint } = patch.eslint
const options = { baseConfig: {}, extensions: ['.js'], ignore: true, useEslintrc: true }

const msInSecond = 1000

/**
 * @param console
 * @param runOptions
 */
async function run(console, runOptions) {
  console.log = console.error

  const configPath = runOptions.configPath || '/config.json'
  const codeDir = runOptions.dir || '/code'

  let cli = null
  let debug = false
  let ignoreWarnings = false
  let sanitizeBatch = true
  const ESLINT_WARNING_SEVERITY = 1

  /**
   * @param name
   * @param start
   */
  function printDebug(name, start) {
    const duration = (Date.now() - start) / msInSecond
    console.error(`eslint.timing.${name}: ${duration}s`)
  }

  // A wrapper for emitting perf timing
  /**
   * @param name
   * @param function_
   */
  function runWithTiming(name, function_) {
    const start = new Date()
    const result = function_()

    if (debug) printDebug(name, start)

    return result
  }

  /**
   * @param name
   * @param function_
   */
  async function runWithTimingAsync(name, function_) {
    const start = new Date()
    const result = await function_()

    if (debug) printDebug(name, start)

    return result
  }

  /**
   * @param check
   */
  function contentBody(check) {
    const content = docs.get(check) || 'For more information visit '

    return `${content}Source: http://eslint.org/docs/rules/\n`
  }

  /**
   * @param message
   * @param path
   */
  function buildIssueJson(message, path) {
    /*
     * ESLint doesn't emit a ruleId in the
     * case of a fatal error (such as an invalid
     * token)
     */
    let checkName = message.ruleId
    if (message.fatal) {
      checkName = 'fatal'
    }
    const line = message.line || 1
    const column = message.column || 1

    const issue = {
      categories: checks.categories(checkName),
      check_name: checkName,
      content: {
        body: contentBody(checkName)
      },
      description: message.message,
      location: {
        path,
        positions: {
          begin: {
            column,
            line
          },
          end: {
            column,
            line
          }
        }
      },
      remediation_points: checks.remediationPoints(checkName, message, cli.calculateConfigForFile(path)),
      type: 'issue'
    }

    const fingerprint = computeFingerprint(path, checkName, message.message)

    if (fingerprint) {
      issue.fingerprint = fingerprint
    }

    const readableStream = new stream.Readable({ objectMode: true })
    readableStream.push(issue, null)

    return readableStream
  }

  /**
   * @param file
   * @param extensions
   */
  function isFileWithMatchingExtension(file, extensions) {
    const stats = fs.lstatSync(file)
    const extension = `.${file.split('.').pop()}`

    return stats.isFile() && !stats.isSymbolicLink() && extensions.includes(extension)
  }

  /**
   * @param file
   */
  function isFileIgnoredByLibrary(file) {
    return cli.isPathIgnored(file)
  }

  /**
   * @param paths
   */
  function prunePathsWithinSymlinks(paths) {
    // Extracts symlinked paths and filters them out, including any child paths
    const symlinks = paths.filter(function (path) {
      return fs.lstatSync(path).isSymbolicLink()
    })

    return paths.filter(function (path) {
      let withinSymlink = false
      for (const symlink of symlinks) {
        if (path.indexOf(symlink) === 0) {
          withinSymlink = true
        }
      }

      return !withinSymlink
    })
  }

  /**
   * @param includePaths
   */
  function inclusionBasedFileListBuilder(includePaths) {
    /*
     * Uses glob to expand the files and directories in includePaths, filtering
     * down to match the list of desired extensions.
     */
    return async function (extensions) {
      const analysisFiles = []

      await Promise.all(
        includePaths.map(function (fileOrDirectory, _index) {
          if (/\/$/u.test(fileOrDirectory)) {
            // If it ends in a slash, expand and push
            const filesInThisDirectory = glob.sync(`${fileOrDirectory}/**/**`)

            return prunePathsWithinSymlinks(filesInThisDirectory).forEach(function (file, _index) {
              const isIgnored = isFileIgnoredByLibrary(file)
              if (!isIgnored && isFileWithMatchingExtension(file, extensions)) {
                analysisFiles.push(file)
              }
            })
          }
          const isIgnored = isFileIgnoredByLibrary(fileOrDirectory)
          if (!isIgnored && isFileWithMatchingExtension(fileOrDirectory, extensions)) {
            return analysisFiles.push(fileOrDirectory)
          }

          return null
        })
      )

      return analysisFiles
    }
  }

  /**
   * @param userConfig
   */
  function overrideOptions(userConfig) {
    if (userConfig.configPath) {
      options.overrideConfigFile = `${codeDir}/${userConfig.configPath}`
      options.useEslintrc = false
    }

    if (userConfig.extensions) {
      options.extensions = userConfig.extensions
    }

    if (userConfig.ignorePath) {
      options.ignorePath = userConfig.ignorePath
    }

    ignoreWarnings = userConfig.ignoreWarnings
    debug = userConfig.debug
    sanitizeBatch = userConfig.sanitizeBatch
  }

  /**
   * @param analysisFiles
   */
  async function analyzeFiles(analysisFiles) {
    let batchFiles = null
    let batchNumber = 0
    let batchReport = null
    const batchSize = 10

    while (analysisFiles.length > 0) {
      batchFiles = analysisFiles.splice(0, batchSize)
      if (sanitizeBatch) {
        batchFiles = new BatchSanitizer(batchFiles).sanitizedFiles()
      }

      if (debug) {
        console.error(`Analyzing: ${batchFiles}`)
      }

      await runWithTimingAsync(`analyze-batch-${batchNumber}`, async function () {
        batchReport = await cli.lintFiles(batchFiles)
      })

      runWithTiming(`report-batch${batchNumber}`, function () {
        for (const result of batchReport) {
          const path = result.filePath.replace(/^\/code\//u, '')

          for (const message of result.messages) {
            let output = ''
            if (ignoreWarnings && message.severity === ESLINT_WARNING_SEVERITY) {
              continue
            }

            const readableJsonStream = buildIssueJson(message, path)
            readableJsonStream.on('data', (chunk) => {
              output += `${JSON.stringify(chunk)}`
            })
            readableJsonStream.on('end', () => process.stdout.write(`${output}\u0000\n`))
          }
        }
      })
      runWithTiming(`gc-batch-${batchNumber}`, function () {
        batchFiles = null
        batchReport = null
        global.gc()
      })

      batchNumber++
    }
  }

  /**
   *
   */
  function logInfo() {
    const printList = function (list) {
      const [first, ...rest] = list.sort()
      console.error(`\t * ${first}${rest.join('\n\t * ')}`)
    }

    const disabledRules = patch.disabledRules()
    if (disabledRules.length > 0) {
      console.error('Ignoring the following rules that rely on module resolution:')
      printList(disabledRules)
    }

    const removedSettings = patch.removedSettings()
    if (removedSettings.length > 0) {
      console.error('Ignoring the following settings that rely on module resolution:')
      printList(removedSettings)
    }

    const skippedModules = patch.skippedModules()
    if (skippedModules.length > 0) {
      console.error('Skipped modules')
      printList(skippedModules)
    }

    const loadedModules = patch.loadedModules()
    if (loadedModules.length > 0) {
      console.error('Loaded modules')
      printList(loadedModules)
    }
  }

  // No explicit includes, let's try with everything
  let buildFileList = inclusionBasedFileListBuilder(['./'])

  runWithTiming('engineConfig', function () {
    if (fs.existsSync(configPath)) {
      const engineConfig = new EngineConfig(configPath)

      if (engineConfig.includePaths) {
        buildFileList = inclusionBasedFileListBuilder(engineConfig.includePaths)
      }

      overrideOptions(engineConfig.userConfig)
    }
  })

  cli = new ESLint(options)

  const analysisFiles = await runWithTimingAsync('buildFileList', function () {
    return buildFileList(options.extensions)
  })

  await analyzeFiles(analysisFiles)

  logInfo()
}

module.exports = { run }
