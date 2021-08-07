import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@env';

const generateAxios = token => {
  const axiosInstance = axios.create({
    baseURL: '/api',
  });

  // Config de headers de axios para pedidos con autenticación
  // eslint-disable-next-line dot-notation
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return axiosInstance;
};

export const getMatches = createAsyncThunk(
  'GET_MATCHES',
  ({ roleToFind, token }) => {
    if (!roleToFind) {
      throw new Error('No role has been assigned');
    }
    const axiosAuthorized = generateAxios(token);
    return axiosAuthorized
      .get(`${API_URL}/api/users/match/${roleToFind}`)
      .then(res => res.data)
      .catch(error => console.log('GET_MATCHES: ', error));
  },
);

export const setMatches = createAction('SET_MATCHES');

export const matchesReducer = createReducer([], {
  [getMatches.fulfilled]: (_, action) => action.payload,
  [setMatches]: (_, action) => action.payload,
});
