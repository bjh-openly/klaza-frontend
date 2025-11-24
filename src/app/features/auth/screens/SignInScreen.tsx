import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signInSuccess, startLoading, finishLoading, setError as setAuthError } from '../slice';
import { setStoredAccessToken } from '../../../services/session';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';
import { useLoginMutation } from '../../../services/authApi';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_IN>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { error: authError } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [login] = useLoginMutation();

  const passwordError = useMemo(
    () => Boolean(authError && authError.toLowerCase().includes('password')),
    [authError],
  );
  const emailError = useMemo(
    () => Boolean(authError && authError.toLowerCase().includes('email')),
    [authError],
  );

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError(null);
    dispatch(startLoading());
    dispatch(setAuthError(null));
    try {
      const { accessToken, actor } = await login({ email, password }).unwrap();
      await setStoredAccessToken(accessToken);
      dispatch(signInSuccess({ accessToken, actor }));
      navigation.getParent()?.reset({ index: 0, routes: [{ name: ROUTES.MAIN as never }] });
    } catch (e) {
      const message = (e as { message?: string })?.message ||
        'Login failed. Please check your email/password.';
      setError(message);
      dispatch(setAuthError(message));
    } finally {
      dispatch(finishLoading());
    }
  };

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Share the StoryTM
          </Text>
          <Text style={styles.subtitle}>Welcome back to KLAZA Hub.</Text>
        </View>

        <AuthTextInput
          label="E-mail address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          error={emailError}
        />
        {emailError && <HelperText type="error">Oops wrong email address! Try again.</HelperText>}

        <AuthTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          error={passwordError}
        />
        {passwordError && <HelperText type="error">Oops wrong password! Try again.</HelperText>}

        <View style={styles.row}>
          <Checkbox status={stayLoggedIn ? 'checked' : 'unchecked'} onPress={() => setStayLoggedIn(!stayLoggedIn)} color="#1D4ED8" />
          <Text style={styles.subtitle}>Stay logged in</Text>
        </View>

        {error && <HelperText type="error">{error}</HelperText>}

        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          Sign in
        </Button>

        <View style={styles.terms}>
          <Text variant="bodySmall" style={styles.mutedText}>
            By tapping "Sign in", you agree to our Terms.
          </Text>
          <Text variant="bodySmall" style={styles.mutedText}>
            Learn how we process your data in our Privacy Policy and Cookies Policy.
          </Text>
        </View>

        <View style={styles.linksRow}>
          <Button mode="text" textColor="#F9FAFB" onPress={() => navigation.navigate(ROUTES.FORGOT_ID)}>
            Find ID/E-mail address
          </Button>
          <Button mode="text" textColor="#F9FAFB" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
            Find password
          </Button>
        </View>

        <Button mode="text" textColor="#F9FAFB" onPress={() => navigation.navigate(ROUTES.SIGN_UP_TERMS)}>
          Create account
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#F9FAFB',
  },
  subtitle: {
    marginTop: 4,
    color: '#9CA3AF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  button: {
    marginTop: 12,
  },
  input: {
    marginTop: 8,
  },
  terms: {
    marginVertical: 12,
    gap: 2,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mutedText: {
    color: '#9CA3AF',
  },
});

export default SignInScreen;
