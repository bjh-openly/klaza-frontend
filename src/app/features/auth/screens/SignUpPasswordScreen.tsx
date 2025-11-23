import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpPasswordScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_PASSWORD>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 10;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Create a password</Text>
      <AuthTextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <HelperText type={isValid ? 'info' : 'error'}>
        Combine at least 10 characters of letters, numbers and symbols.
      </HelperText>
      <Button mode="contained" disabled={!isValid} onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL)}>
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default SignUpPasswordScreen;
