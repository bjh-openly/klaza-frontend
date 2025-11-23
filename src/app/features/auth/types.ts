import { ID } from '../../types/global';

export interface Actor {
  id: ID;
  username: string;
  email?: string;
  country?: string;
  points?: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  actor: Actor | null;
  isLoading: boolean;
  error?: string | null;
}
