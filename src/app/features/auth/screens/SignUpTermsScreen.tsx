import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpTermsScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_TERMS>> = ({
  navigation,
}) => {
  const [agree, setAgree] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Terms & Conditions
      </Text>
      <Text style={styles.body}>Read our community guidelines and agree to continue.</Text>
      <Checkbox.Item
        label="I agree to the terms and conditions"
        status={agree ? 'checked' : 'unchecked'}
        onPress={() => setAgree(!agree)}
      />
      <Button mode="contained" disabled={!agree} onPress={() => navigation.navigate(ROUTES.SIGN_UP_ID)}>
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  body: {
    marginBottom: 16,
  },
});

export default SignUpTermsScreen;
