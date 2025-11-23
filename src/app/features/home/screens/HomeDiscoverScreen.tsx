import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text, List } from 'react-native-paper';
import SectionHeader from '../../../components/common/SectionHeader';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const categories = ['Fanmade', 'KLAZA made', 'Poll', 'Post'];

const HomeDiscoverScreen = () => {
  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Share the Story™" subtitle="Dive into today’s feature" />
          <Card.Content>
            <Text>Discover official KLAZA drops and fan stories from your favorite creators.</Text>
            <Button mode="contained" style={styles.button}>
              View Feature
            </Button>
          </Card.Content>
        </Card>

        <SectionHeader title="Browse" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {categories.map((item) => (
            <Chip key={item} style={styles.chip}>
              {item}
            </Chip>
          ))}
        </ScrollView>

        <SectionHeader title="Latest from KLAZA" actionLabel="See all" />
        {[1, 2, 3].map((id) => (
          <Card key={`klaza-${id}`} style={styles.card}>
            <Card.Title title={`KLAZA Editorial ${id}`} subtitle="Official" />
            <Card.Content>
              <Text>Short summary of the editorial piece with highlights and tags.</Text>
            </Card.Content>
          </Card>
        ))}

        <SectionHeader title="Buzzing Clans" actionLabel="See all" />
        {[1, 2].map((id) => (
          <Card key={`clan-${id}`} style={styles.card}>
            <Card.Title title={`Clan story ${id}`} subtitle="#romance #fantasy" />
            <Card.Content>
              <Text>Members are buzzing about their latest discoveries.</Text>
            </Card.Content>
          </Card>
        ))}

        <SectionHeader title="Polls & Raffles" />
        <List.Section>
          <List.Item title="Weekly poll" description="Vote and earn +1 point" left={(props) => <List.Icon {...props} icon="poll" />} />
          <List.Item title="Album raffle" description="Use 2 points to enter" left={(props) => <List.Icon {...props} icon="ticket-percent" />} />
        </List.Section>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  },
  chips: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
});

export default HomeDiscoverScreen;
