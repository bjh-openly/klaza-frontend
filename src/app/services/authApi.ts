import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Actor } from '../features/auth/types';

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string; actor: Actor }, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'post', data: body }),
    }),
    me: builder.query<Actor, void>({
      query: () => ({ url: '/auth/me', method: 'get' }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = authApi;
