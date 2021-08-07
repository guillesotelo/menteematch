import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { markAsSeen } from '../../services/axiosServices';
import {
  registerUser,
  userLogin,
  updateUserData,
  getMeets,
  createMeet,
  updateMeet,
  deleteMeet,
} from '../../services/reduxServices';

import { deleteMatch, deleteMatchMentor } from '../../services/axiosServices';

const initialState = {
  name: null,
  surname: null,
  email: null,
  position: null,
  phone: null,
  personalDescription: null,
  country: null,
  isMentor: null,
  isMentee: null,
  isAdmin: null,
  isLoggedIn: null,
  mentor: {},
  mentees: [],
  meets: [],
  skillsToLearn: [],
  skillsToTeach: [],
  likedMentees: [],
  dislikedMentees: [],
  likedMentors: [],
  dislikedMentors: [],
  maxMentees: null,
  img: null,
  token: '',
  actualRole: '',
};

export const setUser = createAction('SET_USER');
export const getUser = createAsyncThunk('USER_LOG_IN', userLogin);
export const userRegister = createAsyncThunk('USER_REGISTER', registerUser);
export const updateUser = createAsyncThunk(
  'UPDATE_USER',
  async ({ url, data }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const userUpdated = await updateUserData(data, user.token, url);
      userUpdated.token = user.token;
      return userUpdated;
    } catch (error) {
      console.log({ error });
    }
  },
);

export const cancelMatch = createAsyncThunk(
  'CANCEL_MATCH',
  async ({ data, token }) => {
    try {
      const userUpdated = await deleteMatch(data, token);
      userUpdated.token = token;
      return userUpdated;
    } catch (error) {
      console.log({ error });
    }
  },
);

export const cancelMatchMentor = createAsyncThunk(
  'CANCEL_MATCH_MENTOR',
  async ({ data, token }) => {
    try {
      const userUpdatedMentee = await deleteMatchMentor(data, token);
      userUpdatedMentee.token = token;
      return userUpdatedMentee;
    } catch (error) {
      console.log({ error });
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'DELETE_NOTIFICATION',
  async (notificationId, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const userUpdated = await markAsSeen(notificationId, user.token);
      userUpdated.token = user.token;
      return userUpdated;
    } catch (error) {
      console.log({ error });
    }
  },
);

export const pullMeets = createAsyncThunk('PULL_MEETS', getMeets);
export const pushMeet = createAsyncThunk('PUSH_MEET', createMeet);
export const reloadMeet = createAsyncThunk('RELOAD_MEET', updateMeet);
export const removeMeet = createAsyncThunk('REMOVE_MEET', deleteMeet);

const userReducer = createReducer(initialState, {
  [getUser.fulfilled]: (_, action) => action.payload,
  [setUser]: (_, action) => action.payload,
  [userRegister.fulfilled]: (_, action) => action.payload,
  [updateUser.fulfilled]: (_, action) => action.payload,
  [cancelMatch.fulfilled]: (_, action) => action.payload,
  [cancelMatchMentor.fulfilled]: (state, _) => state,
  [deleteNotification.fulfilled]: (_, action) => action.payload,
  [pullMeets.fulfilled]: (state, action) => {state.meets = action.payload},
  [pushMeet.fulfilled]: (state, action) => 
  {state.meets = [...state.meets, action.payload]},
  [reloadMeet.fulfilled]: (state, action) => state,
  [removeMeet.fulfilled]: (state, action) => 
    {state.meets = state.meets.filter(meet => meet._id !== action.meta.arg._id)
    state.mentees.forEach(mentee => mentee.meets = mentee.meets.filter(meet => meet._id !== action.meta.arg._id))
    }
});

export default userReducer;