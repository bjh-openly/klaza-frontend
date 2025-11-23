import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import LoungeNavigator from './LoungeNavigator';
import ClanListScreen from '../features/clan/screens/ClanListScreen';
import EventsHomeScreen from '../features/events/screens/EventsHomeScreen';
import { MainTabParamList } from './types';
import { TABS } from '../config/constants';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home-outline';
          if (route.name === TABS.HOME) iconName = 'home-outline';
          if (route.name === TABS.LOUNGE) iconName = 'newspaper-variant-outline';
          if (route.name === TABS.EVENTS) iconName = 'ticket-percent-outline';
          if (route.name === TABS.CLAN) iconName = 'account-group-outline';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name={TABS.HOME} component={HomeNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name={TABS.LOUNGE} component={LoungeNavigator} options={{ title: 'Lounge-main' }} />
      <Tab.Screen name={TABS.EVENTS} component={EventsHomeScreen} options={{ title: 'Event' }} />
      <Tab.Screen name={TABS.CLAN} component={ClanListScreen} options={{ title: 'Clan-main' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
