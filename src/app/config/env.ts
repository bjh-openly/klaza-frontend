import { Platform } from 'react-native';

const emulatorBaseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || `${emulatorBaseUrl}/api/v1`;
export const FEATURE_FLAGS = {
  enableMockApis: false,
};
