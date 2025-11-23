import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { FEATURE_FLAGS } from '../config/env';

export interface KlazaPost {
  id: string;
  title: string;
  summary: string;
  label: 'KLAZA made' | 'Fanmade';
}

const mockPosts: KlazaPost[] = [
  { id: 'k1', title: 'Official comeback teaser', summary: 'Watch the latest drop.', label: 'KLAZA made' },
  { id: 'k2', title: 'Fan remix contest', summary: 'Share your remix for rewards.', label: 'Fanmade' },
];

export const klazaApi = createApi({
  reducerPath: 'klazaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPosts: builder.query<KlazaPost[], void>({
      async queryFn(_arg, _api, _extra, fetchWithBQ) {
        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockPosts };
        }
        const response = await fetchWithBQ({ url: '/klaza/posts', method: 'get' });
        if (response.error) return { error: response.error };
        const data = (response.data as any)?.data ?? (response.data as KlazaPost[]) ?? [];
        return { data };
      },
    }),
  }),
});

export const { useGetPostsQuery } = klazaApi;
