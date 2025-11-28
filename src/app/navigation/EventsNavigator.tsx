import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsHomeScreen from '../features/events/screens/EventsHomeScreen';
import PollDetailScreen from '../features/events/screens/PollDetailScreen';
import RaffleDetailScreen from '../features/events/screens/RaffleDetailScreen';
import { EventsStackParamList } from './types';
import { ROUTES } from '../config/constants';

const Stack = createNativeStackNavigator<EventsStackParamList>();

const EventsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.EVENTS} component={EventsHomeScreen} />
    <Stack.Screen name={ROUTES.POLL_DETAIL} component={PollDetailScreen} />
    <Stack.Screen name={ROUTES.RAFFLE_DETAIL} component={RaffleDetailScreen} />
  </Stack.Navigator>
);

export default EventsNavigator;
