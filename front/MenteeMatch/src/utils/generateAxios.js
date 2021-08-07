import axios from 'axios';

const generateAxios = token => {
  const axiosInstance = axios.create({
    baseURL: '/api',
  });

  // Config de headers de axios para pedidos con autenticación
  // eslint-disable-next-line dot-notation
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return axiosInstance;
};

export default generateAxios;
