const crypto = require('crypto')

const Fingerprint = function (path, rule, message) {
  this.path = path
  this.rule = rule
  this.message = message
}

Fingerprint.prototype.compute = function () {
  let fingerprint = null

  if (this.rule === 'complexity') {
    const md5 = crypto.createHash('md5')
    md5.update(this.path)
    md5.update(this.rule)
    md5.update(this.strippedMessage(this.message))

    fingerprint = md5.digest('hex')
  }

  return fingerprint
}

Fingerprint.prototype.strippedMessage = function (message) {
  const regex = /Function '\S+'/u
  const match = message.match(regex)

  if (match) {
    return match[0]
  }

  return 'Anonymous Function'
}

/**
 * @param path
 * @param rule
 * @param message
 */
function computeFingerprint(path, rule, message) {
  return new Fingerprint(path, rule, message).compute()
}

module.exports = computeFingerprint
