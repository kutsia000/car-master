import axios from 'axios';
import { handleunAuthorizedError } from '../errorHandlers/unAuthorizedhandler';

import Cookies from 'js-cookie';
//const apiUrl = process.env.REACT_APP_API_URL;
const adminApi = axios.create({
  baseURL: 'https://localhost:7164/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('Token');

  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleunAuthorizedError();
    }

    return Promise.reject(error);
  }
);

export default adminApi;
