const express = require("express")
const { checkIfMentor } = require("../middlewares/checkIfMentor")

const {
  getUserNotes,
  postUserNotes,
  putUserNotes,
  deleteUserNotes
} = require("../controllers/userController")
const router = express.Router()

// Estoy en /api/users/notes

router.get("/:menteeId", getUserNotes)
router.post("/", checkIfMentor, postUserNotes)
router.put("/", checkIfMentor, putUserNotes)
router.delete("/:noteId", checkIfMentor, deleteUserNotes)

module.exports = router
