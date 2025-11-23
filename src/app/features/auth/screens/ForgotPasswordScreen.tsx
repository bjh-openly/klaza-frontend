import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import AuthTextInput from '../components/AuthTextInput';
import OtpCodeInput from '../components/OtpCodeInput';

const ForgotPasswordScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Reset your password
      </Text>
      <AuthTextInput label="Email or phone" value={identifier} onChangeText={setIdentifier} />
      <Button mode="contained" onPress={() => setSent(true)} style={styles.button}>
        Send 6-digit code
      </Button>
      {sent && (
        <>
          <HelperText type="info">Enter the verification code to reset your password.</HelperText>
          <OtpCodeInput value={code} setValue={setCode} />
          <Button mode="contained" disabled={code.length < 6}>
            Verify & Continue
          </Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  button: {
    marginVertical: 12,
  },
});

export default ForgotPasswordScreen;
