import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9595/',
});

export default api;
