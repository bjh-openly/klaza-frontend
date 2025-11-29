import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apiClient';
import {
  EnterRaffleRequest,
  EnterRaffleResponse,
  PaginatedResponse,
  PollListItem,
  PollOption,
  PollParticipationItem,
  PollResultOption,
  RaffleListItem,
  RaffleParticipationItem,
  TokenPolicy,
  VotePollRequest,
  VotePollResponse,
} from '../features/events/types';

const parseMeta = (rawMeta: unknown): Record<string, any> => {
  if (!rawMeta) return {};
  if (typeof rawMeta === 'string') {
    try {
      return JSON.parse(rawMeta);
    } catch (_err) {
      return {};
    }
  }
  if (typeof rawMeta === 'object') return rawMeta as Record<string, any>;
  return {};
};

const parsePaginated = <T,>(raw: any, mapper: (item: any) => T): PaginatedResponse<T> => {
  const itemsRaw = raw?.items ?? raw?.content ?? raw?.data ?? (Array.isArray(raw) ? raw : []);
  const totalElements = raw?.totalElements ?? raw?.total ?? itemsRaw?.length ?? 0;
  const totalPages = raw?.totalPages ?? raw?.pages ?? 1;
  const pageNumber = raw?.pageNumber ?? raw?.page ?? 0;
  const pageSize = raw?.pageSize ?? raw?.size ?? itemsRaw?.length ?? 0;
  const items = (itemsRaw ?? []).map(mapper);
  return { items, totalElements, totalPages, pageNumber, pageSize };
};

const mapPollOption = (raw: any): PollOption => ({
  optionId: raw?.optionId ?? raw?.id ?? raw?.pollOptionId ?? 0,
  code: raw?.code ?? raw?.optionCode ?? String(raw?.id ?? ''),
  label: raw?.label ?? raw?.optionLabel ?? raw?.name ?? raw?.title ?? '',
  imageUrl: raw?.imageUrl ?? raw?.image_url ?? raw?.imgUrl ?? raw?.optionImageUrl ?? null,
});

const mapPollListItem = (raw: any): PollListItem => {
  const meta = parseMeta(raw?.meta ?? raw?.metaJson ?? raw?.meta_json);
  const title = raw?.title ?? meta.title ?? meta.headline ?? meta.subject ?? 'Untitled poll';
  const description = raw?.description ?? raw?.desc ?? meta.description ?? meta.summary ?? null;

  return {
    pollId: raw?.pollId ?? raw?.eventId ?? raw?.id ?? 0,
    contentId: raw?.contentId ?? raw?.content_id ?? raw?.content ?? raw?.pollContentId ?? raw?.eventContentId ?? 0,
    title,
    description,
    options: (raw?.options ?? raw?.pollOptions ?? raw?.choices ?? []).map(mapPollOption),
    allowMulti: raw?.allowMulti ?? raw?.multiple ?? raw?.allowMultiple ?? false,
    maxSelect: raw?.maxSelect ?? raw?.maxSelection ?? raw?.maxSelections ?? null,
    status: raw?.status ?? raw?.pollStatus ?? raw?.eventStatus ?? raw?.eventStsCd ?? '',
    startAt: raw?.startAt ?? raw?.start_at ?? raw?.startDate ?? raw?.start_dt ?? null,
    endAt: raw?.endAt ?? raw?.end_at ?? raw?.endDate ?? raw?.end_dt ?? null,
    timezone: raw?.timezone ?? raw?.timeZone ?? raw?.tz ?? null,
    tokenPolicy: (raw?.tokenPolicy ?? raw?.token_policy ?? 'NONE') as TokenPolicy,
    tokenAmount: raw?.tokenAmount ?? raw?.token_amount ?? raw?.token ?? null,
    participated: raw?.participated ?? raw?.voted ?? raw?.joined ?? false,
    myOptionCodes:
      raw?.myOptionCodes ??
      raw?.optionCodes ??
      raw?.selectedOptionCodes ??
      (Array.isArray(raw?.myOptions) ? raw.myOptions.map((o: any) => o?.code ?? o) : null),
  };
};

const mapPollResultOption = (raw: any, myCodes: string[]): PollResultOption => ({
  optionId: raw?.optionId ?? raw?.id ?? raw?.pollOptionId ?? 0,
  code: raw?.code ?? raw?.optionCode ?? String(raw?.id ?? ''),
  label: raw?.label ?? raw?.optionLabel ?? raw?.name ?? raw?.title ?? '',
  voteCount: raw?.voteCount ?? raw?.votes ?? 0,
  voteRatio: raw?.voteRatio ?? raw?.ratio ?? 0,
  selectedByMe: myCodes.includes(raw?.code ?? raw?.optionCode ?? raw?.label),
});

