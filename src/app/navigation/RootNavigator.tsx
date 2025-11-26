import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAppDispatch } from '../store/hooks';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { restoreSession, finishLoading, startLoading } from '../features/auth/slice';
import { clearStoredAccessToken, getStoredAccessToken } from '../services/session';
import apiClient from '../services/apiClient';
import MyPageScreen from '../features/profile/screens/MyPageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const SplashScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const startedAt = Date.now();
    const bootstrap = async () => {
      dispatch(startLoading());
      const storedToken = await getStoredAccessToken();
      let targetRoute = ROUTES.MAIN;
      if (storedToken && isMounted) {
        try {
          const { data } = await apiClient.get('/auth/tokenCheck');
          if (data?.valid) {
            dispatch(
              restoreSession({
                accessToken: storedToken,
                actor: {
                  id: data.id ?? data.loginId ?? '',
                  username: data.id ?? data.loginId ?? '',
                  email: data.email,
                  country: data.country,
                  birthDate: data.birthDate,
                  gender: data.gender,
                  actorId: data.actorId,
                  userId: data.userId,
                },
              }),
            );
          } else {
            await clearStoredAccessToken();
          }
        } catch (error) {
          await clearStoredAccessToken();
        }
      }

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 2000 - elapsed);

      setTimeout(() => {
        if (!isMounted) return;
        dispatch(finishLoading());
        navigation.reset({ index: 0, routes: [{ name: targetRoute }] });
      }, Math.min(remaining, 3000));
    };

    bootstrap();
    return () => {
      isMounted = false;
    };
  }, [dispatch, navigation]);

  return (
    <View style={styles.splashContainer}>
      <View style={styles.overlay}>
        <View style={styles.brandRow}>
          <Text variant="headlineLarge" style={styles.logoText}>
            KLAZA
          </Text>
          <Text variant="headlineMedium" style={styles.logoAccent}>
            Hub
          </Text>
          <MaterialCommunityIcons name="cat" size={28} color="#f59e0b" style={styles.logoIcon} />
        </View>
        <Text variant="titleMedium" style={styles.tagline}>
          Share the Story™
        </Text>
      </View>
    </View>
  );
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.SPLASH}>
      <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} options={{ animation: 'fade' }} />
      <RootStack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
      <RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
      <RootStack.Screen name={ROUTES.MY_PAGE} component={MyPageScreen} />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  logoText: {
    color: '#fff',
    letterSpacing: 2,
    fontWeight: '900',
  },
  logoAccent: {
    color: '#f59e0b',
    fontWeight: '900',
    marginBottom: 2,
  },
  logoIcon: {
    marginLeft: 4,
    marginBottom: 4,
  },
  tagline: {
    color: '#e5e7eb',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

export default RootNavigator;
