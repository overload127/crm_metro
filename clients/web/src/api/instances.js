import * as axios from 'axios';


export const api = axios.create({
  baseURL: 'http://192.168.1.103:8000/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const authApi = axios.create({
  baseURL: 'http://192.168.1.103:8000/auth',
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});