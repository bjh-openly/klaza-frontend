import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { useGetPostsQuery } from '../../../services/klazaApi';
import SectionHeader from '../../../components/common/SectionHeader';

const LoungeListScreen = () => {
  const { data = [] } = useGetPostsQuery();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="KLAZA Lounge" />
      {data.map((post) => (
        <Card key={post.id} style={styles.card}>
          <Card.Title title={post.title} subtitle={post.label} />
          <Card.Content>
            <Text>{post.summary}</Text>
            <Chip style={styles.chip}>{post.label}</Chip>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});

export default LoungeListScreen;
