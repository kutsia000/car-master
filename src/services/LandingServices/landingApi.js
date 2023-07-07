import axios from 'axios';

const landginApi = axios.create({
  baseURL: 'https://localhost:7164/api',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 5000,
});

export default landginApi;
