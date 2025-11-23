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
  const [agree, setAgree] = useState(false);

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Welcome! Come join the hub.
        </Text>
        <View style={styles.termsBox}>
          <Text variant="bodyMedium" style={styles.termsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum, lacus quis ultricies tempor, magna
            arcu hendrerit augue, non lacinia ligula lorem ac nisi. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. (Shortened terms preview)
          </Text>
        </View>
        <Checkbox.Item
          label="I agree to the terms and conditions."
          status={agree ? 'checked' : 'unchecked'}
          onPress={() => setAgree(!agree)}
          color="#1D4ED8"
          labelStyle={styles.checkboxLabel}
        />
        <Button mode="contained" disabled={!agree} onPress={() => navigation.navigate(ROUTES.SIGN_UP_ID)}>
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
  checkboxLabel: {
    color: '#F9FAFB',
  },
});

export default SignUpTermsScreen;
