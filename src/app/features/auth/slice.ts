import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Actor } from './types';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  actor: null,
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
    signInSuccess(state, action: PayloadAction<{ accessToken: string; actor: Actor }>) {
      state.accessToken = action.payload.accessToken;
      state.actor = action.payload.actor;
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
    },
    updateActor(state, action: PayloadAction<Partial<Actor>>) {
      if (state.actor) {
        state.actor = { ...state.actor, ...action.payload };
      }
    },
  },
});

export const { signInSuccess, signOut, updateActor, startLoading, setError } = authSlice.actions;
export default authSlice.reducer;
