import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import { AuthStackParamList } from './types';
import AuthLandingScreen from '../features/auth/screens/AuthLandingScreen';
import SignInScreen from '../features/auth/screens/SignInScreen';
import ForgotIdScreen from '../features/auth/screens/ForgotIdScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import SignUpTermsScreen from '../features/auth/screens/SignUpTermsScreen';
import SignUpIdScreen from '../features/auth/screens/SignUpIdScreen';
import SignUpPasswordScreen from '../features/auth/screens/SignUpPasswordScreen';
import SignUpEmailScreen from '../features/auth/screens/SignUpEmailScreen';
import SignUpEmailCodeScreen from '../features/auth/screens/SignUpEmailCodeScreen';
import SignUpCountryScreen from '../features/auth/screens/SignUpCountryScreen';
import SignUpBirthScreen from '../features/auth/screens/SignUpBirthScreen';
import SignUpFavoritesScreen from '../features/auth/screens/SignUpFavoritesScreen';
import SignUpDoneScreen from '../features/auth/screens/SignUpDoneScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.AUTH_GATE}>
      <Stack.Screen name={ROUTES.AUTH_GATE} component={AuthLandingScreen} />
      <Stack.Screen name={ROUTES.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={ROUTES.FORGOT_ID} component={ForgotIdScreen} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_TERMS} component={SignUpTermsScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_ID} component={SignUpIdScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_PASSWORD} component={SignUpPasswordScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_EMAIL} component={SignUpEmailScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_EMAIL_CODE} component={SignUpEmailCodeScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_COUNTRY} component={SignUpCountryScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_BIRTH} component={SignUpBirthScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_FAVORITES} component={SignUpFavoritesScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_DONE} component={SignUpDoneScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
