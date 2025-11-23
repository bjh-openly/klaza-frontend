import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

export const pickImage = async (options?: ImageLibraryOptions): Promise<Asset | undefined> => {
  const result = await launchImageLibrary({ mediaType: 'photo', ...options });
  if (result.assets && result.assets.length > 0) {
    return result.assets[0];
  }
  return undefined;
};
