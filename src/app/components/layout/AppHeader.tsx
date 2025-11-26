import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ROUTES } from '../../config/constants';
import { useAppSelector } from '../../store/hooks';

interface Props {
  showProfileIcon?: boolean;
  logoSource?: ImageSourcePropType;
}

const AppHeader: React.FC<Props> = ({ showProfileIcon = true, logoSource }) => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { accessToken } = useAppSelector((state) => state.auth);

  const goToMyPage = () => {
    if (!accessToken) {
      navigation.navigate(ROUTES.AUTH as never);
      return;
    }

    navigation.navigate(ROUTES.MY_PAGE as never);
  };

  return (
    <View style={styles.container}>
      {logoSource ? (
        <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />
      ) : (
        <Text variant="titleMedium" style={styles.logoText}>
          KLAZA Hub
        </Text>
      )}
      {showProfileIcon && (
        <TouchableOpacity onPress={goToMyPage} hitSlop={8}>
          <MaterialCommunityIcons name="account-circle-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoImage: {
    height: 24,
    width: 140,
  },
  logoText: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
});

export default AppHeader;
