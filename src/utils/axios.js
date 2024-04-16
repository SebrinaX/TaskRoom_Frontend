import axios from 'axios';

const backendHttpInstance = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = 'http://taskroombackend-6xdzzyp9.b4a.run/api/v1';

  axiosInstance.defaults.headers.common.Authorization = localStorage.getItem('token')
    ? `Bearer ${localStorage.getItem('token')}`
    : '';

  axiosInstance.interceptors.response.use(
    (config) => {
      // update jwt
      const { authorization } = config.headers;
      if (authorization && authorization.startsWith('Bearer')) {
        localStorage.setItem('token', authorization);
      }

      return config;
    },
    (error) => {
      error && console.log(error.response);

      // jwt expired or invalid
      if (error && error.response && error.response.status === 401 && error.response.data.message !== 'Email not verified') {
        localStorage.removeItem('token');
        return '';
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

const http = (endpoint, config) => {
  const axiosInstance = backendHttpInstance();
  return axiosInstance(endpoint, { ...config });
};

export default http;
