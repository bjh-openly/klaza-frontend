import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const PollDetailScreen = () => (
  <AppSafeArea>
    <AppHeader />
    <View style={styles.container}>
      <Text style={styles.title}>Poll</Text>
      <Text style={styles.subtitle}>Please use the Poll tab to browse and participate.</Text>
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

export default PollDetailScreen;
