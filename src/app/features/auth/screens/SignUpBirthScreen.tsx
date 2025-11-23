import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpBirthScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_BIRTH>> = ({ navigation }) => {
  const [birthDate, setBirthDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });

  const isValidDate = (value: string) => {
    // Basic YYYY-MM-DD validation without external pickers to keep bundling lean
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return false;
    const [_, year, month, day] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    return parsed.getFullYear() === Number(year) && parsed.getMonth() === Number(month) - 1 && parsed.getDate() === Number(day);
  };

  const birthDateInvalid = birthDate.length > 0 && !isValidDate(birthDate);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Select your birth date</Text>
      <TextInput
        mode="outlined"
        label="Birth date (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        keyboardType="numbers-and-punctuation"
        error={birthDateInvalid}
        autoComplete="birthdate-full"
        inputMode="numeric"
        style={styles.input}
      />
      <HelperText type="error" visible={birthDateInvalid}>
        Please enter a valid date in YYYY-MM-DD format.
      </HelperText>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(ROUTES.SIGN_UP_FAVORITES)}
        style={styles.button}
        disabled={birthDateInvalid}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 24,
  },
});

export default SignUpBirthScreen;
