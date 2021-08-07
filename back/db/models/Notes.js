const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;