import { configureStore } from '@reduxjs/toolkit';
import { skillsReducer } from './Reducers/Skills';
import userReducer from './Reducers/UserReducer';
import { matchesReducer } from './Reducers/matchesReducer';
import authReducer from './Slices/authSlice';
import { themeReducer } from './Reducers/themeReducer';
import { instructionsReducer } from './Reducers/instructionsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    matches: matchesReducer,
    skills: skillsReducer,
    auth: authReducer,
    theme: themeReducer,
    enableInstructions: instructionsReducer,
  },
});

export default store;
