import axios from 'axios';

import type { AxiosInstance } from 'axios';

const getAccessToken = () => {
  return localStorage.getItem('accessToken')
} 

export const loginClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WMS_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_WMS_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
      Accept: 'application/json',
    },
});
  