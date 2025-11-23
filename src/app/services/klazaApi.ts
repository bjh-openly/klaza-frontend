import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';

export interface KlazaPost {
  id: string;
  title: string;
  summary: string;
  label: 'KLAZA made' | 'Fanmade';
}

export const klazaApi = createApi({
  reducerPath: 'klazaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPosts: builder.query<KlazaPost[], void>({
      queryFn: async () => ({
        data: [
          { id: 'k1', title: 'Official comeback teaser', summary: 'Watch the latest drop.', label: 'KLAZA made' },
          { id: 'k2', title: 'Fan remix contest', summary: 'Share your remix for rewards.', label: 'Fanmade' },
        ],
      }),
    }),
  }),
});

export const { useGetPostsQuery } = klazaApi;
