import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

type SignUpCountryScreenProps = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_COUNTRY>;

const SignUpCountryScreen: React.FC<SignUpCountryScreenProps> = ({ navigation, route }) => {
  const [country, setCountry] = useState('');
  const { id, password, termsAgreed1, termsAgreed2, email, emailVerifySeq } = route.params;
  const normalizedCountry = country.trim().toUpperCase();
  const isValid = /^[A-Z]{2}$/.test(normalizedCountry);

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
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
          underlineColor="transparent"
          outlineColor="#4B5563"
          activeOutlineColor="#F9FAFB"
          textColor="#F9FAFB"
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
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
  },
  title: {
    marginBottom: 4,
    color: '#F9FAFB',
  },
  subtitle: {
    marginBottom: 12,
    color: '#9CA3AF',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpCountryScreen;
