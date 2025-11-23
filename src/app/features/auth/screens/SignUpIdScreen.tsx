import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpIdScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_ID>> = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const isValid = userId.length >= 4;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Choose your ID</Text>
      <AuthTextInput label="User ID" value={userId} onChangeText={setUserId} autoCapitalize="none" />
      {!isValid && <HelperText type="error">Use at least 4 characters.</HelperText>}
      <Button mode="contained" disabled={!isValid} onPress={() => navigation.navigate(ROUTES.SIGN_UP_PASSWORD)}>
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default SignUpIdScreen;
