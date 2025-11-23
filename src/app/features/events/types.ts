import { ID } from '../../types/global';

export interface PollOption {
  id: ID;
  text: string;
}

export interface Poll {
  id: ID;
  question: string;
  options: PollOption[];
  notice?: string;
}

export interface Raffle {
  id: ID;
  title: string;
  cost: number;
  notice?: string;
}

export interface EventsState {
  polls: Poll[];
  raffles: Raffle[];
  results: string[];
  points: number;
}
