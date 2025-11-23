import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { FEATURE_FLAGS } from '../config/env';

export interface KlazaSearchItem {
  klazaId: number;
  contentId: number;
  seqNbr: number;
  title: string;
  contentSnippet: string;
  publishAt: string;
  registeredAt: string;
  authorActorIds: number[];
  authorLogins: string[];
  authorEmails: string[];
}

export interface KlazaSearchResponse {
  items: KlazaSearchItem[];
  total: number;
  page: number;
  size: number;
  hasNext: boolean;
}

const mockSearchResponse: KlazaSearchResponse = {
  items: [
    {
      klazaId: 3,
      contentId: 7,
      seqNbr: 1,
      title: 'Monthly Drama Roundup',
      contentSnippet:
        'Here is a curated list of this month’s new dramas and recommendations. Connect the thumbnail with {{slot:thumb1}}.',
      publishAt: '2025-11-20T11:52:52.274',
      registeredAt: '2025-11-23T12:33:40.280956',
      authorActorIds: [1],
      authorLogins: ['buzzpik01'],
      authorEmails: ['ab81004@naver.com'],
    },
    {
      klazaId: 2,
      contentId: 6,
      seqNbr: 1,
      title: 'Weekly Drama Roundup',
      contentSnippet:
        'A summary of this week’s new releases and recommendations. Connect the thumbnail with {{slot:thumb1}}.',
      publishAt: '2025-11-20T11:52:52.274',
      registeredAt: '2025-11-23T12:33:18.28881',
      authorActorIds: [1],
      authorLogins: ['buzzpik01'],
      authorEmails: ['ab81004@naver.com'],
    },
  ],
  total: 2,
  page: 0,
  size: 20,
  hasNext: false,
};

export const klazaApi = createApi({
  reducerPath: 'klazaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    search: builder.query<KlazaSearchResponse, { page?: number; size?: number }>({
      async queryFn(args = {}, _api, _extra, fetchWithBQ) {
        const { page = 0, size = 10 } = args;
        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockSearchResponse };
        }
        const response = await fetchWithBQ({ url: '/klaza/search', method: 'get', params: { page, size } });
        if (response.error) return { error: response.error };
        const data = (response.data as KlazaSearchResponse) ?? mockSearchResponse;
        return { data };
      },
    }),
  }),
});

export const { useSearchQuery: useSearchKlazaQuery, useLazySearchQuery: useLazySearchKlazaQuery } = klazaApi;
