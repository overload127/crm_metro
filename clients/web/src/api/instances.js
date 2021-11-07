import * as axios from 'axios';


// const URL = 'http://91.122.40.167:8000';
// const URL = 'http://192.168.1.103:8000';
const URL = 'http://localhost:8000';


export const apiCMSPrivate = axios.create({
  baseURL: `${URL}/api/v1/cms`,
});

apiCMSPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const apiCMSPublic = axios.create({
  baseURL: `${URL}/api/v1/cms`,
});

export const authApi = axios.create({
  baseURL: `${URL}/auth`,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});