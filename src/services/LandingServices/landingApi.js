import axios from 'axios';

const landginApi = axios.create({
  baseURL: 'https://api.cl1ne.ge/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
});

export default landginApi;
