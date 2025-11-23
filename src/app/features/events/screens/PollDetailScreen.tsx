import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { votePoll } from '../slice';
import { adjustPoints } from '../../profile/slice';

const PollDetailScreen = () => {
  const poll = useAppSelector((state) => state.events.polls[0]);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>('');

  if (!poll) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">{poll.question}</Text>
      <Text style={styles.notice}>Per submission, +1 point</Text>
      <RadioButton.Group onValueChange={(value) => setSelected(value)} value={selected}>
        {poll.options.map((opt) => (
          <RadioButton.Item key={opt.id} label={opt.text} value={opt.id} />
        ))}
      </RadioButton.Group>
      <Card style={styles.noticeCard}>
        <Card.Content>
          <Text>Notice: We will use your vote to curate the next lineup.</Text>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        disabled={!selected}
        onPress={() => {
          dispatch(votePoll({ pollId: poll.id, optionId: selected }));
          dispatch(adjustPoints(1));
        }}
      >
        Submit
      </Button>
      <Text style={styles.notice}>Thanks for participating. Results will be announced on Feb. 8.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  notice: {
    marginVertical: 8,
  },
  noticeCard: {
    marginVertical: 8,
  },
});

export default PollDetailScreen;
