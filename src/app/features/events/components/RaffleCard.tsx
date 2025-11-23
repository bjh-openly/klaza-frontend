import React from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { Raffle } from '../types';

interface Props {
  raffle: Raffle;
  onPress?: () => void;
}

const RaffleCard: React.FC<Props> = ({ raffle, onPress }) => (
  <Card style={{ marginBottom: 12 }} onPress={onPress}>
    <Card.Title title={raffle.title} subtitle={`Cost: ${raffle.cost} points`} />
    <Card.Content>
      <Text>{raffle.notice}</Text>
      <Button mode="text" onPress={onPress}>
        View details
      </Button>
    </Card.Content>
  </Card>
);

export default RaffleCard;
