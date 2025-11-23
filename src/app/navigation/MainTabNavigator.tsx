import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import LoungeListScreen from '../features/lounge/screens/LoungeListScreen';
import ClanListScreen from '../features/clan/screens/ClanListScreen';
import EventsHomeScreen from '../features/events/screens/EventsHomeScreen';
import MyPageScreen from '../features/profile/screens/MyPageScreen';
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
          if (route.name === TABS.CLAN) iconName = 'account-group-outline';
          if (route.name === TABS.EVENTS) iconName = 'ticket-percent-outline';
          if (route.name === TABS.MY) iconName = 'account-circle-outline';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name={TABS.HOME} component={HomeNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name={TABS.LOUNGE} component={LoungeListScreen} options={{ title: 'Lounge' }} />
      <Tab.Screen name={TABS.CLAN} component={ClanListScreen} options={{ title: 'Clan' }} />
      <Tab.Screen name={TABS.EVENTS} component={EventsHomeScreen} options={{ title: 'Events' }} />
      <Tab.Screen name={TABS.MY} component={MyPageScreen} options={{ title: 'My' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
