import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, ProgressBar, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';
import {
  useEnterRaffleMutation,
  useLazyGetPollParticipationsQuery,
  useLazyGetPollsQuery,
  useLazyGetRaffleParticipationsQuery,
  useLazyGetRafflesQuery,
  useVotePollMutation,
} from '../../../services/eventsApi';
import {
  PollListItem,
  PollParticipationItem,
  RaffleListItem,
  RaffleParticipationItem,
} from '../types';
import useRequireLogin from '../../auth/hooks/useRequireLogin';
import { ROUTES } from '../../../config/constants';
import { LoginRedirectTarget } from '../../../navigation/types';

const PAGE_SIZE = 10;

type ResultItem =
  | { type: 'poll'; data: PollParticipationItem }
  | { type: 'raffle'; data: RaffleParticipationItem };

const formatDateTime = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const EventsHomeScreen: React.FC = () => {
  const [segment, setSegment] = useState<'poll' | 'raffle' | 'results'>('poll');

  return (
    <AppSafeArea>
      <AppHeader />
      <View style={styles.container}>
        <SegmentedButtons
          value={segment}
          onValueChange={(value) => setSegment(value as any)}
          buttons={[
            { value: 'poll', label: 'poll' },
            { value: 'raffle', label: 'raffle' },
            { value: 'results', label: 'results' },
          ]}
          style={styles.segmentedButtons}
        />

        {segment === 'poll' && <PollTab />}
        {segment === 'raffle' && <RaffleTab />}
        {segment === 'results' && <ResultsTab />}
      </View>
    </AppSafeArea>
  );
};

