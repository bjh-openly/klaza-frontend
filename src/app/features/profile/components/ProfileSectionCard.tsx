import React from 'react';
import { Card, Text } from 'react-native-paper';

interface Props {
  title: string;
  description?: string;
}

const ProfileSectionCard: React.FC<React.PropsWithChildren<Props>> = ({ title, description, children }) => (
  <Card style={{ marginVertical: 8 }}>
    <Card.Title title={title} subtitle={description} />
    <Card.Content>
      {children}
    </Card.Content>
  </Card>
);

export default ProfileSectionCard;
