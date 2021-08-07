const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  phone: {
    type: Number,
  },
  personalDescription: {
    type: String,
  },
  country: {
    type: String,
  },
  isMentor: { type: Boolean, default: false },
  isMentee: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  skillsToLearn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
    },
  ],
  skillsToTeach: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
    },
  ],
  mentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
  meets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meets",
    },
  ],
  objectives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Objectives",
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notifications",
    },
  ],
  likedMentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  dislikedMentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  likedMentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  dislikedMentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  maxMentees: {
    type: Number,
    default: 3,
  },
  img: {
    type: String,
  },
  actualRole: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const users = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) return next(saltError);
      else {
        bcrypt.hash(users.password, salt, function (hashError, hash) {
          if (hashError) return next(hashError);
          users.password = hash;
          next();
        });
      }
    });
  } else return next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password).then((res) => {
    return res;
  });
};

userSchema.virtual("disponible").get(function () {
  return this.mentees.length < this.maxMentees;
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
