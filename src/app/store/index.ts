import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { authApi } from '../services/authApi';
import { klazaApi } from '../services/klazaApi';
import { clanApi } from '../services/clanApi';
import { eventsApi } from '../services/eventsApi';
import { setAuthTokenProvider } from '../services/apiClient';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      klazaApi.middleware,
      clanApi.middleware,
      eventsApi.middleware,
    ),
});

setAuthTokenProvider(() => store.getState().auth.accessToken);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
