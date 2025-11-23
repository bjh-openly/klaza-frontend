import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addBuzzingMessage, joinClan } from '../slice';
import BuzzingMessageList from '../components/BuzzingMessageList';
import BuzzingInputBar from '../components/BuzzingInputBar';

const ClanDetailScreen = () => {
  const dispatch = useAppDispatch();
  const { clans, currentClanId, buzzing } = useAppSelector((state) => state.clan);
  const clan = clans[0];
  const messages = buzzing[clan.id] || [];
  const isMember = currentClanId === clan.id;

  const handleSend = (text: string) => {
    dispatch(
      addBuzzingMessage({
        clanId: clan.id,
        message: { id: Date.now().toString(), author: 'You', message: text, createdAt: 'now' },
      }),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">{clan.name}</Text>
      <Text style={styles.subtitle}>{clan.description}</Text>
      <View style={styles.tags}>
        {clan.tags.map((tag) => (
          <Chip key={tag} style={styles.chip}>
            {tag}
          </Chip>
        ))}
      </View>
      <Button mode="contained" onPress={() => dispatch(joinClan(clan.id))} style={styles.button}>
        {isMember ? 'Welcome back, member!' : 'Join clan'}
      </Button>

      <Text variant="titleMedium" style={styles.section}>
        Buzzing
      </Text>
      <BuzzingMessageList messages={messages} />
      <BuzzingInputBar onSend={handleSend} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    marginRight: 6,
    marginBottom: 6,
  },
  button: {
    marginVertical: 12,
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
  },
});

export default ClanDetailScreen;
