const express = require("express");
const router = express.Router();
const { sendNotification, deleteNotification } = require("../controllers/notificationsController");

router.post("/", sendNotification);

router.delete("/:notificationId", deleteNotification);

module.exports = router;
