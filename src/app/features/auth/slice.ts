import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Actor, UserProfile, Preferences, ClanSummary } from './types';

type AuthPayload = {
  accessToken: string;
  refreshToken: string | null;
  actor: Actor | null;
  userProfile: UserProfile | null;
  preferences: Preferences | null;
  joinedClans: ClanSummary[];
  rememberMe: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  actor: null,
  userProfile: null,
  preferences: null,
  joinedClans: [],
  rememberMe: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
    signInSuccess(state, action: PayloadAction<AuthPayload>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.actor = action.payload.actor;
      state.userProfile = action.payload.userProfile;
      state.preferences = action.payload.preferences;
      state.joinedClans = action.payload.joinedClans;
      state.rememberMe = action.payload.rememberMe;
      state.isLoading = false;
    },
    restoreSession(state, action: PayloadAction<Partial<AuthPayload>>) {
      state.accessToken = action.payload.accessToken ?? state.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.actor = action.payload.actor ?? state.actor;
      state.userProfile = action.payload.userProfile ?? state.userProfile;
      state.preferences = action.payload.preferences ?? state.preferences;
      state.joinedClans = action.payload.joinedClans ?? state.joinedClans;
      state.rememberMe = action.payload.rememberMe ?? state.rememberMe;
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    signOut(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.actor = null;
      state.userProfile = null;
      state.preferences = null;
      state.joinedClans = [];
      state.rememberMe = false;
    },
    updateActor(state, action: PayloadAction<Partial<Actor>>) {
      if (state.actor) {
        state.actor = { ...state.actor, ...action.payload };
      }
    },
  },
});

export const { signInSuccess, signOut, updateActor, startLoading, finishLoading, setError, restoreSession } = authSlice.actions;
export default authSlice.reducer;
