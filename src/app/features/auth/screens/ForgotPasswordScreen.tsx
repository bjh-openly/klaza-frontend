import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import AuthTextInput from '../components/AuthTextInput';
import OtpCodeInput from '../components/OtpCodeInput';

const ForgotPasswordScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = () => {
    if (code === '123456') {
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Find password
      </Text>
      <AuthTextInput
        label="ID / E-mail address"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={() => setSent(true)} style={styles.button}>
        Send 6-digit code
      </Button>
      {sent && (
        <View style={styles.verification}>
          <HelperText type="info">
            Verify with a 6-digit code sent to your phone. (This may take a few minutes)
          </HelperText>
          <OtpCodeInput value={code} setValue={setCode} />
          <Button mode="contained" onPress={handleVerify} disabled={code.length < 6} style={styles.button}>
            Verify
          </Button>
          {error && <HelperText type="error">Oops try again!</HelperText>}
          {success && (
            <Text style={styles.result}>
              Check your e-mail inbox for a temporary password. (This may take a few minutes)
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  verification: {
    marginTop: 16,
    gap: 8,
  },
  result: {
    marginTop: 8,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
