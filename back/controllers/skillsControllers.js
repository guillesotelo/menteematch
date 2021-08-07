const { getSkills } = require("../services/skillsServices")

module.exports = {
  getAllSkills: async (_, res, next) => {
    try {
      const skills = await getSkills()
      if(!skills) res.status(404).send("Not found: no skills found")
      res.status(200).json(skills)
    } catch (err) {
      next(err)
    }
  }
}
