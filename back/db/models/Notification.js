const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  emisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  receptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  type: {
    type: String,
    required: true,
  },
});

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;
