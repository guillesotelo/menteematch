import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { obtainSkills } from '../../services/reduxServices';

//------------------- Actions -------------------//
const setSkills = createAction('SET_SKILLS');

const getSkills = createAsyncThunk('GET_SKILLS', obtainSkills);

//------------------- Reducer -------------------//
const skillsReducer = createReducer([], {
  [setSkills]: (_, action) => action.payload,
  [getSkills.fulfilled]: (_, action) => action.payload,
});

export { setSkills, getSkills, skillsReducer };
