import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useAppSelector } from '../../../store/hooks';
import PointsHistoryList from '../components/PointsHistoryList';

const MyPointsScreen = () => {
  const { points, pointsHistory } = useAppSelector((state) => state.profile);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="POINT BALANCE" />
        <Card.Content>
          <Text variant="headlineMedium">{points} pts</Text>
          <Text>0 points will expire on Feb 08, 2025</Text>
          <Button mode="contained" style={styles.button}>
            Charge
          </Button>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="History" />
        <Card.Content>
          <PointsHistoryList items={pointsHistory} />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default MyPointsScreen;
