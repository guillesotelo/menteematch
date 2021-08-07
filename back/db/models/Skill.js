const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Skills = mongoose.model("Skills", skillSchema);

module.exports = Skills;