const mapPollParticipationItem = (raw: any): PollParticipationItem => {
  const meta = parseMeta(raw?.meta ?? raw?.metaJson ?? raw?.meta_json);
  const title = raw?.title ?? meta.title ?? meta.headline ?? meta.subject ?? 'Untitled poll';
  const description = raw?.description ?? raw?.desc ?? meta.description ?? meta.summary ?? null;
  const myOptionCodes = raw?.myOptionCodes ?? raw?.optionCodes ?? raw?.selectedOptionCodes ?? [];

  return {
    pollId: raw?.pollId ?? raw?.eventId ?? raw?.id ?? 0,
    contentId: raw?.contentId ?? raw?.content_id ?? raw?.content ?? raw?.pollContentId ?? raw?.eventContentId ?? 0,
    title,
    description,
    options: (raw?.options ?? raw?.pollOptions ?? raw?.choices ?? []).map((item: any) =>
      mapPollResultOption(item, myOptionCodes),
    ),
    myOptionCodes,
    participatedAt: raw?.participatedAt ?? raw?.votedAt ?? raw?.createdAt ?? raw?.insertedAt ?? new Date().toISOString(),
    status: raw?.status ?? raw?.pollStatus ?? raw?.eventStatus ?? raw?.eventStsCd ?? '',
    startAt: raw?.startAt ?? raw?.start_at ?? raw?.startDate ?? raw?.start_dt ?? null,
    endAt: raw?.endAt ?? raw?.end_at ?? raw?.endDate ?? raw?.end_dt ?? null,
  };
};

const mapRaffleListItem = (raw: any): RaffleListItem => {
  const meta = parseMeta(raw?.meta ?? raw?.metaJson ?? raw?.meta_json);
  const title = raw?.title ?? meta.headline ?? meta.title ?? meta.subject ?? 'Untitled raffle';
  const description = raw?.description ?? raw?.desc ?? meta.description ?? meta.summary ?? null;

  return {
    raffleId: raw?.raffleId ?? raw?.eventId ?? raw?.id ?? 0,
    contentId: raw?.contentId ?? raw?.content_id ?? raw?.content ?? raw?.raffleContentId ?? raw?.eventContentId ?? 0,
    title,
    description,
    tokenPolicy: (raw?.tokenPolicy ?? raw?.token_policy ?? 'NONE') as TokenPolicy,
    tokenAmount: raw?.tokenAmount ?? raw?.token_amount ?? raw?.token ?? null,
    entryTokenAmount: raw?.entryTokenAmount ?? raw?.entry_token_amount ?? raw?.entryToken ?? null,
    drawStatus: raw?.drawStatus ?? raw?.draw_status ?? raw?.drawStsCd ?? 'NONE',
    drawAt: raw?.drawAt ?? raw?.draw_at ?? raw?.drawDate ?? raw?.draw_dt ?? null,
    startAt: raw?.startAt ?? raw?.start_at ?? raw?.startDate ?? raw?.start_dt ?? null,
    endAt: raw?.endAt ?? raw?.end_at ?? raw?.endDate ?? raw?.end_dt ?? null,
    timezone: raw?.timezone ?? raw?.timeZone ?? raw?.tz ?? null,
    participated: raw?.participated ?? raw?.joined ?? raw?.entered ?? false,
  };
};

const mapRaffleParticipationItem = (raw: any): RaffleParticipationItem => {
  const meta = parseMeta(raw?.meta ?? raw?.metaJson ?? raw?.meta_json);
  const title = raw?.title ?? meta.headline ?? meta.title ?? meta.subject ?? 'Untitled raffle';
  const description = raw?.description ?? raw?.desc ?? meta.description ?? meta.summary ?? null;

  return {
    ...mapRaffleListItem(raw),
    title,
    description,
    enteredAt: raw?.enteredAt ?? raw?.createdAt ?? raw?.insertedAt ?? new Date().toISOString(),
    winner: raw?.winner ?? raw?.isWinner ?? raw?.win ?? false,
  };
};

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPolls: builder.query<PaginatedResponse<PollListItem>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => ({
        url: '/polls',
        method: 'get',
        params: { page, size },
      }),
      transformResponse: (raw) => parsePaginated(raw, mapPollListItem),
    }),
    getPollParticipations: builder.query<PaginatedResponse<PollParticipationItem>, { page?: number; size?: number }>(
      {
        query: ({ page = 0, size = 10 }) => ({
          url: '/polls/participate',
          method: 'get',
          params: { page, size },
        }),
        transformResponse: (raw) => parsePaginated(raw, mapPollParticipationItem),
      },
    ),
    votePoll: builder.mutation<VotePollResponse, VotePollRequest>({
      query: ({ pollId, optionCodes }) => ({
        url: `/polls/${pollId}/vote`,
        method: 'post',
        data: { optionCodes },
      }),
    }),
    getRaffles: builder.query<PaginatedResponse<RaffleListItem>, { page?: number; size?: number }>({
      query: ({ page = 0, size = 10 }) => ({
        url: '/raffles',
        method: 'get',
        params: { page, size },
      }),
      transformResponse: (raw) => parsePaginated(raw, mapRaffleListItem),
    }),
    getRaffleParticipations: builder.query<PaginatedResponse<RaffleParticipationItem>, { page?: number; size?: number }>(
      {
        query: ({ page = 0, size = 10 }) => ({
          url: '/raffles/participate',
          method: 'get',
          params: { page, size },
        }),
        transformResponse: (raw) => parsePaginated(raw, mapRaffleParticipationItem),
      },
    ),
    enterRaffle: builder.mutation<EnterRaffleResponse, EnterRaffleRequest>({
      query: ({ raffleId, form = {} }) => ({
        url: `/raffles/${raffleId}/enter`,
        method: 'post',
        data: { form },
      }),
    }),
  }),
});

export const {
  useGetPollsQuery,
  useLazyGetPollsQuery,
  useGetRafflesQuery,
  useLazyGetRafflesQuery,
  useGetPollParticipationsQuery,
  useLazyGetPollParticipationsQuery,
  useGetRaffleParticipationsQuery,
  useLazyGetRaffleParticipationsQuery,
  useVotePollMutation,
  useEnterRaffleMutation,
} = eventsApi;
