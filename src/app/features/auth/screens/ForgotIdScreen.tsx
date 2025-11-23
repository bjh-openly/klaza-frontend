import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, HelperText } from 'react-native-paper';
import AuthTextInput from '../components/AuthTextInput';
import OtpCodeInput from '../components/OtpCodeInput';

const ForgotIdScreen = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Recover your ID
      </Text>
      <AuthTextInput label="Email or phone" value={email} onChangeText={setEmail} />
      <Button mode="contained" onPress={() => setSent(true)} style={styles.button}>
        Send 6-digit code
      </Button>
      {sent && (
        <>
          <HelperText type="info">Check your inbox for the verification code.</HelperText>
          <OtpCodeInput value={code} setValue={setCode} />
          <Button mode="contained" disabled={code.length < 6}>
            Verify
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
    marginTop: 12,
  },
});

export default ForgotIdScreen;
