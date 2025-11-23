import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useAppSelector } from '../../../store/hooks';

const MyPointsScreen = () => {
  const { points, pointsHistory } = useAppSelector((state) => state.profile);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="labelLarge">point(s)</Text>
          <Text variant="titleMedium" style={styles.balanceLabel}>
            POINT BALANCE
          </Text>
          <Text variant="displaySmall">{points}</Text>
          <Text style={styles.expiry}>0 points will expire on Feb 08, 2025</Text>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        CREDIT HISTORY
      </Text>
      {pointsHistory.map((item) => (
        <Card key={item.id} style={styles.historyCard}>
          <Card.Content style={styles.historyRow}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyAmount}>{item.delta > 0 ? `+${item.delta}` : item.delta} points</Text>
            <Text>{item.description}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    paddingVertical: 4,
  },
  balanceLabel: {
    marginTop: 4,
    color: '#6b7280',
  },
  expiry: {
    marginTop: 8,
    color: '#9ca3af',
  },
  sectionTitle: {
    marginTop: 4,
  },
  historyCard: {
    borderRadius: 10,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  historyDate: {
    flex: 1,
    color: '#6b7280',
  },
  historyAmount: {
    color: '#0ea5e9',
    minWidth: 80,
    textAlign: 'right',
  },
});

export default MyPointsScreen;
