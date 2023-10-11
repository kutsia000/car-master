import axios from 'axios';
import handleUnauthorizedError from '../errorHandlers/unAuthorizedhandler';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
//const apiUrl = process.env.REACT_APP_API_URL;

const adminApi = axios.create({
  baseURL: 'https://api.cl1ne.ge/api',
  // headers: {
  //   post: {
  //     'Content-Type': 'application/json',
  //   },
  // },
  timeout: 20000,
});

adminApi.interceptors.request.use((config) => {
  const token = Cookies.get('Token');
  //console.log(['token', token]);
  if (token) {
    config.headers['Authorization'] = `${token}`;
    return config;
  } else {
    // handleUnauthorizedError();
  }
});

adminApi.interceptors.response.use(
  (response) => {
    //console.log(response);
    return response;
  },
  (error) => {
    //console.log(error.response.data);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      //alert('2');
      // const { i18n } = useTranslation();
      // const navigate = useNavigate();
      handleUnauthorizedError();
    }

    //return Promise.reject(error);
  }
);

export default adminApi;
