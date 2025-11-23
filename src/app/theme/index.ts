import React from 'react';
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from './colors';
import { typography } from './typography';

const fontConfig = configureFonts({
  config: {
    fontFamily: typography.fontFamily,
  },
});

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.text,
  },
  fonts: fontConfig,
};

export const IconComponent = (props: any) => <MaterialCommunityIcons {...props} />;
