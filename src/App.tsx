/*
Runtime dependencies:
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-paper react-native-vector-icons @reduxjs/toolkit react-redux axios @react-native-async-storage/async-storage react-hook-form @hookform/resolvers zod react-native-image-picker react-native-confirmation-code-field react-native-date-picker react-native-country-picker-modal react-native-localize i18next react-i18next react-native-keyboard-aware-scroll-view

Development dependencies:
npm install -D typescript @types/react @types/react-native @types/react-redux @types/react-native-vector-icons
*/
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './app/navigation/RootNavigator';
import { store } from './app/store';
import { theme } from './app/theme';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
