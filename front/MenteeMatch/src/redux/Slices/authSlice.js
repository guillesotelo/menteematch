import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    isSignout: false,
    userToken: null,
  },
  reducers: {
    restoreToken(state, action) {
      state.userToken = action.payload.token;
      state.isLoading = false;
    },

    login(state, action) {
      state.isSignout = false;
      state.userToken = action.payload.token;
    },

    logout(state) {
      state.isSignout = true;
      state.userToken = null;
    },
  },
});

export const { restoreToken, login, logout } = auth.actions;
export default auth.reducer;
