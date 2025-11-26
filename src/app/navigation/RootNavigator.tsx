import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAppDispatch } from '../store/hooks';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { restoreSession, finishLoading, startLoading } from '../features/auth/slice';
import { clearStoredAccessToken, getStoredAccessToken } from '../services/session';
import apiClient from '../services/apiClient';
import MyPageScreen from '../features/profile/screens/MyPageScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const SplashScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const startedAt = Date.now();
    const bootstrap = async () => {
      dispatch(startLoading());
      const storedToken = await getStoredAccessToken();
      let targetRoute = ROUTES.AUTH;
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
            targetRoute = ROUTES.MAIN;
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
        <Text variant="displaySmall" style={styles.logo}>
          KLAZA
          <Text style={styles.logoAccent}>Hub</Text>
        </Text>
        <Text variant="titleMedium" style={styles.tagline}>
          Share the Story™
        </Text>
        <ActivityIndicator color="#fff" style={styles.spinner} />
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    color: '#fff',
    letterSpacing: 2,
  },
  logoAccent: {
    color: '#f59e0b',
  },
  tagline: {
    color: '#e5e7eb',
    marginTop: 8,
  },
  spinner: {
    marginTop: 20,
  },
});

export default RootNavigator;
