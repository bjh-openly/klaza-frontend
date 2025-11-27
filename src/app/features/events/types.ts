export type TokenPolicy = 'NONE' | 'REWARD' | 'CHARGE';

export interface TokenChange {
  policy: TokenPolicy;
  amount: number;
  fromActorId: number | null;
  toActorId: number | null;
}

export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  items: T[];
}

export interface PollOption {
  optionId: number;
  code: string;
  label: string;
  imageUrl?: string | null;
}

export interface PollListItem {
  pollId: number;
  contentId: number;
  title: string;
  description?: string | null;
  options: PollOption[];
  allowMulti: boolean;
  maxSelect: number | null;
  status: string;
  startAt?: string | null;
  endAt?: string | null;
  timezone?: string | null;
  tokenPolicy: TokenPolicy;
  tokenAmount: number | null;
  participated: boolean;
  myOptionCodes?: string[] | null;
}

export interface VotePollRequest {
  pollId: number;
  optionCodes: string[];
}

export interface VotePollResponse {
  pollId: number;
  selected: { optionId: number; optionCode: string }[];
  totalVotes: number;
  token?: TokenChange | null;
}

export interface PollResultOption {
  optionId: number;
  code: string;
  label: string;
  voteCount: number;
  voteRatio: number;
  selectedByMe: boolean;
}

export interface PollParticipationItem {
  pollId: number;
  contentId: number;
  title: string;
  description?: string | null;
  options: PollResultOption[];
  myOptionCodes: string[];
  participatedAt: string;
  status: string;
  startAt?: string | null;
  endAt?: string | null;
}

export interface RaffleListItem {
  raffleId: number;
  contentId: number;
  title: string;
  description?: string | null;
  tokenPolicy: TokenPolicy;
  tokenAmount: number | null;
  entryTokenAmount: number | null;
  drawStatus: 'NONE' | 'PLANNED' | 'DONE' | 'CANCELED';
  drawAt?: string | null;
  startAt?: string | null;
  endAt?: string | null;
  timezone?: string | null;
  participated: boolean;
}

export interface EnterRaffleRequest {
  raffleId: number;
  form?: Record<string, unknown>;
}

export interface EnterRaffleResponse {
  raffleId: number;
  status: string;
  enteredAt: string;
  actorId: number;
  token?: TokenChange | null;
}

export interface RaffleParticipationItem extends RaffleListItem {
  enteredAt: string;
  winner: boolean;
}
