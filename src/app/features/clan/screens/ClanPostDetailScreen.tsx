import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

const ClanPostDetailScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text variant="headlineSmall">Episode review</Text>
    <Text style={styles.meta}>by Member123</Text>
    <Text style={styles.body}>Detailed fan thoughts and screenshots placeholder content.</Text>
    <Divider style={styles.divider} />
    <Card>
      <Card.Title title="Comments" />
      <Card.Content>
        <Text>Great take! - Reader</Text>
      </Card.Content>
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  meta: { color: '#6b7280', marginVertical: 8 },
  body: { marginBottom: 12 },
  divider: { marginVertical: 12 },
});

export default ClanPostDetailScreen;
