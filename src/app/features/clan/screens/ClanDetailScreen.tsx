import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, SegmentedButtons, Text } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addBuzzingMessage, joinClan } from '../slice';
import BuzzingMessageList from '../components/BuzzingMessageList';
import BuzzingInputBar from '../components/BuzzingInputBar';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const ClanDetailScreen = () => {
  const route = useRoute<RouteProp<ClanStackParamList, typeof ROUTES.CLAN_DETAIL>>();
  const dispatch = useAppDispatch();
  const { clans, currentClanId, buzzing } = useAppSelector((state) => state.clan);
  const [tab, setTab] = useState<'buzzing' | 'news'>('buzzing');

  const clan = useMemo(() => {
    if (route.params?.clanId) {
      return clans.find((c) => c.id === route.params?.clanId) ?? clans[0];
    }
    return clans[0];
  }, [clans, route.params?.clanId]);

  if (!clan) return null;

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
      {isMember ? (
        <Text style={styles.member}>Welcome back, member!</Text>
      ) : (
        <Button mode="contained" onPress={() => dispatch(joinClan(clan.id))} style={styles.button}>
          Join clan
        </Button>
      )}

      <SegmentedButtons
        value={tab}
        onValueChange={(value) => setTab(value as 'buzzing' | 'news')}
        buttons={[
          { value: 'buzzing', label: 'buzzing' },
          { value: 'news', label: 'news' },
        ]}
        style={styles.segmented}
      />

      {tab === 'buzzing' ? (
        <View>
          <BuzzingMessageList messages={messages} />
          <BuzzingInputBar onSend={handleSend} />
        </View>
      ) : (
        <View style={styles.newsBox}>
          <Text>From the admin: Hello Clan {clan.name}! You might be interested in this poll &gt;&gt;&gt;</Text>
          <Text style={styles.newsBody}>{clan.latestBuzz}</Text>
        </View>
      )}
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
  member: {
    marginVertical: 12,
    color: '#10b981',
  },
  segmented: {
    marginBottom: 12,
  },
  newsBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    gap: 6,
  },
  newsBody: {
    color: '#4b5563',
  },
});

export default ClanDetailScreen;
