import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { Clan } from '../features/clan/types';
import { FEATURE_FLAGS } from '../config/env';

export const clanApi = createApi({
  reducerPath: 'clanApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getClans: builder.query<Clan[], void>({
      async queryFn(_arg, _api, _extra, fetchWithBQ) {
        if (FEATURE_FLAGS.enableMockApis) {
          return {
            data: [
              {
                id: '1',
                name: 'SCI-FY',
                description: 'Futuristic tales and sci-fi fandoms.',
                tags: ['#sci-fi', '#future'],
                latestBuzz: 'New teaser dropped today!'
              },
            ],
          };
        }
        const response = await fetchWithBQ({ url: '/clans', method: 'get' });
        if (response.error) return { error: response.error };
        const data = (response.data as any)?.data ?? (response.data as Clan[]) ?? [];
        return { data };
      },
    }),
  }),
});

export const { useGetClansQuery } = clanApi;
