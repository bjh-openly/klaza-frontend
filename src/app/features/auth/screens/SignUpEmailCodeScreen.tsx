import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import OtpCodeInput from '../components/OtpCodeInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpEmailCodeScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL_CODE>> = ({
  navigation,
}) => {
  const [code, setCode] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Enter verification code</Text>
      <OtpCodeInput value={code} setValue={setCode} />
      <Button mode="contained" disabled={code.length < 6} onPress={() => navigation.navigate(ROUTES.SIGN_UP_COUNTRY)}>
        Verify
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default SignUpEmailCodeScreen;
