import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

type SignUpCountryScreenProps = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_COUNTRY>;

const SignUpCountryScreen: React.FC<SignUpCountryScreenProps> = ({ navigation }) => {
  const [country, setCountry] = useState('United States');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Country
      </Text>
      <Text style={styles.subtitle}>Let us know where you're from :)</Text>
      <TextInput
        mode="outlined"
        label="Country"
        placeholder="United States"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_BIRTH)} style={styles.button}>
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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpCountryScreen;
