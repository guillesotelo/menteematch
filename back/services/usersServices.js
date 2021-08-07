const { Users, Objectives, Notes } = require("../db/models")
const { orderByCoincidences, menteeResultFilter, mentorResultFilter } = require("../utils")

const createUser = body => {
  const { name, surname, email, password } = body
  if (!name || !surname || !email || !password) return {}
  return Users.create({ name, surname, email, password })
}

const cancelMentor = (mentorId, menteeId) => {
  return Users.findOneAndUpdate(
    { _id: menteeId },
    { mentor: null, $pull: { likedMentors: mentorId } },
    { new: true }
  )
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate("mentor")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "notifications",
      populate: {
        path: "emisor",
        model: "Users",
      },
    })
    .populate("objectives")
    .populate({
      path: "mentees",
      populate: {
        path: "meets",
        model: "Meets",
      },
    })
    .populate("meets")
    .exec()
}

const cancelMentee = (mentorId, menteeId) => {
  return Users.findOneAndUpdate(
    { _id: mentorId },
    { $pull: { mentees: menteeId } },
    { new: true }
  )
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate("mentor")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "notifications",
      populate: {
        path: "emisor",
        model: "Users",
      },
    })
    .populate("objectives")
    .populate({
      path: "mentees",
      populate: {
        path: "meets",
        model: "Meets",
      },
    })
    .populate("meets")
    .exec()
}

const findUserByEmail = email => {
  if (!email) return {}
  return Users.findOne({ email }, "-__v")
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate("mentor")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "notifications",
      populate: {
        path: "emisor",
        model: "Users"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "meets",
        model: "Meets",
      },
    })
    .populate("notes")
    .populate("objectives")
    .populate("meets")
    .exec()
}

const findUserById = _id => {
  if (!_id) return {}
  return Users.findOne({ _id })
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "mentor",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "meets",
        model: "Meets",
      },
    })
    .populate({
      path: "notifications",
      populate: {
        path: "emisor",
        model: "Users"
      }
    })
    .populate("notes")
    .populate("objectives")
    .populate("meets")
    .exec()
}

const updateById = (_id, body) => {
  if (!_id || !body) return {}
  return Users.findOneAndUpdate({ _id }, body, { new: true })
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills"
      }
    })
    .populate({
      path: "mentees",
      populate: {
        path: "meets",
        model: "Meets",
      },
    })
    .populate({
      path: "mentor",
      populate: {
        path: "skillsToTeach",
        model: "Skills"
      }
    })
    .populate({
      path: "notifications",
      populate: {
        path: "emisor",
        model: "Users"
      }
    })
    .populate("notes")
    .populate("objectives")
    .populate("meets")
    .exec()
}

const toggleMentorOrMentee = async (_id, type) => {
  const user = await findUserById(_id)
  user[type] = !user[type]
  return user.save()
}

const getMatchesForUser = async (_id, { roleToFind, skillsToFind, userSkills }) => {
  const user = await findUserById(_id)

  if (roleToFind === "isMentor" && user.mentor?._id) return []

  const skillstTomatch = user[userSkills].map(x => x._id)

  let matches =
    (await Users.find({
      [roleToFind]: true,
      [skillsToFind]: { $in: skillstTomatch }
    })
      .populate(skillsToFind, "name")
      .populate("dislikedMentees")
      .populate("dislikedMentors")
      .exec()) || []

  // Para que no se incluya a él mismo
  matches = matches.filter(match => match.id !== _id)

  // Si busco mentees, que esos mentees no tengan ya un mentor asignado
  if (roleToFind === "isMentee") matches = matches.filter(match => !match.mentor)

  // Me fijo sí alguno de los matches me dislikeo
  const dislikedProperty = roleToFind === "isMentee" ? "dislikedMentors" : "dislikedMentees"
  matches = matches.filter(match => {
    const truthArr = match[dislikedProperty].map(dislikedUser => dislikedUser.id === user.id)
    return !truthArr.includes(true)
  })

  // Se agrega user.mentees cómo filtro también porque no tiene sentido que un mentee que busca mentor, le salgan sus propios mentees como opción a elegir. Lo mismo en el rol contrario.
  if (roleToFind === "isMentor") {
    matches = mentorResultFilter(
      [...user.likedMentors, ...user.dislikedMentors, ...user.mentees],
      matches
    )
  }

  // Se agrega user.mentor como filtro también porque no me tiene que salir mi propio mentor como mentee elegible (en el caso que esa persona tenga los dos roles habilitados)
  if (roleToFind === "isMentee") {
    matches = menteeResultFilter(
      [
        ...user.likedMentees,
        ...user.dislikedMentees,
        ...user.mentees,
        user.mentor ? user.mentor : { id: null }
      ],
      matches
    )
  }

  return orderByCoincidences(skillstTomatch, matches, skillsToFind)
}

const getObjectivesFromUser = id => {
  const objectivesPromise = Objectives.find({ mentee: id }).exec()
  return objectivesPromise
}

const postObjectivesToUser = (mentee, description, state, due) => {
  const createdObjectivePromise = Objectives.create({
    mentee: mentee.id,
    description,
    state,
    due
  })
  return createdObjectivePromise
}

