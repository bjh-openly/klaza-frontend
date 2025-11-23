import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import AuthTextInput from '../components/AuthTextInput';
import OtpCodeInput from '../components/OtpCodeInput';

const ForgotIdScreen = () => {
  const [contact, setContact] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (code.length === 6) {
      setVerified(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Find ID/E-mail address
      </Text>
      <AuthTextInput
        label="Phone number"
        value={contact}
        onChangeText={setContact}
        autoComplete="tel"
        keyboardType="phone-pad"
      />
      <AuthTextInput
        label="ID / E-mail address"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        style={styles.input}
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
          {verified && (
            <Text style={styles.result}>Your ID / E-mail address is: Email@email.com</Text>
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
  input: {
    marginTop: 8,
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

export default ForgotIdScreen;
