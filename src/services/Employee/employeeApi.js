import axios from 'axios';
import handleUnauthorizedError from '../../errorHandlers/unAuthorizedhandler';
import Cookies from 'js-cookie';

const employeeApi = axios.create({
  //'https://api.cline.ge/api'
  //'https://localhost:7164/api'
  baseURL: 'https://api.cline.ge/api',

  timeout: 20000,
});

employeeApi.interceptors.request.use((config) => {
  const token = Cookies.get('Token');
  //console.log(['token', token]);
  if (token) {
    config.headers['Authorization'] = `${token}`;
    return config;
  } else {
    handleUnauthorizedError();
  }
});

employeeApi.interceptors.response.use(
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

export default employeeApi;
