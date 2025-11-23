import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { enterRaffle } from '../slice';
import { adjustPoints } from '../../profile/slice';

const RaffleDetailScreen = () => {
  const raffle = useAppSelector((state) => state.events.raffles[0]);
  const points = useAppSelector((state) => state.profile.points);
  const dispatch = useAppDispatch();

  if (!raffle) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">{raffle.title}</Text>
      <Text style={styles.notice}>Notice: -2 points to enter. No limit raffle.</Text>
      <Text>Current balance: {points}</Text>
      <Card style={styles.noticeCard}>
        <Card.Content>
          <Text>{raffle.notice}</Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => {
          dispatch(enterRaffle(raffle.id));
          dispatch(adjustPoints(-2));
        }}
        style={styles.button}
      >
        Participate
      </Button>
      <Text style={styles.notice}>Thanks for participating. Results will be announced on Feb. 8.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  notice: { marginVertical: 8 },
  button: { marginTop: 12 },
  noticeCard: { marginVertical: 8 },
});

export default RaffleDetailScreen;
