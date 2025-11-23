import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OtpCodeInput from '../components/OtpCodeInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpEmailCodeScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL_CODE>> = ({
  navigation,
  route,
}) => {
  const { email } = route.params ?? { email: '' };
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (code === '123456') {
      navigation.navigate(ROUTES.SIGN_UP_COUNTRY);
    } else {
      setError(true);
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
      <OtpCodeInput value={code} setValue={setCode} />
      {error && <HelperText type="error">Oops try again!</HelperText>}
      <Button mode="contained" disabled={code.length < 6} onPress={handleVerify} style={styles.button}>
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
