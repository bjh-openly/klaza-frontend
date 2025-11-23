import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const activities = [
  { id: 'a1', type: 'CLAN', date: 'Jan 05, 2025', description: 'Joined SCI-FY clan' },
  { id: 'a2', type: 'PLAZA', date: 'Jan 03, 2025', description: 'Commented on KLAZA editorial' },
  { id: 'a3', type: 'POLL', date: 'Dec 28, 2024', description: 'Voted on weekly poll' },
];

const MyActivityScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    {activities.map((activity) => (
      <Card key={activity.id} style={styles.card}>
        <Card.Content>
          <View style={styles.headerRow}>
            <Text variant="titleMedium">{activity.type}</Text>
            <Text style={styles.date}>{activity.date}</Text>
          </View>
          <Text>{activity.description}</Text>
        </Card.Content>
      </Card>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { padding: 8, gap: 8 },
  card: { borderRadius: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  date: { color: '#6b7280' },
});

export default MyActivityScreen;
