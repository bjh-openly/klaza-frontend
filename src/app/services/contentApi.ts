import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { FEATURE_FLAGS } from '../config/env';
import { getCurrentLang } from './locale';
import { HomeFeedResponse } from '../types/content';

const mockHomeResponse: HomeFeedResponse = {
  page: 0,
  size: 10,
  hasNext: true,
  items: [
    {
      contentId: 101,
      contentType: 'KLAZA',
      title: 'The art of ambiguity in Korean drama titles',
      summary: 'Short summary text ...',
      badgeLabel: 'Post',
      thumbnailUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
      publishAt: '2025-01-02T09:00:00Z',
      createdAt: '2025-01-01T08:00:00Z',
      klazaId: 10,
    },
  ],
};

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getHomepage: builder.query<HomeFeedResponse, { page?: number; size?: number; lang?: string } | void>({
      async queryFn(args = {}, _api, _extra, fetchWithBQ) {
        const { page = 0, size = 10, lang = getCurrentLang() } = args;

        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockHomeResponse };
        }

        const response = await fetchWithBQ({
          url: '/content/homepage',
          method: 'get',
          params: { page, size, lang },
        });

        if (response.error) return { error: response.error };
        const data = (response.data as HomeFeedResponse) ?? mockHomeResponse;
        return { data };
      },
    }),
  }),
});

export const { useGetHomepageQuery, useLazyGetHomepageQuery } = contentApi;
