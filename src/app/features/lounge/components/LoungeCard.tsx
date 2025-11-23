import React from 'react';
import { Card, Chip, Text } from 'react-native-paper';
import { KlazaPost } from '../../../services/klazaApi';

interface Props {
  post: KlazaPost;
  onPress?: () => void;
}

const LoungeCard: React.FC<Props> = ({ post, onPress }) => (
  <Card onPress={onPress} style={{ marginBottom: 12 }}>
    <Card.Title title={post.title} subtitle={post.label} />
    <Card.Content>
      <Text>{post.summary}</Text>
      <Chip style={{ marginTop: 8, alignSelf: 'flex-start' }}>{post.label}</Chip>
    </Card.Content>
  </Card>
);

export default LoungeCard;
