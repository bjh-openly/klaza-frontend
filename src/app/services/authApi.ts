import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Actor } from '../features/auth/types';

export interface LoginRequest {
  id: string;
  password: string;
  stayLoggedIn: boolean;
  deviceName?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresIn?: number;
  actorId?: number;
  userId?: number;
  loginId?: string;
  email?: string;
  profile?: {
    id?: string;
    email?: string;
  };
}

export interface TokenCheckResponse {
  valid: boolean;
  actorId?: number;
  userId?: number;
  id?: string;
  email?: string;
  country?: string;
  birthDate?: string;
  gender?: 'FEMALE' | 'MALE' | 'UNKNOWN';
}

export interface CheckIdRequest {
  id: string;
}

export interface AvailabilityResponse {
  available: boolean;
}

export interface EmailCheckRequest {
  email: string;
}

export interface ConfirmSendResponse {
  email: string;
  seq: number;
  expiresInSec: number;
}

export interface ConfirmCheckRequest {
  email: string;
  code: string;
  seq?: number;
}

export interface ConfirmCheckResponse {
  email: string;
  verified: boolean;
  seq: number;
}

export interface SignupRequest {
  id: string;
  password: string;
  email: string;
  emailVerifySeq: number;
  country: string;
  birthDt: string;
  gender: 'FEMALE' | 'MALE' | 'UNKNOWN';
  favorites: string[];
  termsAgreed1: boolean;
  termsAgreed2: boolean;
}

export interface SignupResponse {
  actorId: number;
  userId: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'post', data: body }),
    }),
    tokenCheck: builder.query<TokenCheckResponse, void>({
      query: () => ({ url: '/auth/tokenCheck', method: 'get' }),
    }),
    checkId: builder.mutation<AvailabilityResponse, CheckIdRequest>({
      query: (body) => ({ url: '/auth/signup/checkId', method: 'post', data: body }),
    }),
    emailCheck: builder.mutation<AvailabilityResponse, EmailCheckRequest>({
      query: (body) => ({ url: '/auth/signup/emailCheck', method: 'post', data: body }),
    }),
    sendEmailConfirm: builder.mutation<ConfirmSendResponse, EmailCheckRequest>({
      query: (body) => ({ url: '/auth/signup/confirm/send', method: 'post', data: body }),
    }),
    verifyEmailConfirm: builder.mutation<ConfirmCheckResponse, ConfirmCheckRequest>({
      query: (body) => ({ url: '/auth/signup/confirm/check', method: 'post', data: body }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({ url: '/auth/signup', method: 'post', data: body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useTokenCheckQuery,
  useCheckIdMutation,
  useEmailCheckMutation,
  useSendEmailConfirmMutation,
  useVerifyEmailConfirmMutation,
  useSignupMutation,
} = authApi;
