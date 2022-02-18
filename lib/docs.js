/**
 * @file Providing easy access to rule documentation
 */

const fs = require('fs')
const path = require('path')

/**
 *
 */
function Docs() {
  const docs = {}

  /**
   * @param ruleId
   */
  function get(ruleId) {
    return docs[ruleId]
  }

  const docsDir = path.join(__dirname, '/docs/rules')

  fs.existsSync(docsDir) &&
    fs.readdirSync(docsDir).forEach(function (file) {
      const content = fs.readFileSync(`${docsDir}/${file}`, 'utf8')

      // Remove the .md extension from the filename
      docs[file.slice(0, -3)] = content
    })

  return {
    get
  }
}

module.exports = Docs
