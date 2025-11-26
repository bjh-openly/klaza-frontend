import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

const SignUpPasswordScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_PASSWORD>> = ({
  navigation,
  route,
}) => {
  const { id, termsAgreed1, termsAgreed2 } = route.params;
  const [password, setPassword] = useState('');
  const hasMinLength = password.length >= 10;
  const hasLetter = useMemo(() => /[A-Za-z]/.test(password), [password]);
  const hasNumber = useMemo(() => /\d/.test(password), [password]);
  const hasSymbol = useMemo(() => /[^A-Za-z0-9]/.test(password), [password]);
  const isValid = hasMinLength && hasLetter && hasNumber && hasSymbol;

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Password
        </Text>
        <Text style={styles.subtitle}>Combine at least 10 characters of letters, numbers and symbols</Text>
        <AuthTextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <View style={styles.helperRow}>
          <HelperText type={hasMinLength ? 'info' : 'error'}>At least 10 characters</HelperText>
          <HelperText type={hasLetter ? 'info' : 'error'}>Contains a letter</HelperText>
          <HelperText type={hasNumber ? 'info' : 'error'}>Contains a number</HelperText>
          <HelperText type={hasSymbol ? 'info' : 'error'}>Contains a symbol</HelperText>
        </View>
        <Button
          mode="contained"
          disabled={!isValid}
          onPress={() =>
            navigation.navigate(ROUTES.SIGN_UP_EMAIL, {
              id,
              termsAgreed1,
              termsAgreed2,
              password,
            })
          }
          style={styles.button}
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
    marginTop: 8,
  },
});

export default SignUpPasswordScreen;
