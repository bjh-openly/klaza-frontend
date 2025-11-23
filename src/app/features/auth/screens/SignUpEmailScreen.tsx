import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpEmailScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL>> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Verify your email</Text>
      <AuthTextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <HelperText type="info">We will send a 6-digit verification code.</HelperText>
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL_CODE)}>
        Send code
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default SignUpEmailScreen;
