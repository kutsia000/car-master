import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const adminInstance = axios.create({
  baseURL: 'https://localhost:7164/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 20000,
});

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  //const token = Cookies.get('Token');

  adminInstance.interceptors.request.use((config) => {
    const token = Cookies.get('Token');
    //console.log(['token', token]);
    if (token) {
      config.headers['Authorization'] = `${token}`;
      return config;
    } else {
      // handleUnauthorizedError();
    }
  });

  const resInterceptor = (response) => {
    return response;
  };

  const errInterceptor = (error) => {
    console.log(error);
    if (error.response.status === 401) {
      Cookies.remove('Token');
      localStorage.removeItem('IsAdmin');
      navigate(`/${lang}/login`);
    }
    return null;
    return Promise.reject(error);
  };

  //console.log(lang);
  const interceptor = adminInstance.interceptors.response.use(resInterceptor, errInterceptor);
  //console.log(adminInstance.interceptors.response);

  // useEffect(() => {
  //   const resInterceptor = (response) => {
  //     return response;
  //   };

  //   const errInterceptor = (error) => {
  //     if (error.response.status === 401) {
  //       navigate(`/${lang}/login`);
  //     }
  //     return Promise.reject(error);
  //   };

  //   //console.log(lang);
  //   const interceptor = adminInstance.interceptors.response.use(resInterceptor, errInterceptor);
  //   console.log(adminInstance.interceptors.response);
  //   return () => interceptor; //adminInstance.interceptors.response.eject(interceptor);
  // }, []);

  return children;
};

export default adminInstance;
export { AxiosInterceptor };
