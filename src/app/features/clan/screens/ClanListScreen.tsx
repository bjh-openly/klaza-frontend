import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { ClanSummary } from '../types';
import { useLazyGetClansQuery } from '../../../services/clanApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PAGE_SIZE = 10;

const ClanCard: React.FC<{ clan: ClanSummary; onPress: () => void }> = ({ clan, onPress }) => {
  const theme = useTheme();
  const tags = useMemo(() => clan.tags?.filter(Boolean) ?? [], [clan.tags]);
  const latestBuzzText = typeof clan.latestBuzz === 'string' ? clan.latestBuzz : clan.latestBuzz?.message;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardInner}>
        <Image
          source={{
            uri:
              clan.coverImageUrl ||
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text variant="titleMedium" style={styles.cardTitle} numberOfLines={1}>
              {clan.name}
            </Text>
            <View style={styles.cardMetaRow}>
              {clan.genre && <Chip style={styles.metaChip}>{clan.genre}</Chip>}
              {clan.period && <Chip style={styles.metaChip}>{clan.period}</Chip>}
              {clan.mediaType && <Chip style={styles.metaChip}>{clan.mediaType}</Chip>}
            </View>
          </View>
          <View style={styles.tagRow}>
            {tags.map((tag) => (
              <Chip key={tag} textStyle={styles.chipText} style={styles.chip}>
                {tag}
              </Chip>
            ))}
          </View>
          {!!latestBuzzText && (
            <View style={styles.buzzBar}>
              <MaterialCommunityIcons name="lightning-bolt" color={theme.colors.primary} size={18} />
              <Text style={styles.buzzText} numberOfLines={1}>
                {latestBuzzText}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ClanListScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClanStackParamList>>();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [clans, setClans] = useState<ClanSummary[]>([]);
  const [trigger, { isFetching } ] = useLazyGetClansQuery();

  const loadPage = async (pageToLoad: number, replace = false) => {
    const response = await trigger({ page: pageToLoad, size: PAGE_SIZE }, true);
    const data = response.data;
    if (!data) return;
    setHasNext(data.hasNext);
    setPage(pageToLoad);
    setClans((prev) => {
      const nextItems = data.items;
      return replace ? nextItems : [...prev, ...nextItems.filter((item) => !prev.some((p) => p.id === item.id))];
    });
  };

  useEffect(() => {
    loadPage(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (hasNext && !isFetching) {
      loadPage(page + 1);
    }
  };

  return (
    <AppSafeArea>
      <AppHeader />
      <FlatList
        data={clans}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ClanCard clan={item} onPress={() => navigation.navigate(ROUTES.CLAN_DETAIL, { clanId: String(item.id) })} />
        )}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              CLAN
            </Text>
            <Text style={styles.headerSubtitle}>Discover buzzing clans</Text>
          </View>
        }
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={theme.colors.primary} style={styles.footerLoader} /> : <View style={{ height: 24 }} />
        }
        refreshControl={<RefreshControl tintColor="#fff" refreshing={isFetching && page === 0} onRefresh={() => loadPage(0, true)} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    backgroundColor: '#000000',
  },
  headerRow: {
    marginBottom: 12,
  },
  headerTitle: {
    color: '#F9FAFB',
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#9CA3AF',
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#0f172a',
    padding: 10,
    marginBottom: 12,
  },
  cardInner: {
    flexDirection: 'row',
    gap: 12,
  },
  cardImage: {
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#111827',
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    gap: 4,
  },
  cardTitle: {
    color: '#F9FAFB',
    flexShrink: 1,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#1f2937',
    borderRadius: 20,
  },
  chipText: {
    color: '#E5E7EB',
  },
  metaChip: {
    backgroundColor: '#111827',
    borderRadius: 10,
    height: 28,
  },
  buzzBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(79,70,229,0.2)',
    borderRadius: 10,
  },
  buzzText: {
    color: '#E0E7FF',
    flex: 1,
  },
  footerLoader: {
    marginTop: 8,
  },
});

export default ClanListScreen;
