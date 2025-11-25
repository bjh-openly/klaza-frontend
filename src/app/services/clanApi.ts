import { SerializedError } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import {
  BuzzingMessage,
  ClanDetail,
  ClanPostDetail,
  ClanPostSummary,
  ClanSummary,
  ContentBlock,
} from '../features/clan/types';
import { FEATURE_FLAGS } from '../config/env';

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  hasNext: boolean;
  total?: number;
}

const mapBuzzing = (raw: any): BuzzingMessage => ({
  id: String(raw?.id ?? raw?.buzzId ?? raw?.buzzingId ?? Date.now()),
  author: raw?.author ?? raw?.actorName ?? raw?.writer ?? 'Unknown',
  message: raw?.message ?? raw?.content ?? '',
  createdAt: raw?.createdAt ?? raw?.created_at ?? new Date().toISOString(),
  avatarUrl: raw?.avatarUrl ?? raw?.profileUrl,
});

const mapClanSummary = (raw: any): ClanSummary => ({
  id: String(raw?.id ?? raw?.clanId ?? raw?.clId ?? Date.now()),
  name: raw?.name ?? raw?.clanName ?? 'Unknown clan',
  description: raw?.description ?? raw?.intro ?? raw?.summary ?? '',
  tags: raw?.tags ?? raw?.tagNames ?? raw?.hashTags ?? [],
  coverImageUrl: raw?.coverImageUrl ?? raw?.coverUrl ?? raw?.profileImageUrl ?? raw?.avatarUrl,
  latestBuzz: raw?.latestBuzz ?? (raw?.latestBuzzing ? mapBuzzing(raw.latestBuzzing) : undefined),
  genre: raw?.genre ?? raw?.category,
  period: raw?.period ?? raw?.periodName,
  mediaType: raw?.mediaType,
  isMember: raw?.isMember ?? raw?.membership?.isMember,
  memberCount: raw?.memberCount,
});

const mapClanDetail = (raw: any): ClanDetail => ({
  ...mapClanSummary(raw),
  notice: raw?.notice ?? raw?.adminNotice,
  canCreatePost: raw?.canCreatePost ?? raw?.isMember,
});

const mapPostSummary = (raw: any): ClanPostSummary => ({
  id: String(raw?.id ?? raw?.postId ?? raw?.contentId ?? Date.now()),
  title: raw?.title ?? 'Untitled',
  snippet: raw?.snippet ?? raw?.preview ?? raw?.description,
  coverImageUrl: raw?.coverImageUrl ?? raw?.coverUrl ?? raw?.thumbnailUrl,
  tags: raw?.tags ?? raw?.tagNames ?? [],
  createdBy: raw?.createdBy ?? raw?.author ?? raw?.writer,
  createdAt: raw?.createdAt ?? raw?.created_at,
});

const mapBlock = (raw: any): ContentBlock => ({
  type: raw?.type ?? raw?.blockType,
  fileId: raw?.fileId ?? raw?.imageFileId,
  imageUrl: raw?.imageUrl ?? raw?.url ?? raw?.fileUrl ?? raw?.contentUrl,
  text: raw?.text ?? raw?.body,
});

const mapPostDetail = (raw: any): ClanPostDetail => ({
  id: String(raw?.id ?? raw?.postId ?? raw?.contentId ?? Date.now()),
  title: raw?.title ?? 'Untitled',
  createdBy: raw?.createdBy ?? raw?.author,
  createdAt: raw?.createdAt ?? raw?.created_at,
  coverImageUrl: raw?.coverImageUrl ?? raw?.coverUrl ?? raw?.headerImageUrl,
  category: raw?.category ?? raw?.clanName,
  blocks: (raw?.blocks ?? raw?.sections ?? []).map(mapBlock),
});

const parsePaginated = <T,>(raw: any, mapper: (item: any) => T): PaginatedResponse<T> => {
  const itemsRaw = raw?.items ?? raw?.content ?? raw?.data ?? (Array.isArray(raw) ? raw : []);
  const page = raw?.page ?? raw?.pageNumber ?? 0;
  const size = raw?.size ?? raw?.pageSize ?? (Array.isArray(itemsRaw) ? itemsRaw.length : 0);
  const total = raw?.total ?? raw?.totalElements;
  const hasNext =
    raw?.hasNext ?? raw?.hasNextPage ?? ((page + 1) * size < (total ?? Infinity) && (itemsRaw?.length ?? 0) === size);
  const items = (itemsRaw ?? []).map(mapper);
  return { items, page, size, hasNext, total };
};

