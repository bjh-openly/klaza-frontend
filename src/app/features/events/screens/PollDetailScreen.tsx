import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { votePoll } from '../slice';

const PollDetailScreen = () => {
  const poll = useAppSelector((state) => state.events.polls[0]);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>('');

  if (!poll) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">{poll.question}</Text>
      <Text style={styles.notice}>{poll.notice}</Text>
      <RadioButton.Group onValueChange={(value) => setSelected(value)} value={selected}>
        {poll.options.map((opt) => (
          <RadioButton.Item key={opt.id} label={opt.text} value={opt.id} />
        ))}
      </RadioButton.Group>
      <Button mode="contained" disabled={!selected} onPress={() => dispatch(votePoll({ pollId: poll.id, optionId: selected }))}>
        Submit
      </Button>
      <Text style={styles.notice}>Thanks for participating. Results will be announced soon.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  notice: {
    marginVertical: 12,
  },
});

export default PollDetailScreen;
