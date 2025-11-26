import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../features/auth/types';

const AUTH_STATE_KEY = 'klaza.authState';

export type PersistedAuthState = Omit<AuthState, 'isLoading' | 'error'>;

export const getStoredAuthState = async (): Promise<PersistedAuthState | null> => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_STATE_KEY);
    return raw ? (JSON.parse(raw) as PersistedAuthState) : null;
  } catch (error) {
    return null;
  }
};

export const setStoredAuthState = async (state: PersistedAuthState) => {
  try {
    await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    // noop
  }
};

export const clearStoredAuthState = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_STATE_KEY);
  } catch (error) {
    // noop
  }
};

export const getStoredAccessToken = async (): Promise<string | null> => {
  const stored = await getStoredAuthState();
  return stored?.accessToken ?? null;
};

export const clearStoredAccessToken = async () => clearStoredAuthState();
