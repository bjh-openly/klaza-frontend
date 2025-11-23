import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const ChargeScreen = () => (
  <View style={styles.container}>
    <Text variant="headlineSmall">Charge points</Text>
    <Text style={styles.body}>Token purchase flow will be implemented later.</Text>
    <Button mode="contained">Stay tuned</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  body: {
    color: '#6b7280',
  },
});

export default ChargeScreen;
