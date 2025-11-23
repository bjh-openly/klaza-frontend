import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import LoungeFeed from '../../lounge/components/LoungeFeed';
import { ROUTES, TABS } from '../../../config/constants';
import { useAppSelector } from '../../../store/hooks';
import { KlazaSearchItem } from '../../../services/klazaApi';

const HomeIntroScreen = () => {
  const navigation = useNavigation();
  const { accessToken } = useAppSelector((state) => state.auth);
  const tabNav = navigation.getParent();
  const rootNav = navigation.getParent()?.getParent();

  const goProfile = () => {
    if (accessToken) {
      rootNav?.navigate(ROUTES.MY_PAGE as never) || navigation.navigate(ROUTES.MY_PAGE as never);
    } else {
      rootNav?.navigate(ROUTES.AUTH as never, { screen: ROUTES.SIGN_IN } as never) ||
        navigation.navigate(ROUTES.AUTH as never, { screen: ROUTES.SIGN_IN } as never);
    }
  };

  const openLoungeDetail = (item: KlazaSearchItem) => {
    tabNav?.navigate(TABS.LOUNGE as never, {
      screen: ROUTES.LOUNGE_DETAIL,
      params: { item },
    } as never);
  };

  return (
    <AppSafeArea>
      <LoungeFeed
        contentPadding={0}
        onPressItem={openLoungeDetail}
        header={
          <>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80' }}
              style={styles.hero}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay}>
                <View style={styles.heroHeader}>
                  <Text variant="titleLarge" style={styles.logo}>
                    KLAZA<Text style={styles.logoAccent}>Hub</Text>
                  </Text>
                  <IconButton icon="account-circle" iconColor="#fff" size={28} onPress={goProfile} />
                </View>
                <Text variant="displaySmall" style={styles.heroTitle}>
                  Share the Story™
                </Text>
                <Text style={styles.heroSubtitle}>오늘의 라운지 포스트를 만나보세요.</Text>
              </View>
            </ImageBackground>
            <View style={styles.sectionTitle}>
              <Text variant="titleMedium" style={styles.sectionLabel}>
                Lounge
              </Text>
              <Text style={styles.sectionDescription}>클라자에 올라온 글을 최신 순으로 보여줘요.</Text>
            </View>
          </>
        }
      />
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: 320,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    letterSpacing: 1.5,
  },
  logoAccent: {
    color: '#f59e0b',
  },
  heroTitle: {
    color: '#fff',
    marginTop: 16,
  },
  heroSubtitle: {
    color: '#e5e7eb',
    marginTop: 6,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  sectionLabel: {
    fontWeight: '700',
  },
  sectionDescription: {
    color: '#6b7280',
    marginTop: 4,
  },
});

export default HomeIntroScreen;
