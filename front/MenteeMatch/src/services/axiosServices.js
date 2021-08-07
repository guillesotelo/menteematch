import generateAxios from '../utils/generateAxios';
import { API_URL } from '@env';
import { simpleMessage } from '../utils';

const postUserSkillsToLearn = async (skills, token) => {
  try {
    const server = generateAxios(token);
    const updatedUser = await server.put(API_URL + '/api/users/skills/learn', {
      skillsToLearn: skills,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const postUserSkillsToTeach = async (skills, token) => {
  try {
    const server = generateAxios(token);
    const updatedUser = await server.put(API_URL + '/api/users/skills/teach', {
      skillsToTeach: skills,
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const getObjectivesFromUser = async (id, token) => {
  try {
    const server = generateAxios(token);
    const objectives = await server.get(
      API_URL + `/api/users/objectives/${id}`,
    );
    return objectives;
  } catch (err) {
    console.log(err);
  }
};

const postObjectivesToUser = async (menteeId, token, description) => {
  try {
    const server = generateAxios(token);
    const res = await server.post(API_URL + '/api/users/objectives', {
      menteeId,
      description,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
const deleteObjectivesToUser = async (menteeId, token, objetiveId) => {
  try {
    const server = generateAxios(token);
    const res = await server.delete(
      API_URL + `/api/users/objectives/${menteeId}/${objetiveId}`,
    );

    return res;
  } catch (err) {
    console.log(err);
  }
};
const updateObjectivesToUser = async (token, objetiveId, data) => {
  try {
    const server = generateAxios(token);
    const res = await server.put(API_URL + '/api/users/objectives', {
      objetiveId,
      data,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

const setMenteeToMentor = async (menteeId, mentorId, token) => {
  try {
    const server = generateAxios(token);
    const updated = await server.put(API_URL + '/api/users/mentor/set', {
      id: menteeId,
      _id: mentorId,
    });
    return updated;
  } catch (error) {
    if (error.response.status === 400) {
      simpleMessage('¡Error!', 'El usuario ya no está disponible.', 'danger');
      return null;
    }
    console.log(error);
  }
};

const setMentorToMentee = async (mentorId, menteeId, token) => {
  try {
    const server = generateAxios(token);
    const updated = await server.put(API_URL + '/api/users/mentee/set', {
      id: mentorId,
      _id: menteeId,
    });
    return updated;
  } catch (error) {
    if (error.response.status === 400) {
      simpleMessage('¡Error!', 'El usuario ya no está disponible.', 'danger');
      return null;
    }
    console.log(error);
  }
};

const deleteMatch = async (data, token) => {
  try {
    const server = generateAxios(token);
    const updateMentor = await server.post(
      API_URL + '/api/users/cancelMatch',
      data,
    );
    return updateMentor.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteMatchMentor = async (data, token) => {
  try {
    const server = generateAxios(token);
    const updateMentor = await server.post(
      API_URL + '/api/users/cancelMatchMentor',
      data,
    );
    return updateMentor.data;
  } catch (error) {
    console.log(error);
  }
};

const markAsSeen = async (notificationId, token) => {
  try {
    const server = generateAxios(token);
    const req = await server.delete(
      `${API_URL}/api/notifications/${notificationId}`,
    );
    return req.data;
  } catch (error) {
    console.log(error);
  }
};

const sendNotification = async (data, token) => {
  try {
    const server = generateAxios(token);
    const req = await server.post(`${API_URL}/api/notifications`, data);
    return req.data;
  } catch (error) {
    if (error.response.status === 400) {
      simpleMessage('¡Error!', 'El usuario ya no está disponible.', 'danger');
      return null;
    }
    console.log(error);
  }
};

export {
  postUserSkillsToLearn,
  postUserSkillsToTeach,
  setMenteeToMentor,
  postObjectivesToUser,
  deleteObjectivesToUser,
  updateObjectivesToUser,
  getObjectivesFromUser,
  setMentorToMentee,
  deleteMatch,
  deleteMatchMentor,
  markAsSeen,
  sendNotification,
};
