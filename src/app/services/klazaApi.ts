import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import { FEATURE_FLAGS } from '../config/env';
import { getCurrentLang } from './locale';
import { ContentType, PaginatedResponse } from '../types/content';

export interface KlazaPostListItem {
  klazaId: number;
  contentId: number;
  contentType: ContentType;
  title: string;
  subtitle?: string | null;
  badgeLabel?: string | null;
  thumbnailUrl?: string | null;
  publishAt?: string | null;
  createdAt: string;
  pinned?: boolean;
}

export interface KlazaPostListResponse extends PaginatedResponse<KlazaPostListItem> {}

export interface KlazaPostDetail {
  klazaId: number;
  contentId: number;
  title: string;
  subtitle?: string | null;
  badgeLabel?: string | null;
  coverImageUrl?: string | null;
  body?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  likeCount?: number | null;
  commentCount?: number | null;
}

const mockKlazaList: KlazaPostListResponse = {
  page: 0,
  size: 10,
  hasNext: false,
  items: [
    {
      klazaId: 10,
      contentId: 101,
      contentType: 'KLAZA',
      title: 'The art of ambiguity in Korean drama titles',
      subtitle: 'Brought to you by: KLAZA Editor Judy',
      badgeLabel: 'Post',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80',
      publishAt: '2025-01-02T09:00:00Z',
      createdAt: '2025-01-01T08:00:00Z',
      pinned: true,
    },
  ],
};

const mockKlazaDetail: KlazaPostDetail = {
  klazaId: 10,
  contentId: 101,
  title: 'The art of ambiguity in Korean drama titles',
  subtitle: 'Brought to you by: KLAZA Editor Judy',
  badgeLabel: 'KLAZA made',
  coverImageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
  body: '<p>The title of a drama is the target of boos or cheers...</p>',
  createdAt: '2025-01-01T08:00:00Z',
  updatedAt: '2025-01-02T08:00:00Z',
  likeCount: 0,
  commentCount: 0,
};

export const klazaApi = createApi({
  reducerPath: 'klazaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getKlazaPosts: builder.query<KlazaPostListResponse, { page?: number; size?: number; lang?: string } | void>({
      async queryFn(args = {}, _api, _extra, fetchWithBQ) {
        const { page = 0, size = 10, lang = getCurrentLang() } = args;

        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockKlazaList };
        }

        const response = await fetchWithBQ({
          url: '/klaza/posts',
          method: 'get',
          params: { page, size, lang },
        });

        if (response.error) return { error: response.error };
        const data = (response.data as KlazaPostListResponse) ?? mockKlazaList;
        return { data };
      },
    }),
    getKlazaPostDetail: builder.query<KlazaPostDetail, { klazaId: number; lang?: string }>({
      async queryFn(args, _api, _extra, fetchWithBQ) {
        const { klazaId, lang = getCurrentLang() } = args;

        if (FEATURE_FLAGS.enableMockApis) {
          return { data: mockKlazaDetail };
        }

        const response = await fetchWithBQ({
          url: `/klaza/posts/${klazaId}`,
          method: 'get',
          params: { lang },
        });

        if (response.error) return { error: response.error };
        const data = (response.data as KlazaPostDetail) ?? mockKlazaDetail;
        return { data };
      },
    }),
  }),
});

export const { useGetKlazaPostsQuery, useLazyGetKlazaPostsQuery, useGetKlazaPostDetailQuery } = klazaApi;
