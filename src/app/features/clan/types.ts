import { ID } from '../../types/global';

export interface Clan {
  id: ID;
  name: string;
  description: string;
  tags: string[];
  latestBuzz?: string;
}

export interface BuzzingMessage {
  id: ID;
  author: string;
  message: string;
  createdAt: string;
}

export interface ClanState {
  clans: Clan[];
  currentClanId?: ID;
  buzzing: Record<ID, BuzzingMessage[]>;
}
