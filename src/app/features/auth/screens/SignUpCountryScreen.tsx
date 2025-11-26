import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

type SignUpCountryScreenProps = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_COUNTRY>;

const SignUpCountryScreen: React.FC<SignUpCountryScreenProps> = ({ navigation, route }) => {
  const [country, setCountry] = useState('');
  const { id, password, termsAgreed1, termsAgreed2, email, emailVerifySeq } = route.params;
  const normalizedCountry = country.trim().toUpperCase();
  const isValid = /^[A-Z]{2}$/.test(normalizedCountry);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Country
      </Text>
      <Text style={styles.subtitle}>Enter your country (ISO-3166-1 alpha-2).</Text>
      <TextInput
        mode="outlined"
        label="Country"
        placeholder="KR"
        value={normalizedCountry}
        onChangeText={(value) => setCountry(value.toUpperCase())}
        style={styles.input}
      />
      <HelperText type={isValid ? 'info' : 'error'} visible>
        Use a 2-letter country code.
      </HelperText>
      <Button
        mode="contained"
        disabled={!isValid}
        onPress={() =>
          navigation.navigate(ROUTES.SIGN_UP_BIRTH, {
            id,
            password,
            termsAgreed1,
            termsAgreed2,
            email,
            emailVerifySeq,
            country: normalizedCountry,
          })
        }
        style={styles.button}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 12,
    color: '#6b7280',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpCountryScreen;
