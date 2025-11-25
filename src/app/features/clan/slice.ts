import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuzzingMessage, ClanState } from './types';

const initialState: ClanState = {
  clans: [],
  currentClanId: undefined,
  buzzing: {},
};

const clanSlice = createSlice({
  name: 'clan',
  initialState,
  reducers: {
    setCurrentClan(state, action: PayloadAction<string | undefined>) {
      state.currentClanId = action.payload;
    },
    addBuzzingMessage(state, action: PayloadAction<{ clanId: string; message: BuzzingMessage }>) {
      const { clanId, message } = action.payload;
      if (!state.buzzing[clanId]) {
        state.buzzing[clanId] = [];
      }
      state.buzzing[clanId] = [message, ...state.buzzing[clanId]];
    },
    joinClan(state, action: PayloadAction<string>) {
      state.currentClanId = action.payload;
    },
  },
});

export const { setCurrentClan, addBuzzingMessage, joinClan } = clanSlice.actions;
export default clanSlice.reducer;
