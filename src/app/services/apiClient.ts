import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/env';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  // attach token placeholder
  return config;
});

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  SerializedError
> =>
  async ({ url, method = 'get', data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          name: 'ApiError',
          message: err.message,
        },
      };
    }
  };

export default apiClient;
