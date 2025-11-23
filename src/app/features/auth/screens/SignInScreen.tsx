import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useAppDispatch } from '../../../store/hooks';
import { signInSuccess, startLoading, finishLoading } from '../slice';
import { setStoredAccessToken } from '../../../services/session';

const SignInScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_IN>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to KLAZA Hub
      </Text>
      <AuthTextInput label="ID or E-mail" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <AuthTextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <View style={styles.row}>
        <Checkbox status={remember ? 'checked' : 'unchecked'} onPress={() => setRemember(!remember)} />
        <Text>Stay logged in</Text>
      </View>
      {error && <HelperText type="error">{error}</HelperText>}
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Sign in
      </Button>
      <Button mode="text" onPress={() => navigation.navigate(ROUTES.SIGN_UP_TERMS)}>
        Create account
      </Button>
      <Button mode="text" onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
        I forgot my ID/password
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
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
});

export default SignInScreen;
