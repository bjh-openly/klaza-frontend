import React from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { Poll } from '../types';

interface Props {
  poll: Poll;
  onPress?: () => void;
}

const PollCard: React.FC<Props> = ({ poll, onPress }) => (
  <Card style={{ marginBottom: 12 }} onPress={onPress}>
    <Card.Title title={poll.question} subtitle={poll.notice} />
    <Card.Content>
      {poll.options.map((opt) => (
        <Text key={opt.id}>• {opt.text}</Text>
      ))}
      <Button mode="text" onPress={onPress}>
        Participate
      </Button>
    </Card.Content>
  </Card>
);

export default PollCard;
