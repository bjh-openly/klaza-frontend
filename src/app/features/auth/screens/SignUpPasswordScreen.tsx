import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpPasswordScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_PASSWORD>> = ({
  navigation,
}) => {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 10;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Password
      </Text>
      <Text style={styles.subtitle}>Combine at least 10 characters of letters, numbers and symbols</Text>
      <AuthTextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <View style={styles.helperRow}>
        <HelperText type={isValid ? 'info' : 'error'} visible={!isValid}>
          Password must be at least 10 characters.
        </HelperText>
      </View>
      <Button
        mode="contained"
        disabled={!isValid}
        onPress={() => navigation.navigate(ROUTES.SIGN_UP_EMAIL)}
        style={styles.button}
      >
        Submit
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
  helperRow: {
    marginVertical: 4,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpPasswordScreen;
