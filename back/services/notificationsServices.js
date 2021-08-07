const { Notifications, Users } = require("../db/models");

const createNotification = ({ emisor, receptor, type }) => {
  return Notifications.create({ emisor, receptor, type });
};

const pushToReceptor = (_id, notificationId) => {
  return Users.findOneAndUpdate(
    { _id },
    { $push: { notifications: notificationId } },
    { new: true }
  );
};

const pullFromReceptor = (_id, notificationId) => {
  return Users.findOneAndUpdate(
    { _id },
    { $pull: { notifications: notificationId } },
    { new: true }
  )
    .populate("skillsToLearn", "name")
    .populate("skillsToTeach", "name")
    .populate({
      path: "likedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills",
      },
    })
    .populate({
      path: "dislikedMentees",
      populate: {
        path: "skillsToLearn",
        model: "Skills",
      },
    })
    .populate({
      path: "likedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills",
      },
    })
    .populate({
      path: "dislikedMentors",
      populate: {
        path: "skillsToTeach",
        model: "Skills",
      },
    })
    .populate({
      path: "mentor",
      populate: {
        path: "skillsToTeach",
        model: "Skills",
      },
    })
    .populate({
      path: "mentees",
      populate: {
        path: "skillsToLearn",
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
    .populate("meets")
    .exec();
};

const buildNotification = async ({ emisor, receptor, type }) => {
  const notification = await createNotification({ emisor, receptor, type });
  return pushToReceptor(receptor, notification.id);
};

module.exports = {
  createNotification,
  pushToReceptor,
  buildNotification,
  pullFromReceptor,
};
