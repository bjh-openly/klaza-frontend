import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAppSelector } from '../store/hooks';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const SplashScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
    <Text variant="titleMedium" style={{ marginTop: 12 }}>
      Loading KLAZA Hub...
    </Text>
  </View>
);

const RootNavigator = () => {
  const { accessToken, isLoading } = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(accessToken);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const loadFlag = async () => {
      const flag = await AsyncStorage.getItem('klaza.onboardingCompleted');
      setHasCompletedOnboarding(flag === 'true');
      setCheckingOnboarding(false);
    };
    loadFlag();
  }, []);

  if (isLoading || checkingOnboarding) {
    return <SplashScreen />;
  }

  const initialRoute = hasCompletedOnboarding ? (isLoggedIn ? ROUTES.MAIN : ROUTES.AUTH) : ROUTES.ONBOARDING;

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} options={{ animation: 'fade' }} />
      {!hasCompletedOnboarding && (
        <RootStack.Screen name={ROUTES.ONBOARDING}>
          {() => <OnboardingNavigator onFinished={() => setHasCompletedOnboarding(true)} />}
        </RootStack.Screen>
      )}
      {isLoggedIn ? (
        <RootStack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
      ) : (
        <RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
