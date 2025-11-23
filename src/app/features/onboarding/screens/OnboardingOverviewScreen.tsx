import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../../config/constants';
import { OnboardingStackParamList } from '../../../navigation/types';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import { useOnboarding } from '../../../navigation/OnboardingNavigator';
import { useAppSelector } from '../../../store/hooks';

const OnboardingOverviewScreen: React.FC<NativeStackScreenProps<OnboardingStackParamList, typeof ROUTES.ONBOARDING_NEXT>> = ({
  navigation,
}) => {
  const { finish } = useOnboarding();
  const { accessToken } = useAppSelector((state) => state.auth);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('klaza.onboardingCompleted', 'true');
    finish();
    const nextRoute = accessToken ? ROUTES.MAIN : ROUTES.AUTH;
    navigation.getParent()?.reset({ index: 0, routes: [{ name: nextRoute as never }] });
  };

  const sections = [
    { label: 'Home', description: 'Share the Story™ highlights and featured picks.' },
    { label: 'Lounge', description: 'Official KLAZA editorials and announcements.' },
    { label: 'Clan', description: 'Join fan groups, buzzing threads, and fan posts.' },
    { label: 'Events', description: 'Polls, raffles, quizzes, and contests with points.' },
    { label: 'My', description: 'Profile, preferences, activity, and points.' },
  ];

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Explore KLAZA Hub
        </Text>
        <Text style={styles.subtitle}>
          Get a glimpse of what waits for you. You can always re-open this from My &gt; Settings.
        </Text>
        <View style={styles.sectionList}>
          {sections.map((section) => (
            <View key={section.label} style={styles.sectionCard}>
              <Chip mode="outlined" style={styles.sectionChip}>
                {section.label}
              </Chip>
              <Text style={styles.sectionText}>{section.description}</Text>
            </View>
          ))}
        </View>
        <Button mode="contained" onPress={completeOnboarding}>
          Start your journey
        </Button>
        <Button mode="text" onPress={completeOnboarding}>
          Already have an account? Sign in
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
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#475569',
    marginBottom: 16,
  },
  sectionList: {
    marginBottom: 16,
  },
  sectionCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 10,
  },
  sectionChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sectionText: {
    color: '#475569',
  },
});

export default OnboardingOverviewScreen;
