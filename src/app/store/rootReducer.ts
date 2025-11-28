import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import clanReducer from '../features/clan/slice';
import profileReducer from '../features/profile/slice';
import loungeReducer from '../features/lounge/store/loungeSlice';
import { authApi } from '../services/authApi';
import { klazaApi } from '../services/klazaApi';
import { clanApi } from '../services/clanApi';
import { eventsApi } from '../services/eventsApi';
import { contentApi } from '../services/contentApi';

const rootReducer = combineReducers({
  auth: authReducer,
  clan: clanReducer,
  profile: profileReducer,
  lounge: loungeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [klazaApi.reducerPath]: klazaApi.reducer,
  [clanApi.reducerPath]: clanApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
