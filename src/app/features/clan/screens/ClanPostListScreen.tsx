import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';

const posts = [
  { id: 'cp1', title: 'Episode review', tags: ['#spoilerfree'], snippet: 'Thoughts on the new drop.' },
  { id: 'cp2', title: 'Fan art showcase', tags: ['#art'], snippet: 'Sharing my latest fan art.' },
];

const ClanPostListScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post) => (
        <Card key={post.id} style={styles.card}>
          <Card.Title title={post.title} subtitle={post.snippet} />
          <Card.Content>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tags}>
              {post.tags.map((tag) => (
                <Chip key={tag} style={styles.chip}>
                  {tag}
                </Chip>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 12 },
  tags: { marginTop: 6 },
  chip: { marginRight: 6 },
});

export default ClanPostListScreen;
