import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Clan } from '../features/clan/types';

export const clanApi = createApi({
  reducerPath: 'clanApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getClans: builder.query<Clan[], void>({
      queryFn: async () => ({
        data: [
          {
            id: '1',
            name: 'SCI-FY',
            description: 'Futuristic tales and sci-fi fandoms.',
            tags: ['#sci-fi', '#future'],
            latestBuzz: 'New teaser dropped today!'
          },
        ],
      }),
    }),
  }),
});

export const { useGetClansQuery } = clanApi;
