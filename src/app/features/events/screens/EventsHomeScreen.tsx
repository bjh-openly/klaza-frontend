import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Card, Text, Button, RadioButton } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { enterRaffle, votePoll } from '../slice';
import { adjustPoints } from '../../profile/slice';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const EventsHomeScreen = () => {
  const [segment, setSegment] = useState<'poll' | 'raffle' | 'results'>('poll');
  const { polls, raffles, results } = useAppSelector((state) => state.events);
  const { points } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const poll = polls[0];
  const raffle = raffles[0];
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <AppSafeArea>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <SegmentedButtons
          value={segment}
          onValueChange={(value) => setSegment(value as any)}
          buttons={[
            { value: 'poll', label: 'poll' },
            { value: 'raffle', label: 'raffle' },
            { value: 'results', label: 'results' },
          ]}
        />

        {segment === 'poll' && poll && (
          <Card style={styles.card}>
            <Card.Title
              title="Which storyline should we feature next?"
              subtitle="Per submission, +1 point"
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <RadioButton.Group onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
                {poll.options.map((opt) => (
                  <RadioButton.Item key={opt.id} label={opt.text} value={opt.id} />
                ))}
              </RadioButton.Group>
              <Card style={styles.notice}>
                <Card.Content>
                  <Text>Notice: We will use your vote to curate the next lineup.</Text>
                </Card.Content>
              </Card>
              <Button
                mode="contained"
                onPress={() => {
                  dispatch(votePoll({ pollId: poll.id, optionId: selectedOption }));
                  dispatch(adjustPoints(1));
                }}
                disabled={!selectedOption}
                style={styles.button}
              >
                Submit
              </Button>
            </Card.Content>
          </Card>
        )}

        {segment === 'raffle' && raffle && (
          <Card style={styles.card}>
            <Card.Title title="Raffle" subtitle="no-limit raffle" titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} />
            <Card.Content>
              <Text style={styles.balance}>Points balance: {points}</Text>
              <Text style={styles.bodyText}>{raffle.title}</Text>
              <Card style={styles.notice}>
                <Card.Content>
                  <Text>Notice: -2 points to enter.</Text>
                </Card.Content>
              </Card>
              <Button
                mode="contained"
                onPress={() => {
                  dispatch(enterRaffle(raffle.id));
                  dispatch(adjustPoints(-2));
                }}
                style={styles.button}
              >
                Participate
              </Button>
            </Card.Content>
          </Card>
        )}

        {segment === 'results' && (
          <View style={styles.results}>
            <Card style={styles.card}>
              <Card.Title title="Results" titleStyle={styles.cardTitle} />
              <Card.Content>
                {results.map((item, idx) => (
                  <Text key={idx} style={styles.resultText}>
                    {item}
                  </Text>
                ))}
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Title title="Quiz" titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.bodyText}>Quiz nights coming soon. Join to test your KLAZA knowledge.</Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Title title="Contest" titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.bodyText}>Contests for top creators will be announced here.</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#000000',
  },
  card: {
    marginVertical: 6,
    backgroundColor: '#111827',
  },
  button: {
    marginTop: 8,
  },
  notice: {
    marginTop: 8,
    backgroundColor: '#0B1220',
  },
  balance: {
    marginBottom: 8,
    color: '#F9FAFB',
  },
  results: {
    gap: 8,
  },
  resultText: {
    marginBottom: 4,
    color: '#E5E7EB',
  },
  cardTitle: {
    color: '#F9FAFB',
  },
  cardSubtitle: {
    color: '#E5E7EB',
  },
  bodyText: {
    color: '#E5E7EB',
  },
});

export default EventsHomeScreen;
