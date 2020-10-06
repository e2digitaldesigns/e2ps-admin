import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_REST_API || 'http://192.168.1.87:8001/api/v1/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(process.env.REACT_APP_JWT_TOKEN);
    if (token) config.headers.Authorization = `bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('Logging the error', error);
  }

  return Promise.reject(error);
});

export default http;
