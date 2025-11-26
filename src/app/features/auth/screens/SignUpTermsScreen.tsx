import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

const SignUpTermsScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_TERMS>> = ({
  navigation,
}) => {
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const canProceed = agree1 && agree2;

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Welcome! Come join the hub.
        </Text>
        <View style={styles.termsBox}>
          <Text variant="titleMedium" style={styles.termsTitle}>
            Terms of Use (1)
          </Text>
          <Text variant="bodyMedium" style={styles.termsText}>
            Welcome to KLAZA Hub! By using our service, you agree to the following terms: You may use this service only for
            lawful purposes. Do not misuse, disrupt, or attempt to access our systems in unauthorized ways. You are responsible
            for keeping your account information secure and for all activity under your account.
          </Text>
        </View>
        <Checkbox.Item
          label="I agree to the terms and conditions."
          status={agree1 ? 'checked' : 'unchecked'}
          onPress={() => setAgree1(!agree1)}
          color="#1D4ED8"
          labelStyle={styles.checkboxLabel}
        />
        <View style={styles.termsBox}>
          <Text variant="titleMedium" style={styles.termsTitle}>
            Terms of Use (2)
          </Text>
          <Text variant="bodyMedium" style={styles.termsText}>
            By posting content, you give us permission to display it on the platform as needed. Do not post content that is
            illegal, harmful, or violates others’ rights. The service is provided “as is” without guarantees and we may update
            or stop parts of the service at any time.
          </Text>
        </View>
        <Checkbox.Item
          label="I agree to the terms and conditions."
          status={agree2 ? 'checked' : 'unchecked'}
          onPress={() => setAgree2(!agree2)}
          color="#1D4ED8"
          labelStyle={styles.checkboxLabel}
        />
        <Button
          mode="contained"
          disabled={!canProceed}
          onPress={() => navigation.navigate(ROUTES.SIGN_UP_ID, { termsAgreed1: agree1, termsAgreed2: agree2 })}
        >
          Next>
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
    marginBottom: 12,
    color: '#F9FAFB',
  },
  termsBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  termsText: {
    lineHeight: 20,
    color: '#E5E7EB',
  },
  termsTitle: {
    marginBottom: 8,
    color: '#F9FAFB',
  },
  checkboxLabel: {
    color: '#F9FAFB',
  },
});

export default SignUpTermsScreen;
