import axios from 'axios';
import handleUnauthorizedError from '../../errorHandlers/unAuthorizedhandler';
import Cookies from 'js-cookie';

const dealerApi = axios.create({
  baseURL: 'https://localhost:7164/api',

  timeout: 20000,
});

dealerApi.interceptors.request.use((config) => {
  const token = Cookies.get('Token');
  //console.log(['token', token]);
  if (token) {
    config.headers['Authorization'] = `${token}`;
    return config;
  } else {
    handleUnauthorizedError();
  }
});

dealerApi.interceptors.response.use(
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

export default dealerApi;
