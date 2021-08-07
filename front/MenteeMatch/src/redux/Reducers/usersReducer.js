import { createReducer, createAction } from '@reduxjs/toolkit';

//------------------- Actions -------------------//
const setUsers = createAction('SET_USERS');
/* const getUsers = createAsyncThunk('GET_USERS', getUsersService) */

//------------------- Reducer -------------------//
const usersReducer = createReducer([], {
  [setUsers]: (state, action) => {
    state.users = action.payload;
  },
});

export { setUsers, usersReducer };
