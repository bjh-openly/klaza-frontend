import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpBirthScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_BIRTH>> = ({
  navigation,
  route,
}) => {
  const { id, password, termsAgreed1, termsAgreed2, email, emailVerifySeq, country } = route.params;
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | 'UNKNOWN'>('UNKNOWN');
  const normalizedBirth = birthDate.replace(/[^0-9]/g, '').slice(0, 8);
  const isValidBirth = useMemo(() => /^\d{8}$/.test(normalizedBirth), [normalizedBirth]);

  const goNext = () =>
    navigation.navigate(ROUTES.SIGN_UP_FAVORITES, {
      id,
      password,
      termsAgreed1,
      termsAgreed2,
      email,
      emailVerifySeq,
      country,
      birthDt: normalizedBirth,
      gender,
    });

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
        placeholder="19990101"
        value={normalizedBirth}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <HelperText type={isValidBirth ? 'info' : 'error'} visible>
        Enter 8 digits (YYYYMMDD)
      </HelperText>
      <View style={styles.genderRow}>
        {(
          [
            { label: 'Female', value: 'FEMALE' },
            { label: 'Male', value: 'MALE' },
            { label: 'Prefer not to mention', value: 'UNKNOWN' },
          ] as const
        ).map((option) => (
          <Button
            key={option.value}
            mode={gender === option.value ? 'contained-tonal' : 'outlined'}
            onPress={() => setGender(option.value)}
            style={styles.genderButton}
          >
            {option.label}
          </Button>
        ))}
      </View>
      <Button mode="contained" onPress={goNext} style={styles.button} disabled={!isValidBirth}>
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
  genderRow: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 8,
  },
  genderButton: {
    marginVertical: 2,
  },
});

export default SignUpBirthScreen;
