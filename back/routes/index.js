const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/jwt");

const usersRoutes = require("./users");
const skillsRoutes = require("./skills");
const authRoutes = require("./auth");
const notificationsRoutes = require("./notifications");

router.use("/auth", authRoutes);
router.use("/users", auth, usersRoutes);
router.use("/skills", skillsRoutes);
router.use("/notifications", auth, notificationsRoutes);

module.exports = router;
