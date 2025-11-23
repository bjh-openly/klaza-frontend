import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'klaza.tokens';

export const saveTokens = async (accessToken: string, refreshToken?: string) => {
  const payload = JSON.stringify({ accessToken, refreshToken });
  await AsyncStorage.setItem(TOKEN_KEY, payload);
};

export const getTokens = async () => {
  const raw = await AsyncStorage.getItem(TOKEN_KEY);
  return raw ? (JSON.parse(raw) as { accessToken: string; refreshToken?: string }) : null;
};

export const clearTokens = async () => AsyncStorage.removeItem(TOKEN_KEY);
