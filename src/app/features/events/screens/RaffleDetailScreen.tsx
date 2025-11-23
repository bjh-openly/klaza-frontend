import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { enterRaffle } from '../slice';

const RaffleDetailScreen = () => {
  const raffle = useAppSelector((state) => state.events.raffles[0]);
  const points = useAppSelector((state) => state.events.points);
  const dispatch = useAppDispatch();

  if (!raffle) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">{raffle.title}</Text>
      <Text style={styles.notice}>{raffle.notice}</Text>
      <Text>Points required: {raffle.cost}</Text>
      <Text>Current balance: {points}</Text>
      <Button mode="contained" onPress={() => dispatch(enterRaffle(raffle.id))} style={styles.button}>
        Participate
      </Button>
      <Text style={styles.notice}>Thanks for participating. Results will be announced soon.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  notice: { marginVertical: 12 },
  button: { marginTop: 12 },
});

export default RaffleDetailScreen;
