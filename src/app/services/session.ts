import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'klaza.accessToken';

export const getStoredAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    return null;
  }
};

export const setStoredAccessToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    // noop
  }
};

export const clearStoredAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    // noop
  }
};
