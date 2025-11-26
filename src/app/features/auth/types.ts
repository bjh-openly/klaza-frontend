import { ID } from '../../types/global';

export interface Actor {
  id: ID;
  username: string;
  email?: string;
  country?: string;
  actorId?: number;
  userId?: number;
  birthDate?: string;
  gender?: 'FEMALE' | 'MALE' | 'UNKNOWN';
  favorites?: string[];
  points?: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  actor: Actor | null;
  isLoading: boolean;
  error?: string | null;
}
