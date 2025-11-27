import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const RaffleDetailScreen = () => (
  <AppSafeArea>
    <AppHeader />
    <View style={styles.container}>
      <Text style={styles.title}>Raffle</Text>
      <Text style={styles.subtitle}>Participate from the Raffle tab to enter current events.</Text>
    </View>
  </AppSafeArea>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E5E7EB',
  },
});

export default RaffleDetailScreen;
