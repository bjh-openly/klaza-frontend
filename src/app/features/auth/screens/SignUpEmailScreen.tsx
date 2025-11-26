import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';
import { useEmailCheckMutation, useSendEmailConfirmMutation } from '../../../services/authApi';

const SignUpEmailScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_EMAIL>> = ({
  navigation,
  route,
}) => {
  const { id, termsAgreed1, termsAgreed2, password } = route.params;
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sentSeq, setSentSeq] = useState<number | null>(null);
  const [emailCheck, { isLoading: isCheckingEmail }] = useEmailCheckMutation();
  const [sendEmailConfirm, { isLoading: sendingConfirm }] = useSendEmailConfirmMutation();
  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          E-mail address
        </Text>
        <Text style={styles.subtitle}>Insert a valid e-mail address.</Text>
        <AuthTextInput
          label="E-mail address"
          value={email}
          onChangeText={(value) => {
            setEmail(value.trim().toLowerCase());
            setEmailChecked(null);
            setEmailError(null);
            setSentSeq(null);
          }}
          autoCapitalize="none"
          error={Boolean(emailError)}
        />
        <View style={styles.helperRow}>
          <HelperText type={isValidEmail ? 'info' : 'error'} visible={!isValidEmail}>
            Please enter a valid e-mail.
          </HelperText>
          {emailChecked === false && <HelperText type="error">Someone already uses it.</HelperText>}
          {emailChecked && <HelperText type="info">This e-mail is available.</HelperText>}
          {emailError && <HelperText type="error">{emailError}</HelperText>}
        </View>
        <View style={styles.actionsRow}>
          <Button
            mode="outlined"
            onPress={async () => {
              setEmailChecked(null);
              setEmailError(null);
              if (!isValidEmail) return;
              try {
                const { available } = await emailCheck({ email }).unwrap();
                setEmailChecked(available);
                if (!available) {
                  setEmailError('Someone already uses it.');
                }
              } catch (e) {
                setEmailError('Could not check e-mail. Try again.');
              }
            }}
            disabled={!isValidEmail || isCheckingEmail}
          >
            Check duplicates
          </Button>
          <Button
            mode="outlined"
            onPress={async () => {
              setEmailError(null);
              if (!isValidEmail || !emailChecked) return;
              try {
                const response = await sendEmailConfirm({ email }).unwrap();
                setSentSeq(response.seq);
              } catch (e) {
                setEmailError('Verification could not be sent.');
              }
            }}
            disabled={!isValidEmail || !emailChecked || sendingConfirm}
          >
            Verify
          </Button>
        </View>
        {sentSeq && <HelperText type="info">We sent an 8-digit verification code.</HelperText>}
        <Button
          mode="contained"
          disabled={!isValidEmail || !emailChecked || !sentSeq}
          style={styles.button}
          onPress={() =>
            navigation.navigate(ROUTES.SIGN_UP_EMAIL_CODE, {
              id,
              termsAgreed1,
              termsAgreed2,
              password,
              email,
              emailVerifySeq: sentSeq ?? undefined,
            })
          }
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 8,
  },
  button: {
    marginTop: 12,
  },
});

export default SignUpEmailScreen;
