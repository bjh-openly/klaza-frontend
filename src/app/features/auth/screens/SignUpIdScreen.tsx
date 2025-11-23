import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthTextInput from '../components/AuthTextInput';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

const SignUpIdScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_ID>> = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [checked, setChecked] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const isValid = userId.length >= 4;

  const checkDuplicates = () => {
    setChecked(true);
    setIsTaken(userId.toLowerCase() === 'taken');
  };

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          ID
        </Text>
        <Text style={styles.subtitle}>Insert a nickname that you'll use on KLAZA.</Text>
        <AuthTextInput label="ID" value={userId} onChangeText={setUserId} autoCapitalize="none" />
        <View style={styles.actions}>
          <Button mode="outlined" onPress={checkDuplicates} disabled={!isValid}>
            Check duplicates
          </Button>
        </View>
        {checked && isTaken && <HelperText type="error">Someone already uses it.</HelperText>}
        <Button
          mode="contained"
          disabled={!isValid || (checked && isTaken)}
          onPress={() => navigation.navigate(ROUTES.SIGN_UP_PASSWORD)}
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
