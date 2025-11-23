import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LoungeFeed from '../components/LoungeFeed';

const LoungeListScreen = () => {
  return (
    <LoungeFeed
      header={
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Lounge-main
          </Text>
          <Text style={styles.subtitle}>KLAZA에 등록된 글만 모아서 보여줄게요.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 4,
  },
});

export default LoungeListScreen;
