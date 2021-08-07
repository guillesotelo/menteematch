const express = require("express")
const router = express.Router()

const { getAllSkills } = require("../controllers/skillsControllers")

// RUTAS /api/skills

router.get("/", getAllSkills)

module.exports = router
