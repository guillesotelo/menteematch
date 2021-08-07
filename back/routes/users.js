const express = require("express")
const router = express.Router()
const objectivesRoutes = require("../routes/objectives")
const meetsRoutes = require("../routes/meets")
const notesRoutes = require("../routes/notes")


const {
  userUpdate,
  mentorAndMenteeToggling,
  setSkills,
  getMatch,
  setMentor,
  cancelMatch,
  setMentee,
  cancelMatchMentor,
} = require("../controllers/userController")

// RUTAS /api/users

router.put("/profile", userUpdate)

router.put("/mentor/set", setMentor)

router.put("/mentee/set", setMentee)

router.put("/mentor", mentorAndMenteeToggling)

router.put("/mentee", mentorAndMenteeToggling)

router.put("/skills/learn", setSkills)

router.put("/skills/teach", setSkills)

router.get("/match/mentors", getMatch)

router.get("/match/mentees", getMatch)

router.use("/meets", meetsRoutes)

router.use("/objectives", objectivesRoutes)

router.post("/cancelMatch", cancelMatch)

router.post("/cancelMatchMentor", cancelMatchMentor)

router.use("/notes", notesRoutes)

module.exports = router
