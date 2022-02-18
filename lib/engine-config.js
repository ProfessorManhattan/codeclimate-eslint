const fs = require('fs')

// Cc-yaml currently ends up passing bools as stringy equivalents
/**
 * @param value
 */
function _coerceBool(value) {
  if (typeof value === 'string') {
    return value === 'true'
  }

  return Boolean(value)
}

class UserEngineConfig {
  constructor(json) {
    this.json = json
  }

  get configPath() {
    return this.json.config
  }

  get extensions() {
    return this.json.extensions
  }

  get debug() {
    return _coerceBool(this.json.debug)
  }

  get ignorePath() {
    return this.json.ignore_path
  }

  get ignoreWarnings() {
    return _coerceBool(this.json.ignore_warnings)
  }

  get sanitizeBatch() {
    if (this.json.hasOwnProperty('sanitize_batch')) {
      return _coerceBool(this.json.sanitize_batch)
    }

    return true
  }
}

class EngineConfig {
  constructor(path) {
    this.engineJSON = JSON.parse(fs.readFileSync(path))
  }

  get includePaths() {
    return this.engineJSON.include_paths
  }

  get userConfig() {
    return new UserEngineConfig(this.engineJSON.config || {})
  }
}

module.exports = EngineConfig
