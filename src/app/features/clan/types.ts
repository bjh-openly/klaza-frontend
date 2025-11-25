import { ID } from '../../types/global';

export type BlockType = 'PHOTO_ONLY' | 'PHOTO_TEXT' | 'TEXT_ONLY';

export interface UploadedImage {
  fileId?: number;
  uri?: string;
}

export interface BuzzingMessage {
  id: ID;
  author: string;
  message: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface ClanSummary {
  id: ID;
  name: string;
  description?: string;
  tags: string[];
  coverImageUrl?: string;
  latestBuzz?: BuzzingMessage | string;
  genre?: string;
  period?: string;
  mediaType?: string;
  isMember?: boolean;
  memberCount?: number;
}

export interface ClanDetail extends ClanSummary {
  notice?: string;
  canCreatePost?: boolean;
}

export interface ClanPostSummary {
  id: ID;
  title: string;
  snippet?: string;
  coverImageUrl?: string;
  tags?: string[];
  createdBy?: string;
  createdAt?: string;
}

export interface ContentBlock {
  type: BlockType;
  fileId?: number;
  imageUrl?: string;
  text?: string;
}

export interface ClanPostDetail {
  id: ID;
  title: string;
  createdBy?: string;
  createdAt?: string;
  coverImageUrl?: string;
  category?: string;
  blocks: ContentBlock[];
}

export interface EditorBlock extends ContentBlock {
  id: string;
  upload?: UploadedImage;
}

export interface NewPostState {
  title: string;
  coverImage?: UploadedImage;
  blocks: EditorBlock[];
  clanId?: ID;
}

export interface ClanState {
  clans: ClanSummary[];
  currentClanId?: ID;
  buzzing: Record<ID, BuzzingMessage[]>;
}
