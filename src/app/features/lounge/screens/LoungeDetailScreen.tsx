import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text, TextInput } from 'react-native-paper';

const comments = [
  { id: '1', author: 'Judy', text: 'Thanks for reading!' },
  { id: '2', author: 'Alex', text: 'Loved this update.' },
];

const LoungeDetailScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Official update</Text>
      <Text style={styles.subtitle}>Brought to you by: KLAZA Editor Judy</Text>
      <Text style={styles.body}>Detailed content body goes here with highlights, quotes, and callouts.</Text>

      <Divider style={styles.divider} />
      <Text variant="titleMedium">Comments</Text>
      {comments.map((comment) => (
        <Card key={comment.id} style={styles.card}>
          <Card.Title title={comment.author} />
          <Card.Content>
            <Text>{comment.text}</Text>
          </Card.Content>
        </Card>
      ))}
      <View style={styles.commentBox}>
        <TextInput mode="outlined" label="Add a comment" multiline />
        <Button mode="contained" style={styles.button}>
          Post
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 12,
  },
  body: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 12,
  },
  card: {
    marginVertical: 6,
  },
  commentBox: {
    marginTop: 12,
  },
  button: {
    marginTop: 8,
  },
});

export default LoungeDetailScreen;
