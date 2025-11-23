import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Poll, Raffle } from '../features/events/types';
import { FEATURE_FLAGS } from '../config/env';

const mockPolls: Poll[] = [
  {
    id: 'p1',
    question: 'Which storyline should we feature next?',
    options: [
      { id: 'o1', text: 'Romance' },
      { id: 'o2', text: 'Fantasy' },
      { id: 'o3', text: 'Mystery' },
    ],
    notice: 'Per submission, +1 point',
  },
];

const mockRaffles: Raffle[] = [
  { id: 'r1', title: 'Signed album giveaway', cost: 2, notice: 'Insert -2 points to enter.' },
];

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPolls: builder.query<Poll[], void>({
      async queryFn(_arg, _api, _extra, fetchWithBQ) {
        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockPolls };
        }
        const response = await fetchWithBQ({ url: '/polls', method: 'get' });
        if (response.error) return { error: response.error };
        const data = (response.data as any)?.data ?? (response.data as Poll[]) ?? [];
        return { data };
      },
    }),
    getRaffles: builder.query<Raffle[], void>({
      async queryFn(_arg, _api, _extra, fetchWithBQ) {
        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockRaffles };
        }
        const response = await fetchWithBQ({ url: '/raffles', method: 'get' });
        if (response.error) return { error: response.error };
        const data = (response.data as any)?.data ?? (response.data as Raffle[]) ?? [];
        return { data };
      },
    }),
  }),
});

export const { useGetPollsQuery, useGetRafflesQuery } = eventsApi;
