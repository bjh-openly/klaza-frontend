import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/env';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { getStoredAccessToken } from './session';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

let accessTokenProvider: (() => string | null | undefined) | null = null;

export const setAuthTokenProvider = (provider: () => string | null | undefined) => {
  accessTokenProvider = provider;
};

apiClient.interceptors.request.use(async (config) => {
  const tokenFromStore = accessTokenProvider?.();
  const token = tokenFromStore ?? (await getStoredAccessToken());
  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export interface ApiError {
  status?: number;
  data?: unknown;
  message?: string;
}

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  ApiError
> =>
  async ({ url, method = 'get', data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
          message: (err.response?.data as { message?: string })?.message || err.message,
        },
      };
    }
  };

export default apiClient;
