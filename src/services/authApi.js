import axios from 'axios';
//import Cookies from 'js-cookie';
//const apiUrl = process.env.REACT_APP_API_URL;
const authApi = axios.create({
  baseURL: 'https://api.cl1ne.ge/api',
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
