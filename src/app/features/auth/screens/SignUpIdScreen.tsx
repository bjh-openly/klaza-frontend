import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';
import { useCheckIdMutation } from '../../../services/authApi';

const SignUpIdScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_ID>> = ({
  navigation,
  route,
}) => {
  const { termsAgreed1, termsAgreed2 } = route.params;
  const [userId, setUserId] = useState('');
  const [checked, setChecked] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkId, { isLoading }] = useCheckIdMutation();
  const isValid = /^[a-z0-9._-]{3,32}$/.test(userId);

  const handleChange = (value: string) => {
    const sanitized = value.trim().toLowerCase();
    setUserId(sanitized);
    setChecked(false);
    setAvailable(null);
    setError(null);
  };

  const checkDuplicates = async () => {
    setChecked(true);
    setAvailable(null);
    setError(null);
    if (!isValid) {
      setError('Use 3-32 lowercase letters, numbers, . _ - only.');
      return;
    }
    try {
      const response = await checkId({ id: userId }).unwrap();
      setAvailable(response.available);
      if (!response.available) {
        setError('Someone already uses it.');
      }
    } catch (e) {
      setError('Could not check ID. Please try again.');
    }
  };

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          ID
        </Text>
        <Text style={styles.subtitle}>Insert a nickname that you'll use on KLAZA.</Text>
        <AuthTextInput label="ID" value={userId} onChangeText={handleChange} autoCapitalize="none" />
        <View style={styles.actions}>
          <Button mode="outlined" onPress={checkDuplicates} disabled={!isValid || isLoading}>
            Check duplicates
          </Button>
        </View>
        {checked && available === false && <HelperText type="error">Someone already uses it.</HelperText>}
        {error && <HelperText type="error">{error}</HelperText>}
        {checked && available && <HelperText type="info">This ID is available.</HelperText>}
        <Button
          mode="contained"
          disabled={!isValid || available !== true}
          onPress={() =>
            navigation.navigate(ROUTES.SIGN_UP_PASSWORD, {
              termsAgreed1,
              termsAgreed2,
              id: userId,
            })
          }
        >
          Next
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
  actions: {
    marginVertical: 8,
  },
});

export default SignUpIdScreen;
