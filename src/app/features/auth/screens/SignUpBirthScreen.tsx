import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpBirthScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_BIRTH>> = ({
  navigation,
}) => {
  const [birthDate, setBirthDate] = useState('1999.09.09');

  const goNext = () => navigation.navigate(ROUTES.SIGN_UP_FAVORITES);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Date of Birth
      </Text>
      <Text style={styles.subtitle}>
        *You can agree to skip, but some content may need additional age confirmation to access.
      </Text>
      <TextInput
        mode="outlined"
        label="Date of Birth"
        placeholder="1999.09.09"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <Button mode="contained" onPress={goNext} style={styles.button}>
        Submit
      </Button>
      <Button mode="text" onPress={goNext}>
        Skip >
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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpBirthScreen;