export const clanApi = createApi({
  reducerPath: 'clanApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getClans: builder.query<PaginatedResponse<ClanSummary>, { page?: number; size?: number }>({
      async queryFn(args = {}, _api, _extra, fetchWithBQ) {
        const { page = 0, size = 10 } = args;
        if (FEATURE_FLAGS.enableMockApis) {
          return {
            data: {
              items: [
                {
                  id: '1',
                  name: 'SCI-FY',
                  description: 'Futuristic tales and sci-fi fandoms.',
                  tags: ['romance', 'office', 'drama'],
                  coverImageUrl:
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
                  latestBuzz: 'New teaser dropped today!',
                  genre: 'sci-fi',
                  period: '2026',
                },
              ],
              page: 0,
              size,
              hasNext: false,
            },
          };
        }
        const response = await fetchWithBQ({ url: '/clans', method: 'get', params: { page, size } });
        if (response.error) return { error: response.error };
        const data = parsePaginated(response.data, mapClanSummary);
        return { data };
      },
    }),
    getClanDetail: builder.query<ClanDetail, string>({
      async queryFn(clanId, _api, _extra, fetchWithBQ) {
        if (!clanId) return { error: { name: 'ValidationError', message: 'Missing clanId' } as SerializedError };
        const response = await fetchWithBQ({ url: `/clans/${clanId}`, method: 'get' });
        if (response.error) return { error: response.error };
        const data = mapClanDetail((response.data as any)?.data ?? response.data);
        return { data };
      },
    }),
    getClanBuzzing: builder.query<BuzzingMessage[], string>({
      async queryFn(clanId, _api, _extra, fetchWithBQ) {
        if (!clanId) return { error: { name: 'ValidationError', message: 'Missing clanId' } as SerializedError };
        const response = await fetchWithBQ({ url: `/clans/${clanId}/buzzing`, method: 'get' });
        if (response.error) return { error: response.error };
        const rawMessages = (response.data as any)?.data ?? response.data ?? [];
        return { data: (rawMessages as any[]).map(mapBuzzing) };
      },
    }),
    getClanPosts: builder.query<PaginatedResponse<ClanPostSummary>, { clanId: string; page?: number; size?: number }>({
      async queryFn(args, _api, _extra, fetchWithBQ) {
        const { clanId, page = 0, size = 20 } = args;
        if (!clanId) return { error: { name: 'ValidationError', message: 'Missing clanId' } as SerializedError };
        const response = await fetchWithBQ({ url: `/clans/${clanId}/posts`, method: 'get', params: { page, size } });
        if (response.error) return { error: response.error };
        const data = parsePaginated(response.data, mapPostSummary);
        return { data };
      },
    }),
    getClanPostDetail: builder.query<ClanPostDetail, string>({
      async queryFn(postId, _api, _extra, fetchWithBQ) {
        if (!postId) return { error: { name: 'ValidationError', message: 'Missing postId' } as SerializedError };
        const response = await fetchWithBQ({ url: `/clans/posts/${postId}`, method: 'get' });
        if (response.error) return { error: response.error };
        const data = mapPostDetail((response.data as any)?.data ?? response.data);
        return { data };
      },
    }),
    createBuzzing: builder.mutation<BuzzingMessage, { clanId: string; message: string }>({
      async queryFn({ clanId, message }, _api, _extra, fetchWithBQ) {
        if (!clanId) return { error: { name: 'ValidationError', message: 'Missing clanId' } as SerializedError };
        const response = await fetchWithBQ({ url: `/clans/${clanId}/buzzing`, method: 'post', data: { message } });
        if (response.error) return { error: response.error };
        const data = mapBuzzing((response.data as any)?.data ?? response.data);
        return { data };
      },
    }),
    joinClan: builder.mutation<{ success: boolean }, string>({
      async queryFn(clanId, _api, _extra, fetchWithBQ) {
        const response = await fetchWithBQ({ url: `/clans/${clanId}/join`, method: 'post' });
        if (response.error) return { error: response.error };
        return { data: { success: true } };
      },
    }),
    leaveClan: builder.mutation<{ success: boolean }, string>({
      async queryFn(clanId, _api, _extra, fetchWithBQ) {
        const response = await fetchWithBQ({ url: `/clans/${clanId}/leave`, method: 'post' });
        if (response.error) return { error: response.error };
        return { data: { success: true } };
      },
    }),
    createClanPost: builder.mutation<ClanPostDetail, { clanId: string; body: { title: string; blocks: ContentBlock[] } }>({
      async queryFn({ clanId, body }, _api, _extra, fetchWithBQ) {
        const response = await fetchWithBQ({ url: `/clans/${clanId}/posts`, method: 'post', data: body });
        if (response.error) return { error: response.error };
        const data = mapPostDetail((response.data as any)?.data ?? response.data);
        return { data };
      },
    }),
  }),
});

export const {
  useGetClansQuery,
  useLazyGetClansQuery,
  useGetClanDetailQuery,
  useGetClanBuzzingQuery,
  useGetClanPostsQuery,
  useGetClanPostDetailQuery,
  useCreateBuzzingMutation,
  useJoinClanMutation,
  useLeaveClanMutation,
  useCreateClanPostMutation,
} = clanApi;
