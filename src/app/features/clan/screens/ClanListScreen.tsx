import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { useGetClansQuery } from '../../../services/clanApi';
import SectionHeader from '../../../components/common/SectionHeader';

const ClanListScreen = () => {
  const { data = [] } = useGetClansQuery();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="CLAN" />
      {data.map((clan) => (
        <Card key={clan.id} style={styles.card}>
          <Card.Title title={clan.name} subtitle={clan.description} />
          <Card.Content>
            <Text>{clan.latestBuzz}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tags}>
              {clan.tags.map((tag) => (
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
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  tags: {
    marginTop: 8,
  },
  chip: {
    marginRight: 6,
  },
});

export default ClanListScreen;
