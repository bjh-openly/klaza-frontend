import React, { createContext, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../config/constants';
import { OnboardingStackParamList } from './types';
import OnboardingWelcomeScreen from '../features/onboarding/screens/OnboardingWelcomeScreen';
import OnboardingOverviewScreen from '../features/onboarding/screens/OnboardingOverviewScreen';

type OnboardingContextValue = {
  finish: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue>({ finish: () => {} });

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

interface Props {
  onFinished: () => void;
}

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingNavigator: React.FC<Props> = ({ onFinished }) => {
  return (
    <OnboardingContext.Provider value={{ finish: onFinished }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.ONBOARDING_WELCOME} component={OnboardingWelcomeScreen} />
        <Stack.Screen name={ROUTES.ONBOARDING_NEXT} component={OnboardingOverviewScreen} />
      </Stack.Navigator>
    </OnboardingContext.Provider>
  );
};

export default OnboardingNavigator;
