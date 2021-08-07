const jwt = require("jsonwebtoken");

const {
  buildNotification,
  pullFromReceptor,
} = require("../services/notificationsServices");
const {
  checkAvailability,
  dislikeMentorAndRestoreMentee,
  undoForcedMenteeDislike,
} = require("../services/usersServices");

module.exports = {
  sendNotification: async (req, res, next) => {
    try {
      const { receptor, type } = req.body;
      let { emisor } = req.body;
      if (!emisor) emisor = req.user.id;
      if (!receptor || !emisor || !type)
        return res.status(400).send("Bad request: invalid body");
      if (type === "solicitud") {
        // Esta comprobación sirve para en el front agarrar esta respuesta y marcar la tarjetita como no disponible a la hora de querer mandar la invitación.
        const available = await checkAvailability("mentee", receptor, emisor);
        if (!available)
          return res.status(400).send("Mentee is not available!.");
      } else if (type === "rechazo") {
        // Acá se le saca el mentee pusheado forzosamente a los dislikedMentees del mentor (se hizo eso cuando el mentor envío la solicitud, para que no le aparezca más el mentee en el matcher) y se settea el mentor en los dislikedMentors del mentee
        const updated = await dislikeMentorAndRestoreMentee(receptor, emisor);
        if (!updated) return res.status(400).send("Something went wrong!.");
      } else if (type === "confirmation") {
        // Acá se le saca al mentee de los dislikes de su nuevo mentor
        const updated = await undoForcedMenteeDislike(receptor._id, emisor);
        if (!updated) return res.status(400).send("Something went wrong!.");
      }
      await buildNotification({ emisor, receptor, type });
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },

  deleteNotification: async (req, res, next) => {
    try {
      const user = await pullFromReceptor(
        req.user.id,
        req.params.notificationId
      );
      res.status(200).json({ ...user._doc, password: null });
    } catch (err) {
      next(err);
    }
  },
};
