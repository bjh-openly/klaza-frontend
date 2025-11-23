import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  message?: string;
}

const EmptyState: React.FC<Props> = ({ message = 'Nothing here yet.' }) => (
  <View style={styles.container}>
    <Text variant="bodyLarge">{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
});

export default EmptyState;
