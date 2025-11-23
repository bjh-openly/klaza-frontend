import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import LoungeListScreen from '../features/lounge/screens/LoungeListScreen';
import LoungeDetailScreen from '../features/lounge/screens/LoungeDetailScreen';
import { LoungeStackParamList } from './types';

const Stack = createNativeStackNavigator<LoungeStackParamList>();

const LoungeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.LOUNGE} component={LoungeListScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.LOUNGE_DETAIL}
        component={LoungeDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoungeNavigator;
