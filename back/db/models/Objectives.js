const mongoose = require("mongoose")
const { Schema } = mongoose

const objectivesSchema = new Schema(
  {
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    description: {
      type: String,
      required: true
    },
    state: {
      type: Boolean,
      default: false,
      get: function (state) {
        return state ? "Completado" : "En progreso"
      }
    },
    due: {
      type: Date,
      default: new Date(),
      set: function (due) {
        let numWeeks = 2
        return due.setDate(due.getDate() + numWeeks * 7)
      }
    }
  },
  { toObject: { getters: true }, toJSON: { getters: true } }
)

const Objectives = mongoose.model("Objectives", objectivesSchema)

module.exports = Objectives
