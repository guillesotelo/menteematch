const {
  updateById,
  toggleMentorOrMentee,
  getMatchesForUser,
  getObjectivesFromUser,
  findUserById,
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
  deleteNoteFromUser
} = require("../services/usersServices")

module.exports = {
  userUpdate: async (req, res, next) => {
    try {
      const user = await updateById(req.user.id, req.body)
      if (!user) return res.status(400).send("Bad request: user not found")
      res.status(200).json({ ...user._doc, password: null })
    } catch (err) {
      next(err)
    }
  },
  mentorAndMenteeToggling: async (req, res, next) => {
    try {
      const type =
        (req.path.includes("mentor") && "isMentor") || (req.path.includes("mentee") && "isMentee")

      const user = await toggleMentorOrMentee(req.user.id, type)
      res.status(200).json({ ...user._doc, password: null })
    } catch (err) {
      next(err)
    }
  },

  setMentor: async (req, res, next) => {
    try {
      const { id, _id } = req.body // _id -> Target id
      const updatedMentor = await setMenteeToMentor(id, _id)
      if (!updatedMentor) return res.status(400).send("Something went wrong!")
      res.status(200).send(updatedMentor)
    } catch (error) {
      next(error)
    }
  },

  setMentee: async (req, res, next) => {
    const { id, _id } = req.body // _id -> Target id
    const [updatedMentee, updatedMentor] = await setMentorToMentee(id, _id)
    if (!updatedMentee || !updatedMentor) return res.status(400).send("Something went wrong!")
    res.status(200).send({ updatedMentee, updatedMentor })
  },

  setSkills: async (req, res, next) => {
    try {
      const type =
        (req.path.includes("learn") && "skillsToLearn") ||
        (req.path.includes("teach") && "skillsToTeach")

      if (!req.body[type])
        return res.status(400).json("The body of your request is not correct!, try again")
      const skills = req.body[type]
      const { maxMentees } = req.body

      if (!skills.length) return res.status(400).json("You need to add at least one skill")

      const user = await updateById(req.user.id, {
        [type]: skills,
        maxMentees
      })
      res.status(200).json({ ...user._doc, password: null })
    } catch (err) {
      next(err)
    }
  },

  getMatch: async (req, res, next) => {
    try {
      const roleToFind =
        (req.path.includes("mentors") && "isMentor") ||
        (req.path.includes("mentees") && "isMentee")

      const skillsToFind = roleToFind === "isMentor" ? "skillsToTeach" : "skillsToLearn"

      const userSkills = roleToFind !== "isMentor" ? "skillsToTeach" : "skillsToLearn"

      if (!roleToFind || !skillsToFind || !userSkills)
        res.status(400).send("Bad request: invalid inputs")

      const matches = await getMatchesForUser(req.user.id, {
        roleToFind,
        skillsToFind,
        userSkills
      })
      res.status(200).json(matches)
    } catch (err) {
      next(err)
    }
  },
  getUserObjectives: async (req, res, next) => {
    try {
      const { id } = req.params
      const objectives = await getObjectivesFromUser(id)
      res.status(200).send(objectives)
    } catch (error) {
      next(error)
    }
  },
  postUserObjectives: async (req, res, next) => {
    try {
      const { menteeId, description, state, due } = req.body
      if (!menteeId || !description) return res.status(400).send("Invalid request body.")
      const user = await findUserById(menteeId)
      if (!user) return res.status(404).send("Mentee not found!.")
      const createdObjective = await postObjectivesToUser(user, description, state, due)
      const { objectives } = user
      user.objectives = [...objectives, createdObjective]
      await user.save()
      res.status(201).send(createdObjective)
    } catch (error) {
      next(error)
    }
  },

  putUserObjectives: async (req, res, next) => {
    try {
      const { objetiveId, data } = req.body
      if (!objetiveId || !data) return res.status(400).send("Invalid request body.")
      const updatedObjective = await putObjectivesFromUser(objetiveId, data)
      if (!updatedObjective) return res.status(404).send("Objective not found!.")
      res.status(200).send(updatedObjective)
    } catch (error) {
      next(error)
    }
  },
  deleteUserObjectives: async (req, res, next) => {
    try {
      const { menteeId, objectiveId } = req.params
      if (!menteeId || !objectiveId) return res.status(400).send("Invalid request body.")
      const user = await findUserById(menteeId)
      const objectivePromises = await deleteObjectivesFromUser(objectiveId, user)
      if (!objectivePromises) return res.status(404).send("Objective not found.")
      else await Promise.all(objectivePromises)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },
  cancelMatch: async (req, res, next) => {
    try {
      const { mentorId, menteeId } = req.body
      const mentor = await cancelMentee(mentorId, menteeId)
      return res.status(200).send(mentor)
    } catch (error) {
      next(error)
    }
  },
  cancelMatchMentor: async (req, res, next) => {
    try {
      const { mentorId, menteeId } = req.body
      const mentee = await cancelMentor(mentorId, menteeId)
      return res.status(200).send(mentee)
    } catch (error) {
      next(error)
    }
  },

  getUserNotes: async (req, res, next) => {
    try {
      const mentorId = req.user.id
      const { menteeId } = req.params
      const notes = await getNotesFromUser(mentorId, menteeId)
      res.status(200).send(notes)
    } catch (error) {
      next(error)
    }
  },
  postUserNotes: async (req, res, next) => {
    const { title, description, menteeId } = req.body
    const mentorId = req.user.id
    const newNote = await postNoteToUser({
      title,
      description,
      menteeId,
      mentorId
    })
    if (!newNote) return res.status(404).send("Mentee not found!.")
    if (newNote.error) return next(newNote.error)
    res.status(200).send(newNote)
  },
  putUserNotes: async (req, res, next) => {
    try {
      const { title, description, noteId } = req.body
      const updatedNote = await putNoteFromUser({ title, description, noteId })
      if (!updatedNote) return res.status(404).send("Mentee not found!.")
      if (updatedNote.error) return next(updatedNote.error)
      res.status(200).send(updatedNote)
    } catch (error) {
      next(error)
    }
  },
  deleteUserNotes: async (req, res, next) => {
    try {
      const { noteId } = req.params
      const savedMenteeAndDeletedNote = await deleteNoteFromUser(noteId)
      if (!savedMenteeAndDeletedNote) return res.status(404).send("The note was not found!.")
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}
