import { createReducer, createAction } from '@reduxjs/toolkit';

//------------------- Actions -------------------//
const setEnableInctructions = createAction('ENABLEINSTRUCTIONS');

//------------------- Reducer -------------------//
const instructionsReducer = createReducer(true, {
  [setEnableInctructions]: (state, _) => !state,
});

export { setEnableInctructions, instructionsReducer };
