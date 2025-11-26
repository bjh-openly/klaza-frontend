import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OtpCodeInput from '../components/OtpCodeInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useVerifyEmailConfirmMutation } from '../../../services/authApi';

const SignUpEmailCodeScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL_CODE>> = ({
  navigation,
  route,
}) => {
  const { id, password, termsAgreed1, termsAgreed2, email, emailVerifySeq } = route.params;
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifyEmailConfirm, { isLoading }] = useVerifyEmailConfirmMutation();

  const handleVerify = async () => {
    if (code.length < 8) {
      setError('Please enter all 8 digits.');
      return;
    }
    try {
      const response = await verifyEmailConfirm({ email, code, seq: emailVerifySeq }).unwrap();
      if (response.verified) {
        navigation.navigate(ROUTES.SIGN_UP_COUNTRY, {
          id,
          password,
          termsAgreed1,
          termsAgreed2,
          email,
          emailVerifySeq: response.seq,
        });
      } else {
        setError('Verification failed. Try again.');
      }
    } catch (e) {
      setError('Verification failed. Check the code and try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Verify {email}
      </Text>
      <Text style={styles.subtitle}>
        Check your e-mail inbox for a verification code. (This may take a few minutes)
      </Text>
      <OtpCodeInput value={code} setValue={setCode} cellCount={8} />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button mode="contained" disabled={code.length < 8 || isLoading} onPress={handleVerify} style={styles.button}>
        Verify
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
  button: {
    marginTop: 12,
  },
});

export default SignUpEmailCodeScreen;
