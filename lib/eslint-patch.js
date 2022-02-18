const {
  Legacy: { ConfigArray, ConfigArrayFactory }
} = require('@eslint/eslintrc')

const RULES_BLOCKLIST = [
  'import/extensions',
  'import/no-restricted-paths',
  'import/no-unresolved',
  'import/no-extraneous-dependencies',
  'import/no-named-as-default',
  'import/namespace',
  'import/named',
  'import/no-absolute-path',
  'import/no-duplicates',
  'import/no-named-as-default-member',
  'import/no-cycle',
  'node/no-hide-code-modules',
  'node/no-missing-require'
]

const SETTINGS_BLOCKLIST = ['import/resolver']

module.exports = function patch() {
  const skippedModules = []
  const loadedModules = new Set()
  const disabledRules = new Set()
  const removedSettings = new Set()

  /**
   * @param name
   */
  function warnModuleNotSupported(name) {
    if (!skippedModules.includes(name)) {
      skippedModules.push(name)
      console.error(`Module not supported: ${name}`)
    }
  }

  /**
   *
   */
  function patchPluginLoading() {
    const methods = ['_loadExtendedPluginConfig', '_loadExtendedShareableConfig', '_loadPlugin', '_loadExtends']

    for (const m of methods) {
      const original = ConfigArrayFactory.prototype[m]

      const skip = (name, _message) => {
        warnModuleNotSupported(name)

        return []
      }

      ConfigArrayFactory.prototype[m] = function () {
        const name = arguments[0]

        try {
          const result = Reflect.apply(original, this, arguments)

          if (result.error) {
            return skip(name, result.error)
          }

          loadedModules.add(name)

          return result
        } catch (error) {
          return skip(name, error.message)
        }
      }
    }
  }

  /**
   *
   */
  function patchConfigArray() {
    const orig = ConfigArray.prototype.extractConfig
    ConfigArray.prototype.extractConfig = function extractConfig() {
      const config = Reflect.apply(orig, this, arguments)

      if (config.rules) {
        for (const ruleName of RULES_BLOCKLIST) {
          if (config.rules[ruleName] !== 'off') {
            config.rules[ruleName] = 'off'
            disabledRules.add(ruleName)
          }
        }
      }

      if (config.settings) {
        for (const settingName of SETTINGS_BLOCKLIST) {
          if (config.settings[settingName]) {
            delete config.settings[settingName]
            removedSettings.add(settingName)
          }
        }
      }

      return config
    }
  }

  patchPluginLoading()
  patchConfigArray()

  return {
    disabledRules: () => [...disabledRules],
    eslint: require('eslint'),
    loadedModules: () => [...loadedModules],
    removedSettings: () => [...removedSettings],
    skippedModules: () => [...skippedModules]
  }
}
