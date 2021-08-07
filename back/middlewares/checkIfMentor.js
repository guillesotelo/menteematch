const { Users } = require("../db/models")

const checkIfMentor = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await Users.findById(id).exec()

    if(user.isMentor) {
      return next()
    }

    return res.status(401).send("Unauthorized: User is not a Mentor")
  } catch (error) {
    next(error)
  }
}

module.exports = { checkIfMentor }