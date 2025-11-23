import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SegmentedButtons, Card, Text, Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { enterRaffle, votePoll } from '../slice';

const EventsHomeScreen = () => {
  const [segment, setSegment] = useState<'poll' | 'raffle' | 'results'>('poll');
  const { polls, raffles, results, points } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SegmentedButtons
        value={segment}
        onValueChange={(value) => setSegment(value as any)}
        buttons={[
          { value: 'poll', label: 'Poll' },
          { value: 'raffle', label: 'Raffle' },
          { value: 'results', label: 'Results' },
        ]}
      />

      {segment === 'poll' &&
        polls.map((poll) => (
          <Card key={poll.id} style={styles.card}>
            <Card.Title title={poll.question} subtitle={poll.notice} />
            <Card.Content>
              {poll.options.map((opt) => (
                <Button key={opt.id} mode="outlined" style={styles.button} onPress={() => dispatch(votePoll({ pollId: poll.id, optionId: opt.id }))}>
                  {opt.text}
                </Button>
              ))}
            </Card.Content>
          </Card>
        ))}

      {segment === 'raffle' && (
        <>
          <Text>Points balance: {points}</Text>
          {raffles.map((raffle) => (
            <Card key={raffle.id} style={styles.card}>
              <Card.Title title={raffle.title} subtitle={`Cost: ${raffle.cost} points`} />
              <Card.Content>
                <Text>{raffle.notice}</Text>
                <Button mode="contained" style={styles.button} onPress={() => dispatch(enterRaffle(raffle.id))}>
                  Participate
                </Button>
              </Card.Content>
            </Card>
          ))}
        </>
      )}

      {segment === 'results' && (
        <Card style={styles.card}>
          <Card.Title title="Recent results" />
          <Card.Content>
            {results.map((item, idx) => (
              <Text key={idx} style={styles.result}>
                {item}
              </Text>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  button: {
    marginTop: 8,
  },
  result: {
    marginBottom: 8,
  },
});

export default EventsHomeScreen;
