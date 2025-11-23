import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const HomeIntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text variant="headlineMedium" style={styles.title}>
            Share the Story™
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            KLAZA Hub is where K-Culture lovers gather to discover lounges, clans, and exclusive events.
          </Text>
        </View>
        <Button mode="contained" onPress={() => navigation.navigate(ROUTES.HOME_DISCOVER)}>
          Enter
        </Button>
        <Text style={styles.helper}>Already a member? Sign in from the tabs below.</Text>
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
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    color: '#4b5563',
  },
  helper: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6b7280',
  },
});

export default HomeIntroScreen;
