import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import clanReducer from '../features/clan/slice';
import eventsReducer from '../features/events/slice';
import profileReducer from '../features/profile/slice';
import { authApi } from '../services/authApi';
import { klazaApi } from '../services/klazaApi';
import { clanApi } from '../services/clanApi';
import { eventsApi } from '../services/eventsApi';

const rootReducer = combineReducers({
  auth: authReducer,
  clan: clanReducer,
  events: eventsReducer,
  profile: profileReducer,
  [authApi.reducerPath]: authApi.reducer,
  [klazaApi.reducerPath]: klazaApi.reducer,
  [clanApi.reducerPath]: clanApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
