const { Users } = require("../db/models")

const checkIfMentee = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await Users.findById(id).exec()

    if(user.isMentee) {
      return next()
    }

    return res.status(401).send("Unauthorized: User is not a Mentee")
  } catch (error) {
    next(error)
  }
}

module.exports = { checkIfMentee }