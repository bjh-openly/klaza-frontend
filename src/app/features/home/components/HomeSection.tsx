import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  title: string;
}

const HomeSection: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => (
  <View style={styles.container}>
    <Text variant="titleMedium" style={styles.title}>
      {title}
    </Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    marginBottom: 8,
  },
});

export default HomeSection;
