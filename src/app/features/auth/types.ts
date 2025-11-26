export type ActorType = 'USER' | 'ADMIN';

export interface Actor {
  actorId: number;
  id: string;
  email: string;
  actorType: ActorType;
  actorStatus: string;
}

export interface UserProfile {
  userId: number;
  country: string;
  countryName: string;
  gender: string;
  genderLabel: string;
  birthDate: string;
}

export interface Preferences {
  tags: string[];
}

export interface ClanSummary {
  clanId: number;
  name: string;
  topic: string;
  isOwner: boolean;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  actor: Actor | null;
  userProfile: UserProfile | null;
  preferences: Preferences | null;
  joinedClans: ClanSummary[];
  rememberMe: boolean;
  isLoading: boolean;
  error?: string | null;
}
