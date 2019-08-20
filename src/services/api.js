import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apimeetapp.fvsystem.com.br',
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