const PollTab: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const requireLogin = useRequireLogin();
  const [polls, setPolls] = useState<PollListItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  const [submittingPollId, setSubmittingPollId] = useState<number | null>(null);
  const [fetchPolls, { isFetching }] = useLazyGetPollsQuery();
  const [votePoll] = useVotePollMutation();

  const handleAuthRedirect = (error: any, redirect: LoginRedirectTarget = 'Poll') => {
    if (error?.status === 401) {
      navigation.navigate(ROUTES.AUTH as never, {
        screen: ROUTES.AUTH_GATE,
        params: { redirect },
      });
      return true;
    }
    return false;
  };

  const loadPolls = async (pageToLoad = 0, replace = false) => {
    const result = await fetchPolls({ page: pageToLoad, size: PAGE_SIZE });
    if ('error' in result) {
      handleAuthRedirect(result.error);
      setRefreshing(false);
      return;
    }
    const data = result.data;
    setPolls((prev) => (replace ? data.items : [...prev, ...data.items]));
    setPage(data.pageNumber);
    setTotalPages(data.totalPages);
    setSelectedOptions((prev) => {
      const base = replace ? {} : { ...prev };
      data.items.forEach((item) => {
        if (item.myOptionCodes?.length) {
          base[item.pollId] = item.myOptionCodes;
        } else if (replace && !base[item.pollId]) {
          base[item.pollId] = [];
        }
      });
      return base;
    });
    setRefreshing(false);
  };

  useEffect(() => {
    loadPolls(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOption = (poll: PollListItem, optionCode: string) => {
    const current = selectedOptions[poll.pollId] || [];
    const isSelected = current.includes(optionCode);
    let next: string[] = [];

    if (poll.allowMulti) {
      if (isSelected) {
        next = current.filter((code) => code !== optionCode);
      } else {
        const max = poll.maxSelect ?? poll.options.length;
        if (current.length >= max) {
          next = current;
        } else {
          next = [...current, optionCode];
        }
      }
    } else {
      next = isSelected ? [] : [optionCode];
    }

    setSelectedOptions((prev) => ({ ...prev, [poll.pollId]: next }));
  };

  const handleSubmitVote = async (pollId: number) => {
    const optionCodes = selectedOptions[pollId] || [];
    if (!optionCodes.length) return;
    if (!requireLogin('Poll')) return;
    setSubmittingPollId(pollId);
    const result = await votePoll({ pollId, optionCodes });
    setSubmittingPollId(null);
    if ('error' in result) {
      if (handleAuthRedirect(result.error)) return;
      Alert.alert('Failed to submit vote', result.error.message || 'Please try again.');
      return;
    }
    const selectedCodes = result.data.selected.map((item) => item.optionCode);
    setPolls((prev) =>
      prev.map((poll) =>
        poll.pollId === pollId ? { ...poll, participated: true, myOptionCodes: selectedCodes } : poll,
      ),
    );
    setSelectedOptions((prev) => ({ ...prev, [pollId]: selectedCodes }));
    Alert.alert('Thanks for participating', 'Your vote has been recorded.');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPolls(0, true);
  };

  const handleLoadMore = () => {
    if (isFetching || page >= totalPages - 1) return;
    loadPolls(page + 1);
  };

  const renderPoll = ({ item }: { item: PollListItem }) => {
    const selected = selectedOptions[item.pollId] || [];
    return (
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {!!item.description && <Text style={styles.cardSubtitle}>{item.description}</Text>}

          <View style={styles.optionList}>
            {item.options.map((option) => {
              const isSelected = selected.includes(option.code);
              return (
                <TouchableOpacity
                  key={option.optionId}
                  style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                  onPress={() => toggleOption(item, option.code)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionCode, isSelected && styles.optionLabelSelected]}>{option.code}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.noticeRow}>
            <Text style={styles.noticeText}>
              {item.tokenPolicy === 'REWARD'
                ? `Per submission, +${item.tokenAmount ?? 0} point`
                : item.tokenPolicy === 'CHARGE'
                  ? `Per submission, -${item.tokenAmount ?? 0} point`
                  : 'Notice'}
            </Text>
            {item.participated && <Text style={styles.participatedBadge}>Participated</Text>}
          </View>

          <Button
            mode="contained"
            disabled={!selected.length || submittingPollId === item.pollId || item.participated}
            loading={submittingPollId === item.pollId}
            onPress={() => handleSubmitVote(item.pollId)}
            style={styles.actionButton}
            buttonColor={theme.colors.primary}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <FlatList
      data={polls}
      keyExtractor={(item) => item.pollId.toString()}
      renderItem={renderPoll}
      contentContainerStyle={styles.listContent}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" />}
      ListFooterComponent={
        isFetching && page < totalPages ? <ActivityIndicator style={styles.loader} /> : <View style={styles.listSpacer} />
      }
      ListEmptyComponent={!isFetching && <Text style={styles.emptyText}>No polls yet.</Text>}
    />
  );
};

const RaffleTab: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const requireLogin = useRequireLogin();
  const [raffles, setRaffles] = useState<RaffleListItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [enteringId, setEnteringId] = useState<number | null>(null);
  const [fetchRaffles, { isFetching }] = useLazyGetRafflesQuery();
  const [enterRaffle] = useEnterRaffleMutation();

  const handleAuthRedirect = (error: any, redirect: LoginRedirectTarget = 'Raffle') => {
    if (error?.status === 401) {
      navigation.navigate(ROUTES.AUTH as never, {
        screen: ROUTES.AUTH_GATE,
        params: { redirect },
      });
      return true;
    }
    return false;
  };

  const loadRaffles = async (pageToLoad = 0, replace = false) => {
    const result = await fetchRaffles({ page: pageToLoad, size: PAGE_SIZE });
    if ('error' in result) {
      handleAuthRedirect(result.error);
      setRefreshing(false);
      return;
    }
    const data = result.data;
    setRaffles((prev) => (replace ? data.items : [...prev, ...data.items]));
    setPage(data.pageNumber);
    setTotalPages(data.totalPages);
    setRefreshing(false);
  };

  useEffect(() => {
    loadRaffles(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = async (raffleId: number, drawAt?: string | null) => {
    if (!requireLogin('Raffle')) return;
    setEnteringId(raffleId);
    const result = await enterRaffle({ raffleId, form: {} });
    setEnteringId(null);
    if ('error' in result) {
      if (handleAuthRedirect(result.error)) return;
      Alert.alert('Failed to enter raffle', result.error.message || 'Please try again.');
      return;
    }
    setRaffles((prev) =>
      prev.map((raffle) => (raffle.raffleId === raffleId ? { ...raffle, participated: true } : raffle)),
    );
    const drawDate = drawAt ? formatDateTime(drawAt) : 'soon';
    Alert.alert('Thanks for participating', `Results will be announced on ${drawDate}.`);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadRaffles(0, true);
  };

  const handleLoadMore = () => {
    if (isFetching || page >= totalPages - 1) return;
    loadRaffles(page + 1);
  };

  const renderRaffle = ({ item }: { item: RaffleListItem }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {!!item.description && <Text style={styles.cardSubtitle}>{item.description}</Text>}

        <View style={styles.noticeRow}>
          <Text style={styles.noticeText}>
            In order to participate in this raffle, you need to insert {item.entryTokenAmount ?? 0} points.
          </Text>
        </View>

        <Button
          mode="contained"
          disabled={item.participated || enteringId === item.raffleId}
          loading={enteringId === item.raffleId}
          onPress={() => handleEnter(item.raffleId, item.drawAt)}
          style={styles.actionButton}
          buttonColor={theme.colors.primary}
        >
          {item.entryTokenAmount ? `Insert -${item.entryTokenAmount}` : 'Insert'}
        </Button>
        {item.participated && <Text style={styles.participatedBadge}>Participated</Text>}
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={raffles}
      keyExtractor={(item) => item.raffleId.toString()}
      renderItem={renderRaffle}
      contentContainerStyle={styles.listContent}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" />}
      ListFooterComponent={
        isFetching && page < totalPages ? <ActivityIndicator style={styles.loader} /> : <View style={styles.listSpacer} />
      }
      ListEmptyComponent={!isFetching && <Text style={styles.emptyText}>No raffles yet.</Text>}
    />
  );
};

const ResultsTab: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const requireLogin = useRequireLogin();
  const [pollResults, setPollResults] = useState<PollParticipationItem[]>([]);
  const [raffleResults, setRaffleResults] = useState<RaffleParticipationItem[]>([]);
  const [pollPage, setPollPage] = useState(0);
  const [rafflePage, setRafflePage] = useState(0);
  const [pollTotalPages, setPollTotalPages] = useState(1);
  const [raffleTotalPages, setRaffleTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchPollParticipations, { isFetching: pollFetching }] = useLazyGetPollParticipationsQuery();
  const [fetchRaffleParticipations, { isFetching: raffleFetching }] = useLazyGetRaffleParticipationsQuery();

  const handleAuthRedirect = (error: any, redirect: LoginRedirectTarget = 'Poll') => {
    if (error?.status === 401) {
      navigation.navigate(ROUTES.AUTH as never, {
        screen: ROUTES.AUTH_GATE,
        params: { redirect },
      });
      return true;
    }
    return false;
  };

  const loadPollResults = async (pageToLoad = 0, replace = false) => {
    const result = await fetchPollParticipations({ page: pageToLoad, size: PAGE_SIZE });
    if ('error' in result) {
      handleAuthRedirect(result.error, 'Poll');
      return;
    }
    const data = result.data;
    setPollResults((prev) => (replace ? data.items : [...prev, ...data.items]));
    setPollPage(data.pageNumber);
    setPollTotalPages(data.totalPages);
  };

  const loadRaffleResults = async (pageToLoad = 0, replace = false) => {
    const result = await fetchRaffleParticipations({ page: pageToLoad, size: PAGE_SIZE });
    if ('error' in result) {
      handleAuthRedirect(result.error, 'Raffle');
      return;
    }
    const data = result.data;
    setRaffleResults((prev) => (replace ? data.items : [...prev, ...data.items]));
    setRafflePage(data.pageNumber);
    setRaffleTotalPages(data.totalPages);
  };

  const loadInitial = async () => {
    if (!requireLogin('Poll')) return;
    setRefreshing(true);
    await Promise.all([loadPollResults(0, true), loadRaffleResults(0, true)]);
    setRefreshing(false);
  };

  useEffect(() => {
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    const hasMorePoll = pollPage < pollTotalPages - 1;
    const hasMoreRaffle = rafflePage < raffleTotalPages - 1;
    if (!hasMorePoll && !hasMoreRaffle) return;
    setLoadingMore(true);
    await Promise.all([
      hasMorePoll ? loadPollResults(pollPage + 1) : Promise.resolve(),
      hasMoreRaffle ? loadRaffleResults(rafflePage + 1) : Promise.resolve(),
    ]);
    setLoadingMore(false);
  };

  const combinedResults: ResultItem[] = useMemo(() => {
    const pollItems = pollResults.map<ResultItem>((item) => ({ type: 'poll', data: item }));
    const raffleItems = raffleResults.map<ResultItem>((item) => ({ type: 'raffle', data: item }));
    return [...pollItems, ...raffleItems].sort((a, b) => {
      const dateA = new Date(a.type === 'poll' ? a.data.participatedAt : a.data.enteredAt).getTime();
      const dateB = new Date(b.type === 'poll' ? b.data.participatedAt : b.data.enteredAt).getTime();
      return dateB - dateA;
    });
  }, [pollResults, raffleResults]);

  const renderResult = ({ item }: { item: ResultItem }) => {
    if (item.type === 'poll') {
      const poll = item.data;
      return (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardTitle}>{poll.title}</Text>
            {!!poll.description && <Text style={styles.cardSubtitle}>{poll.description}</Text>}
            <Text style={styles.noticeText}>Participated at {formatDateTime(poll.participatedAt)}</Text>
            <View style={styles.optionList}>
              {poll.options.map((option) => (
                <View key={option.optionId} style={styles.resultOptionRow}>
                  <View style={styles.resultOptionHeader}>
                    <Text style={[styles.optionLabel, option.selectedByMe && styles.boldLabel]}>
                      {option.label}
                    </Text>
                    <Text style={styles.optionLabel}>{Math.round(option.voteRatio * 100)}%</Text>
                  </View>
                  <ProgressBar
                    progress={option.voteRatio}
                    color={option.selectedByMe ? theme.colors.primary : '#374151'}
                    style={styles.progress}
                  />
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      );
    }

    const raffle = item.data;
    return (
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardTitle}>{raffle.title}</Text>
          {!!raffle.description && <Text style={styles.cardSubtitle}>{raffle.description}</Text>}
          <Text style={styles.noticeText}>Entered at {formatDateTime(raffle.enteredAt)}</Text>
          <Text style={styles.noticeText}>
            {raffle.drawStatus === 'DONE'
              ? raffle.winner
                ? 'Congrats! You are a winner.'
                : 'Thanks for joining. Better luck next time!'
              : `Results will be announced on ${formatDateTime(raffle.drawAt) || 'soon'}.`}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <FlatList
      data={combinedResults}
      keyExtractor={(item, index) => `${item.type}-${index}`}
      renderItem={renderResult}
      contentContainerStyle={styles.listContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadInitial} tintColor="#fff" />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        (pollFetching || raffleFetching || loadingMore) ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <View style={styles.listSpacer} />
        )
      }
      ListEmptyComponent={
        !(pollFetching || raffleFetching) && (
          <Text style={styles.emptyText}>You haven’t joined any events yet.</Text>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  segmentedButtons: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#111827',
  },
  cardContent: {
    gap: 12,
  },
  cardTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  optionList: {
    gap: 8,
  },
  optionItem: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0B1220',
  },
  optionItemSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#1F2937',
  },
  optionLabel: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  optionLabelSelected: {
    color: '#FCA5A5',
  },
  optionCode: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  noticeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  participatedBadge: {
    color: '#F9FAFB',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    alignSelf: 'flex-start',
  },
  loader: {
    paddingVertical: 12,
  },
  listSpacer: {
    height: 24,
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 24,
  },
  resultOptionRow: {
    gap: 6,
  },
  resultOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldLabel: {
    fontWeight: '700',
  },
  progress: {
    height: 8,
    borderRadius: 4,
  },
});

export default EventsHomeScreen;
