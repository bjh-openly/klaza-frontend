export type ContentType = 'KLAZA' | 'POLL' | 'RAFFLE' | 'CLAN';

export interface PaginatedResponse<T> {
  page: number;
  size: number;
  hasNext: boolean;
  items: T[];
}

export interface HomeFeedItem {
  contentId: number;
  contentType: ContentType;
  title: string;
  summary?: string | null;
  badgeLabel?: string | null;
  thumbnailUrl?: string | null;
  publishAt?: string | null;
  createdAt: string;
  klazaId?: number | null;
  pollId?: number | null;
  raffleId?: number | null;
  clanId?: number | null;
  clanContentId?: number | null;
}

export interface HomeFeedResponse extends PaginatedResponse<HomeFeedItem> {}
