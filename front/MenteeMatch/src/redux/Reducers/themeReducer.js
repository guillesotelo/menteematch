import { createReducer, createAction } from '@reduxjs/toolkit';

//------------------- Actions -------------------//
const setReduxTheme = createAction('SET_THEME');

//------------------- Reducer -------------------//
const themeReducer = createReducer('ligth', {
  [setReduxTheme]: (_, action) => action.payload,
});

export { setReduxTheme, themeReducer };
