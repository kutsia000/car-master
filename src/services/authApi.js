import axios from 'axios';
//import Cookies from 'js-cookie';
//const apiUrl = process.env.REACT_APP_API_URL;
const authApi = axios.create({
  //'https://localhost:7164/'
  //'https://api.cline.ge/api'
  //'https://localhost:32777/api'
  baseURL: 'https://api.cline.ge/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
});

//api.interceptors.response.use()

// api.interceptors.request.use((config) => {
//   const token = Cookies.get('Token');

//   if (token) {
//     config.headers['Authorization'] = `${token}`;
//   }
// });

export default authApi;
