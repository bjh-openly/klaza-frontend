import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Poll, Raffle } from '../features/events/types';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPolls: builder.query<Poll[], void>({
      queryFn: async () => ({
        data: [
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
        ],
      }),
    }),
    getRaffles: builder.query<Raffle[], void>({
      queryFn: async () => ({
        data: [
          { id: 'r1', title: 'Signed album giveaway', cost: 2, notice: 'Insert -2 points to enter.' },
        ],
      }),
    }),
  }),
});

export const { useGetPollsQuery, useGetRafflesQuery } = eventsApi;
