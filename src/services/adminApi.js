import axios from 'axios';
import HandleUnauthorizedError from '../errorHandlers/unAuthorizedhandler';

import Cookies from 'js-cookie';
//const apiUrl = process.env.REACT_APP_API_URL;
const adminApi = axios.create({
  baseURL: 'https://localhost:7164/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 20000,
});

adminApi.interceptors.request.use((config) => {
  const token = Cookies.get('Token');
  //console.log(['token', token]);
  if (token) {
    config.headers['Authorization'] = `${token}`;
    return config;
  } else {
    HandleUnauthorizedError();
  }
});

// adminApi.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   (error) => {
//     //console.log(error.response);
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error
//       HandleUnauthorizedError();
//     }

//     //return Promise.reject(error);
//   }
// );

export default adminApi;
