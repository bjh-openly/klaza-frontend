import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';
import { useAppSelector } from '../store/hooks';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

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

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} options={{ animation: 'fade' }} />
      {isLoggedIn ? (
        <RootStack.Screen name={ROUTES.MAIN} component={MainTabNavigator} />
      ) : (
        <RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
