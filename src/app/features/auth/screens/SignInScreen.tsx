import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { finishLoading, setError as setAuthError, signInSuccess, startLoading } from '../slice';
import { clearStoredAuthState, setStoredAuthState } from '../../../services/session';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';
import apiClient from '../../../services/apiClient';
import { LoginRedirectTarget } from '../../../navigation/types';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_IN>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { error: authError } = useAppSelector((state) => state.auth);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const redirect: LoginRedirectTarget | undefined = route.params?.redirect;

  const passwordError = useMemo(
    () => Boolean(authError && authError.toLowerCase().includes('password')),
    [authError],
  );
  const idError = useMemo(() => Boolean(authError && authError.toLowerCase().includes('id')), [authError]);

  const handleSignIn = async () => {
    if (!loginId || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError(null);
    dispatch(startLoading());
    dispatch(setAuthError(null));
    try {
      const response = await apiClient.post('/auth/login', {
        id: loginId.trim(),
        password,
        rememberMe: stayLoggedIn,
      });

      dispatch(
        signInSuccess({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken ?? null,
          actor: response.data.actor,
          userProfile: response.data.userProfile,
          preferences: response.data.preferences,
          joinedClans: response.data.joinedClans ?? [],
          rememberMe: stayLoggedIn,
        }),
      );

      if (stayLoggedIn) {
        await setStoredAuthState({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken ?? null,
          actor: response.data.actor ?? null,
          userProfile: response.data.userProfile ?? null,
          preferences: response.data.preferences ?? null,
          joinedClans: response.data.joinedClans ?? [],
          rememberMe: stayLoggedIn,
        });
      } else {
        await clearStoredAuthState();
      }

      if (redirect === 'MyProfile') {
        navigation.getParent()?.reset({ index: 0, routes: [{ name: ROUTES.MY_PAGE as never }] });
      } else {
        navigation.getParent()?.reset({ index: 0, routes: [{ name: ROUTES.MAIN as never }] });
      }
    } catch (e) {
      const axiosError = e as { response?: { status?: number; data?: { code?: string; message?: string } } };
      const code = axiosError?.response?.data?.code;
      const status = axiosError?.response?.status;
      const messageByCode =
        code === 'INVALID_PASSWORD' || status === 401
          ? 'Oops wrong password! Try again.'
          : code === 'INVALID_ID'
            ? 'Oops wrong ID/address! Try again.'
            : axiosError?.response?.data?.message || 'Login failed. Please check your ID/password.';
      setError(messageByCode);
      dispatch(setAuthError(messageByCode));
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
            Share the Story™
          </Text>
          <Text style={styles.subtitle}>Welcome back to KLAZA Hub.</Text>
        </View>

        <AuthTextInput
          label="ID"
          value={loginId}
          onChangeText={(text) => setLoginId(text)}
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
