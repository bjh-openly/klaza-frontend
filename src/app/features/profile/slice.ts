import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PointsHistoryItem, Preference, ProfileState } from './types';

const initialState: ProfileState = {
  points: 24,
  pointsHistory: [
    { id: 'ph1', date: '2024-06-01', description: 'Poll participation', delta: 1 },
    { id: 'ph2', date: '2024-05-28', description: 'Raffle entry', delta: -2 },
  ],
  preferences: [
    { id: 'pref1', label: 'drama' },
    { id: 'pref2', label: 'fantasy' },
    { id: 'pref3', label: 'life' },
  ],
  notifications: {
    push: true,
    sns: false,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleNotification(state, action: PayloadAction<{ key: 'push' | 'sns' }>) {
      const key = action.payload.key;
      state.notifications[key] = !state.notifications[key];
    },
    addPreference(state, action: PayloadAction<Preference>) {
      state.preferences.push(action.payload);
    },
    addPointsHistory(state, action: PayloadAction<PointsHistoryItem>) {
      state.pointsHistory.unshift(action.payload);
    },
    adjustPoints(state, action: PayloadAction<number>) {
      state.points += action.payload;
    },
  },
});

export const { toggleNotification, addPreference, addPointsHistory, adjustPoints } = profileSlice.actions;
export default profileSlice.reducer;
