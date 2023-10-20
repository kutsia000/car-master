import axios from 'axios';

const landginApi = axios.create({
  //'https://api.cl1ne.ge/api'
  //'https://localhost:7164/api'
  baseURL: 'https://api.cl1ne.ge/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
});

export default landginApi;
