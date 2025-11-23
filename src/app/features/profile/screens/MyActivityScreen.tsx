import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const activities = [
  { id: 'a1', date: '2024-06-02', text: 'Joined SCI-FY clan' },
  { id: 'a2', date: '2024-06-01', text: 'Voted on weekly poll' },
  { id: 'a3', date: '2024-05-30', text: 'Commented on KLAZA editorial' },
];

const MyActivityScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    {activities.map((activity) => (
      <Card key={activity.id} style={styles.card}>
        <Card.Title title={activity.date} />
        <Card.Content>
          <Text>{activity.text}</Text>
        </Card.Content>
      </Card>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { padding: 8 },
  card: { marginVertical: 6 },
});

export default MyActivityScreen;
