import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../../../config/constants';
import { OnboardingStackParamList } from '../../../navigation/types';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const OnboardingWelcomeScreen: React.FC<NativeStackScreenProps<OnboardingStackParamList, typeof ROUTES.ONBOARDING_WELCOME>> = ({
  navigation,
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text variant="displaySmall" style={styles.title}>
            Welcome! Come join the hub.
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Discover stories, clans, and events tailored for K-culture fans.
          </Text>
        </View>
        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Quick terms preview
          </Text>
          <Text style={styles.cardText}>
            By continuing, you agree to the basic community rules and consent to receive service updates. You can read the full
            terms inside My &gt; Settings later.
          </Text>
          <View style={styles.agreeRow}>
            <Checkbox status={agreed ? 'checked' : 'unchecked'} onPress={() => setAgreed((prev) => !prev)} />
            <Text>I agree to the terms and conditions.</Text>
          </View>
        </View>
        <Button mode="contained" disabled={!agreed} onPress={() => navigation.navigate(ROUTES.ONBOARDING_NEXT)}>
          Next
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#475569',
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardText: {
    color: '#475569',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});

export default OnboardingWelcomeScreen;
