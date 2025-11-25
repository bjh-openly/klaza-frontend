import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import {
  useCreateBuzzingMutation,
  useGetClanBuzzingQuery,
  useGetClanDetailQuery,
  useGetClanPostsQuery,
  useJoinClanMutation,
  useLeaveClanMutation,
} from '../../../services/clanApi';
import { useAppSelector } from '../../../store/hooks';
import { BuzzingMessage, ClanPostSummary } from '../types';

const BuzzBubble: React.FC<{ message: BuzzingMessage; isOwn?: boolean }> = ({ message, isOwn }) => (
  <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
    <Text style={styles.bubbleAuthor}>{message.author}</Text>
    <Text style={styles.bubbleText}>{message.message}</Text>
    <Text style={styles.bubbleTime}>{message.createdAt}</Text>
  </View>
);

const PostCard: React.FC<{ post: ClanPostSummary; onPress: () => void }> = ({ post, onPress }) => (
  <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.85}>
    {post.coverImageUrl && <Image source={{ uri: post.coverImageUrl }} style={styles.postImage} />}
    <View style={styles.postContent}>
      <Text style={styles.postType}>Fanmade</Text>
      <Text style={styles.postTitle} numberOfLines={1}>
        {post.title}
      </Text>
      {!!post.createdBy && <Text style={styles.postMeta}>Created by: {post.createdBy}</Text>}
    </View>
  </TouchableOpacity>
);

const ClanDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ClanStackParamList, typeof ROUTES.CLAN_DETAIL>>();
  const clanId = useMemo(() => route.params?.clanId as string, [route.params?.clanId]);
  const { accessToken } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!accessToken;

  const { data: clan, refetch: refetchClan, isFetching: isClanLoading } = useGetClanDetailQuery(clanId!, {
    skip: !clanId,
  });
  const { data: buzzing = [], refetch: refetchBuzzing, isFetching: buzzingLoading } = useGetClanBuzzingQuery(clanId!, {
    skip: !clanId,
  });
  const {
    data: postsResponse,
    refetch: refetchPosts,
    isFetching: isPostsLoading,
  } = useGetClanPostsQuery(
    { clanId: clanId!, page: 0, size: 10 },
    {
      skip: !clanId,
    },
  );
  const [createBuzzing, { isLoading: isSendingBuzz }] = useCreateBuzzingMutation();
  const [joinClan, { isLoading: isJoining }] = useJoinClanMutation();
  const [leaveClan, { isLoading: isLeaving }] = useLeaveClanMutation();
  const [message, setMessage] = useState('');

  const isMember = clan?.isMember ?? false;
  const canCreatePost = clan?.canCreatePost ?? isMember;

  const promptSignIn = () => {
    Alert.alert('Sign in required', 'Please sign in to join and buzz in this clan.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign in',
        onPress: () => navigation.navigate(ROUTES.AUTH as never),
      },
    ]);
  };

  const handleSendBuzzing = async () => {
    if (!message.trim()) return;
    if (!isLoggedIn) {
      promptSignIn();
      return;
    }
    if (!isMember) {
      Alert.alert('Join required', 'Join the clan to start buzzing.');
      return;
    }
    await createBuzzing({ clanId, message: message.trim() });
    setMessage('');
    refetchBuzzing();
  };

  const handleJoin = async () => {
    if (!isLoggedIn) {
      promptSignIn();
      return;
    }
    await joinClan(clanId);
    refetchClan();
  };

  const handleLeave = async () => {
    await leaveClan(clanId);
    refetchClan();
  };

  const posts = postsResponse?.items ?? [];

  useFocusEffect(
    useCallback(() => {
      refetchPosts();
    }, [refetchPosts]),
  );

  return (
    <AppSafeArea>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            refreshing={isClanLoading || buzzingLoading || isPostsLoading}
            onRefresh={() => {
              refetchClan();
              refetchBuzzing();
              refetchPosts();
            }}
          />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <MaterialCommunityIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.topBarActions}>
            {isMember ? (
              <TouchableOpacity onPress={handleLeave} disabled={isLeaving} style={styles.iconButton}>
                <MaterialCommunityIcons name="door-closed" size={22} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleJoin} disabled={isJoining} style={styles.iconButton}>
                <MaterialCommunityIcons name="plus" size={22} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {clan && (
          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <Chip style={styles.genreChip}>{clan.genre || 'SCI-FY'}</Chip>
              <View style={styles.headerTags}>
                {clan.tags?.slice(0, 3).map((tag) => (
                  <Chip key={tag} style={styles.tagChip} textStyle={styles.tagChipText}>
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>
            <View style={styles.clanTitleRow}>
              <Text variant="headlineSmall" style={styles.clanTitle}>
                {clan.name}
              </Text>
              {!!clan.memberCount && <Text style={styles.memberCount}>{clan.memberCount} members</Text>}
            </View>
            {!!clan.description && <Text style={styles.clanDescription}>{clan.description}</Text>}
          </View>
        )}

        <View style={styles.buzzBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>buzzing</Text>
            {!isMember && (
              <TouchableOpacity onPress={handleJoin} style={styles.joinInline}>
                <Text style={styles.joinInlineText}>Join clan</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buzzList}>
            {buzzing.length === 0 && <Text style={styles.emptyText}>No buzzing yet.</Text>}
            {buzzing.map((item) => (
              <BuzzBubble key={item.id} message={item} />
            ))}
          </View>
          <View style={[styles.buzzInput, (!isMember || !isLoggedIn) && styles.inputDisabled]}>
            <TextInput
              placeholder={isMember ? 'Drop a message' : 'Join this clan to buzz'}
              placeholderTextColor="#6b7280"
              style={styles.input}
              value={message}
              editable={isMember && isLoggedIn && !isSendingBuzz}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={handleSendBuzzing} disabled={!isMember || !isLoggedIn}>
              <MaterialCommunityIcons name="send" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {!!clan?.notice && (
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>From the admin</Text>
            <Text style={styles.noticeText}>{clan.notice}</Text>
          </View>
        )}

        <View style={styles.actionsRow}>
          {!isMember && (
            <TouchableOpacity style={styles.joinCta} onPress={handleJoin}>
              <MaterialCommunityIcons name="account-plus" size={18} color="#fff" />
              <Text style={styles.joinCtaText}>Join clan</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.makeButton, (!canCreatePost || !isLoggedIn) && styles.disabledButton]}
            onPress={() => {
              if (!isLoggedIn) {
                promptSignIn();
                return;
              }
              if (!canCreatePost) {
                Alert.alert('Membership required', 'Join this clan to make a post.');
                return;
              }
              navigation.navigate(ROUTES.CLAN_POST_CREATE, { clanId });
            }}
            disabled={!canCreatePost || !isLoggedIn}
          >
            <Text style={styles.makeButtonText}>make</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.newsTitle}>News</Text>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => navigation.navigate(ROUTES.CLAN_POST_DETAIL, { postId: String(post.id) })}
            />
          ))}
          {posts.length === 0 && <Text style={styles.emptyText}>No posts yet. Be the first to make one.</Text>}
        </View>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#000000',
  },
  container: {
    padding: 16,
    gap: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  topBarActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: '#111827',
  },
  headerCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 14,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreChip: {
    backgroundColor: '#1f2937',
    color: '#fff',
  },
  headerTags: {
    flexDirection: 'row',
    gap: 6,
  },
  tagChip: {
    backgroundColor: '#111827',
  },
  tagChipText: {
    color: '#E5E7EB',
  },
  clanTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clanTitle: {
    color: '#fff',
  },
  memberCount: {
    color: '#9CA3AF',
  },
  clanDescription: {
    color: '#d1d5db',
  },
  buzzBox: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#c4b5fd',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  joinInline: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#1f2937',
  },
  joinInlineText: {
    color: '#a78bfa',
  },
  buzzList: {
    gap: 8,
  },
  buzzInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0b1222',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 0,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
  },
  bubbleOwn: {
    backgroundColor: 'rgba(37,99,235,0.35)',
  },
  bubbleOther: {
    backgroundColor: '#0b1222',
  },
  bubbleAuthor: {
    color: '#c7d2fe',
    marginBottom: 4,
  },
  bubbleText: {
    color: '#f9fafb',
  },
  bubbleTime: {
    color: '#9ca3af',
    marginTop: 6,
    fontSize: 12,
  },
  noticeCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  noticeTitle: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
  noticeText: {
    color: '#e5e7eb',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  joinCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#1f2937',
    borderRadius: 12,
  },
  joinCtaText: {
    color: '#fff',
  },
  makeButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#2563eb',
    borderRadius: 12,
  },
  makeButtonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  disabledButton: {
    opacity: 0.5,
  },
  newsSection: {
    gap: 8,
  },
  newsTitle: {
    color: '#cbd5e1',
    fontSize: 18,
    fontWeight: '700',
  },
  postCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  postImage: {
    height: 160,
    width: '100%',
  },
  postContent: {
    padding: 12,
    gap: 4,
  },
  postType: {
    color: '#c7d2fe',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  postTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  postMeta: {
    color: '#9ca3af',
  },
  emptyText: {
    color: '#9ca3af',
    marginTop: 8,
  },
});

export default ClanDetailScreen;
