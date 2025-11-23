import { Alert } from 'react-native';

export type PickedImage = {
  uri?: string;
  fileName?: string;
  type?: string;
};

export const pickImage = async (): Promise<PickedImage | undefined> => {
  Alert.alert(
    'Upload coming soon',
    'Image selection is not available in this build. Please try again once media upload support is enabled.',
  );
  return undefined;
};
