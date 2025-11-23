import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
      />
      <Button mode="contained" disabled={!agree} onPress={() => navigation.navigate(ROUTES.SIGN_UP_ID)}>
        Next>
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
  termsBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  termsText: {
    lineHeight: 20,
  },
});

export default SignUpTermsScreen;
