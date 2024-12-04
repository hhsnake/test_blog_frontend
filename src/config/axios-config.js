// axios-config.js
import axios from 'axios';
import {API_BASE_URL} from "@/config/constants";
import store from '@/store';
import router from "@/router/index.js";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
//axiosInstance.defaults.timeout = 10000;
//axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(
  (config) => {
    const authHeader = store.getters.authHeader;
    if (authHeader) {
      config.headers.Authorization = authHeader;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор для обработки ошибок
axiosInstance.interceptors.response.use(
  (response) => response, // Возвращаем успешный ответ как есть
  (error) => {
    if (error.response && error.response.status === 401) {
      // Если 401, перенаправляем на страницу логина
      router.push('/login');
    }

    // Возвращаем ошибку дальше, если нужна дополнительная обработка
    return Promise.reject(error);
  }
);

export default axiosInstance;
