import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import { ClanStackParamList } from './types';
import ClanListScreen from '../features/clan/screens/ClanListScreen';
import ClanDetailScreen from '../features/clan/screens/ClanDetailScreen';
import ClanPostDetailScreen from '../features/clan/screens/ClanPostDetailScreen';
import ClanPostCreateScreen from '../features/clan/screens/ClanPostCreateScreen';

const Stack = createNativeStackNavigator<ClanStackParamList>();

const ClanNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.CLAN} component={ClanListScreen} />
      <Stack.Screen name={ROUTES.CLAN_DETAIL} component={ClanDetailScreen} />
      <Stack.Screen name={ROUTES.CLAN_POST_DETAIL} component={ClanPostDetailScreen} />
      <Stack.Screen name={ROUTES.CLAN_POST_CREATE} component={ClanPostCreateScreen} />
    </Stack.Navigator>
  );
};

export default ClanNavigator;
