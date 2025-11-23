import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';

const AppBottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, descriptors, state }) => {
  const routes = state.routes;
  return (
    <BottomNavigation.Bar
      navigationState={state}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!event.defaultPrevented) {
          navigation.navigate(route.name);
        } else {
          preventDefault();
        }
      }}
      renderIcon={({ route, color }) => {
        const descriptor = descriptors[route.key];
        const { options } = descriptor;
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused: state.index === routes.indexOf(route), color, size: 24 });
        }
        return null;
      }}
      getLabelText={({ route }) => descriptors[route.key].options.title || route.name}
    />
  );
};

export default AppBottomTabBar;
