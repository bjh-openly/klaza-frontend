import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeIntroScreen from '../features/home/screens/HomeIntroScreen';
import HomeDiscoverScreen from '../features/home/screens/HomeDiscoverScreen';
import { HomeStackParamList } from './types';
import { ROUTES } from '../config/constants';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.HOME_INTRO} component={HomeIntroScreen} />
    <Stack.Screen name={ROUTES.HOME_DISCOVER} component={HomeDiscoverScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