const putObjectivesFromUser = (objectiveId, data) => {
  const updatedObjectivePromise = Objectives.findByIdAndUpdate(objectiveId, data, {
    new: true
  }).exec()
  return updatedObjectivePromise
}

const deleteObjectivesFromUser = (objectiveId, user) => {
  const { objectives } = user
  const objective = objectives.find(objective => objective.id === objectiveId)
  if (!objective) return null
  else {
    user.objectives = user.objectives.filter(objective => objective.id !== objectiveId)
    return [user.save(), objective.delete()]
  }
}

const setMenteeToMentor = async (menteeId, mentorId) => {
  try {
    const mentor = await Users.findById(mentorId).exec()
    if (!mentor || !mentor.disponible) return null
    mentor.mentees.push(menteeId)
    return mentor.save()
  } catch (error) {
    console.log(error)
  }
}

const setMentorToMentee = async (mentorId, menteeId) => {
  try {
    const menteePromise = Users.findById(menteeId).exec()
    const mentorPromise = Users.findById(mentorId).populate("likedMentees").exec()
    const [mentee, mentor] = await Promise.all([menteePromise, mentorPromise])
    if (mentee.mentor || !mentor.disponible) return [null, null]
    mentee.mentor = mentorId
    mentor.likedMentees = mentor.likedMentees.filter(mentee => mentee.id !== menteeId)
    return [mentee.save(), mentor.save()]
  } catch (error) {
    console.log(error)
  }
}

const getNotesFromUser = (mentorId, menteeId) => {
  const notesPromise = Notes.find({ from: mentorId, to: menteeId }).exec()
  return notesPromise
}

const postNoteToUser = async ({ title, description, menteeId, mentorId }) => {
  try {
    // Primero compruebo si existe el user, sí este no existe no creo la nota.
    const mentee = await Users.findById(menteeId).exec()
    if (!mentee) return null
    const newNote = await Notes.create({
      title,
      description,
      from: mentorId,
      to: menteeId
    })
    mentee.notes = [...mentee.notes, newNote]
    await mentee.save()
    return newNote
  } catch (error) {
    return { error }
  }
}

const putNoteFromUser = async ({ title, description, noteId }) => {
  try {
    const notePromise = Notes.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    ).exec()
    return notePromise
  } catch (error) {
    return { error }
  }
}

const deleteNoteFromUser = async noteId => {
  try {
    const note = await Notes.findById(noteId).exec()
    if (!note) return null
    const mentee = await Users.findById(note.to).populate("notes").exec()
    if (!mentee) return null
    mentee.notes = mentee.notes.filter(note => note.id !== noteId)
    const savedMenteeAndDeletedNote = await Promise.all([mentee.save(), note.delete()])
    return savedMenteeAndDeletedNote
  } catch (error) {
    console.log(error)
  }
}

const checkAvailability = async (roleToFind, menteeId, mentorId) => {
  try {
    const mentorPromise = Users.findById(mentorId).exec()
    const menteePromise = Users.findById(menteeId).exec()
    const [mentor, mentee] = await Promise.all([mentorPromise, menteePromise])
    if (roleToFind === "mentee") {
      // Si el mentee ya tiene mentor
      if (mentee.mentor) {
        return false
      }
    }
    if (roleToFind === "mentor") {
      // Si el mentor supera la cantidad máxima de mentees
      if (!mentor.disponible) {
        return false
      }
    }
    return true
  } catch (error) {
    console.log(error)
  }
}

const dislikeMentorAndRestoreMentee = async (mentorId, menteeId) => {
  try {
    const mentorPromise = Users.findById(mentorId).exec()
    const menteePromise = Users.findById(menteeId).exec()
    const [mentor, mentee] = await Promise.all([mentorPromise, menteePromise])
    // Saco el mentee pusheado a los dislikedMentees del mentor
    mentor.dislikedMentees = mentor.dislikedMentees.filter(mentee => mentee.id !== mentee.id)
    // Setteo el mentor en los dislikedMentors del mentee por su rechazo a la propuesta del mentor
    mentee.dislikedMentors = [...mentee.dislikedMentors, mentor]
    return await Promise.all([mentee.save(), mentor.save()])
  } catch (error) {
    console.log(error)
  }
}

const undoForcedMenteeDislike = async (mentorId, menteeId) => {
  try {
    const mentor = await Users.findOneAndUpdate(
      { _id: mentorId },
      {
        $pull: { dislikedMentees: menteeId },
      },
      { new: true }
    )
      .populate("dislikedMentees")
      .exec();
    return mentor;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateById,
  toggleMentorOrMentee,
  getMatchesForUser,
  getObjectivesFromUser,
  postObjectivesToUser,
  putObjectivesFromUser,
  deleteObjectivesFromUser,
  setMenteeToMentor,
  setMentorToMentee,
  cancelMentee,
  cancelMentor,
  getNotesFromUser,
  postNoteToUser,
  putNoteFromUser,
  deleteNoteFromUser,
  checkAvailability,
  dislikeMentorAndRestoreMentee,
  undoForcedMenteeDislike
}
