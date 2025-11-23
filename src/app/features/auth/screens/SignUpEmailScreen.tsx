import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

const SignUpEmailScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const isValidEmail = email.includes('@');

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          E-mail address
        </Text>
        <Text style={styles.subtitle}>Insert a valid e-mail address.</Text>
        <AuthTextInput label="E-mail address" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <View style={styles.helperRow}>
          <HelperText type={isValidEmail ? 'info' : 'error'} visible={!isValidEmail}>
            Please enter a valid e-mail.
          </HelperText>
        </View>
        <Button mode="outlined" onPress={() => setSent(true)} disabled={!isValidEmail}>
          Verify
        </Button>
        {sent && <HelperText type="info">We sent a 6-digit verification code.</HelperText>}
        <Button
          mode="contained"
          disabled={!isValidEmail}
          style={styles.button}
          onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL_CODE, { email })}
        >
          Submit
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
  },
  title: {
    marginBottom: 4,
    color: '#F9FAFB',
  },
  subtitle: {
    marginBottom: 12,
    color: '#9CA3AF',
  },
  helperRow: {
    marginVertical: 4,
  },
  button: {
    marginTop: 12,
  },
});

export default SignUpEmailScreen;
