import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import {
  EnterRaffleRequest,
  EnterRaffleResponse,
  PaginatedResponse,
  PollListItem,
  PollParticipationItem,
  RaffleListItem,
  RaffleParticipationItem,
  VotePollRequest,
  VotePollResponse,
} from '../features/events/types';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPolls: builder.query<PaginatedResponse<PollListItem>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => ({
        url: '/polls',
        method: 'get',
        params: { page, size },
      }),
    }),
    getPollParticipations: builder.query<PaginatedResponse<PollParticipationItem>, { page?: number; size?: number }>(
      {
        query: ({ page = 0, size = 10 }) => ({
          url: '/polls/participate',
          method: 'get',
          params: { page, size },
        }),
      },
    ),
    votePoll: builder.mutation<VotePollResponse, VotePollRequest>({
      query: ({ pollId, optionCodes }) => ({
        url: `/polls/${pollId}/vote`,
        method: 'post',
        data: { optionCodes },
      }),
    }),
    getRaffles: builder.query<PaginatedResponse<RaffleListItem>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => ({
        url: '/raffles',
        method: 'get',
        params: { page, size },
      }),
    }),
    getRaffleParticipations: builder.query<PaginatedResponse<RaffleParticipationItem>, { page?: number; size?: number }>(
      {
        query: ({ page = 0, size = 10 }) => ({
          url: '/raffles/participate',
          method: 'get',
          params: { page, size },
        }),
      },
    ),
    enterRaffle: builder.mutation<EnterRaffleResponse, EnterRaffleRequest>({
      query: ({ raffleId, form = {} }) => ({
        url: `/raffles/${raffleId}/enter`,
        method: 'post',
        data: { form },
      }),
    }),
  }),
});

export const {
  useGetPollsQuery,
  useLazyGetPollsQuery,
  useGetRafflesQuery,
  useLazyGetRafflesQuery,
  useGetPollParticipationsQuery,
  useLazyGetPollParticipationsQuery,
  useGetRaffleParticipationsQuery,
  useLazyGetRaffleParticipationsQuery,
  useVotePollMutation,
  useEnterRaffleMutation,
} = eventsApi;
