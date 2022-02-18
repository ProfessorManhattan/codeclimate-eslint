const fs = require('fs')

const MINIFIED_AVG_LINE_LENGTH_CUTOFF = 100

/**
 * @param files
 * @param stderr
 */
function BatchSanitizer(files, stderr) {
  this.files = files
  this.stderr = stderr || process.stderr
}

BatchSanitizer.prototype.sanitizedFiles = function () {
  const sanitizedFiles = []

  for (let index = 0; index < this.files.length; index++) {
    if (this.isMinified(this.files[index])) {
      this.stderr.write(`WARN: Skipping ${this.files[index]}: it appears to be minified\n`)
    } else {
      sanitizedFiles.push(this.files[index])
    }
  }

  return sanitizedFiles
}

BatchSanitizer.prototype.isMinified = function (path) {
  const buf = fs.readFileSync(path)
  const newline = '\n'.charCodeAt(0)
  let lineCount = 0
  let charsSeen = 0

  for (const element of buf) {
    if (element === newline) {
      lineCount++
    } else {
      charsSeen++
    }
  }

  return charsSeen / lineCount >= MINIFIED_AVG_LINE_LENGTH_CUTOFF
}

module.exports = BatchSanitizer
