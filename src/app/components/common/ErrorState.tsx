import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<Props> = ({ message = 'Something went wrong', onRetry }) => (
  <View style={styles.container}>
    <Text variant="bodyLarge">{message}</Text>
    {onRetry && (
      <Button mode="contained" style={styles.button} onPress={onRetry}>
        Retry
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginTop: 12,
  },
});

export default ErrorState;
