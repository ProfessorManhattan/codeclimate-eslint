const checkCategoryMapping = require('./check-category-mapping')

const categories = function (checkName) {
  return [checkCategoryMapping[checkName] || 'Style']
}

/*
 * Here Be Dragons: this function extracts the relevant value that triggered the issue for
 * checks in the Complexity category. Unfortunately, these values are not available in a
 * structured way, so we extract them from strings. That means that any check categorized
 * as Complexity MUST have a rule here to extract value.
 *
 * If a matching string segment cannot be found, `null` will be returned.
 */
const messageMetricValue = function (message) {
  let match = null
  switch (message.ruleId) {
    case 'complexity':
      match = message.message.match(/complexity of (\d+)/u)
      break
    case 'max-statements':
      match = message.message.match(/too many statements \((\d+)\)/u)
      break
    default:
      break
  }
  if (match !== null) {
    return Number.parseInt(match[1], 10)
  }

  return null
}

const metricThreshold = function (ruleId, eslintConfig) {
  return eslintConfig.rules[ruleId][1]
}

const remediationPoints = function (checkName, message, eslintConfig) {
  if (categories(checkName)[0] === 'Complexity') {
    /*
     * (@base_cost + (overage * @cost_per))*1_000_000
     * cost_per: 0.1,  base: 1
     */
    const costPer = 70_000
    let points = 1_000_000
    const threshold = metricThreshold(message.ruleId, eslintConfig)

    const metricValue = messageMetricValue(message)
    if (metricValue !== null) {
      const overage = metricValue - threshold
      if (overage > 0) {
        points += costPer * overage
      }
    }

    return points
  }

  return 50_000
}

module.exports = {
  categories,
  remediationPoints
}
