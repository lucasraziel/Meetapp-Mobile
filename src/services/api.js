import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.3.2:3333',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    return Promise.reject(error.response);
  }
);

export default api;
