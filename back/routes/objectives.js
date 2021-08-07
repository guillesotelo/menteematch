const express = require("express")
const { Users } = require("../db/models")
const { Objectives } = require("../db/models/Objectives")
const { checkIfMentor } = require("../middlewares/checkIfMentor")
// const { checkIfMentee } = require("../middlewares/checkIfMentee")

const {
  getUserObjectives,
  postUserObjectives,
  putUserObjectives,
  deleteUserObjectives
} = require("../controllers/userController")
const router = express.Router()

// Estoy en /api/users/objectives

router.get("/:id", getUserObjectives)
router.post("/", checkIfMentor, postUserObjectives)
router.put("/", checkIfMentor, putUserObjectives)
router.delete("/:menteeId/:objectiveId", checkIfMentor, deleteUserObjectives)

module.exports = router
