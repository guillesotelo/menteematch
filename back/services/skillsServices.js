const { Skills } = require("../db/models")

module.exports = {
  getSkills: () => {
    return Skills.find({}, "name")
  }
}
