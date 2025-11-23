import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuzzingMessage, Clan, ClanState } from './types';

const initialState: ClanState = {
  clans: [
    {
      id: '1',
      name: 'SCI-FY',
      description: 'Futuristic tales and sci-fi fandoms.',
      tags: ['#sci-fi', '#future'],
      latestBuzz: 'New teaser dropped today!'
    },
    {
      id: '2',
      name: 'The Rom-commers',
      description: 'Romance and comedy shows lovers unite.',
      tags: ['#romance', '#comedy'],
      latestBuzz: 'Share your favorite couple moment.'
    },
  ],
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
