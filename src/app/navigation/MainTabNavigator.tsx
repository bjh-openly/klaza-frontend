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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 64,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'circle-outline';
          if (route.name === TABS.HOME) iconName = 'home-variant-outline';
          if (route.name === TABS.LOUNGE) iconName = 'sofa-single-outline';
          if (route.name === TABS.EVENTS) iconName = 'party-popper';
          if (route.name === TABS.CLAN) iconName = 'shield-edit-outline';
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
