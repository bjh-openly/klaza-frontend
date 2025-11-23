import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signInSuccess, startLoading, finishLoading } from '../slice';
import { setStoredAccessToken } from '../../../services/session';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_IN>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { error: authError } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const passwordError = useMemo(
    () => Boolean(authError && authError.toLowerCase().includes('password')),
    [authError],
  );
  const idError = useMemo(() => Boolean(authError && authError.toLowerCase().includes('id')), [authError]);

  const handleSignIn = async () => {
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }
    dispatch(startLoading());
    // TODO: replace with real /auth/login API call
    const demoToken = 'demo-token';
    await setStoredAccessToken(demoToken);
    dispatch(signInSuccess({ accessToken: demoToken, actor: { id: '1', username, email: `${username}@mail.com` } }));
    dispatch(finishLoading());
    navigation.getParent()?.reset({ index: 0, routes: [{ name: ROUTES.MAIN as never }] });
  };

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineLarge">Share the StoryTM</Text>
          <Text style={styles.subtitle}>Welcome back to KLAZA Hub.</Text>
        </View>

        <AuthTextInput
          label="ID or E-mail address"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={idError}
        />
        {idError && <HelperText type="error">Oops wrong ID/address! Try again.</HelperText>}

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
          <Checkbox status={stayLoggedIn ? 'checked' : 'unchecked'} onPress={() => setStayLoggedIn(!stayLoggedIn)} />
          <Text>Stay logged in</Text>
        </View>

        {error && <HelperText type="error">{error}</HelperText>}

        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          Sign in
        </Button>

        <View style={styles.terms}>
          <Text variant="bodySmall">By tapping "Sign in", you agree to our Terms.</Text>
          <Text variant="bodySmall">Learn how we process your data in our Privacy Policy and Cookies Policy.</Text>
        </View>

        <View style={styles.linksRow}>
          <Button mode="text" onPress={() => navigation.navigate(ROUTES.FORGOT_ID)}>
            Find ID/E-mail address
          </Button>
          <Button mode="text" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
            Find password
          </Button>
        </View>

        <Button mode="text" onPress={() => navigation.navigate(ROUTES.SIGN_UP_TERMS)}>
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
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 4,
    color: '#6b7280',
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
});

export default SignInScreen;
