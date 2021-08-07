import generateAxios from '../utils/generateAxios';
import { API_URL } from '@env';

const getNotes = async (token, menteeId) => {
  try {
    const server = generateAxios(token);
    const notes = await server.get(API_URL + `/api/users/notes/${menteeId}`);
    return notes;
  } catch (err) {
    console.log(err);
  }
};

const postNote = async (token, menteeId, data) => {
  const { description, title } = data;
  try {
    const server = generateAxios(token);
    const res = await server.post(`${API_URL}/api/users/notes`, {
      menteeId,
      description,
      title,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const deleteNote = async (token, noteId) => {
  try {
    const server = generateAxios(token);
    const res = await server.delete(`${API_URL}/api/users/notes/${noteId}`);
    return res;
  } catch (error) {}
};

const editNote = async (token, noteId, title, description) => {
  const server = generateAxios(token);
  const res = await server.put(`${API_URL}/api/users/notes`, {
    noteId,
    title,
    description,
  });
  return res;
};

module.exports = {
  getNotes,
  postNote,
  deleteNote,
  editNote,
};
