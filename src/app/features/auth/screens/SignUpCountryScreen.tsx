import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpCountryScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_COUNTRY>> = ({
  navigation,
}) => {
  const [countryCode, setCountryCode] = useState<'KR' | 'US' | string>('KR');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Select your country</Text>
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton
        onSelect={(country) => setCountryCode(country.cca2)}
      />
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_BIRTH)} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SignUpCountryScreen;
