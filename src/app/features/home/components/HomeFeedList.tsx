import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useLazyGetHomepageQuery } from '../../../services/contentApi';
import { HomeFeedItem } from '../../../types/content';
import FeedCard from '../../../components/common/FeedCard';

interface Props {
  onPressItem: (item: HomeFeedItem) => void;
  contentPadding?: number;
  headerComponent?: React.ReactElement;
}

const PAGE_SIZE = 10;

const dedupeItems = (current: HomeFeedItem[], incoming: HomeFeedItem[]) => {
  const map = new Map(current.map((item) => [item.contentId, item] as const));
  incoming.forEach((item) => {
    map.set(item.contentId, item);
  });
  return Array.from(map.values()).sort((a, b) => {
    const aDate = a.publishAt ?? a.createdAt;
    const bDate = b.publishAt ?? b.createdAt;
    return bDate.localeCompare(aDate);
  });
};

const HomeFeedList: React.FC<Props> = ({ onPressItem, contentPadding = 0, headerComponent }) => {
  const [items, setItems] = useState<HomeFeedItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [trigger, { isFetching }] = useLazyGetHomepageQuery();

  const loadPage = useCallback(
    async (targetPage: number, reset = false) => {
      const response = await trigger({ page: targetPage, size: PAGE_SIZE });
      if ('data' in response) {
        setItems((prev) => (reset ? response.data.items : dedupeItems(prev, response.data.items)));
        setPage(response.data.page);
        setHasNext(response.data.hasNext);
      }
    },
    [trigger],
  );

  useEffect(() => {
    loadPage(0, true);
  }, [loadPage]);

  const onRefresh = () => loadPage(0, true);

  const onEndReached = () => {
    if (!isFetching && hasNext) {
      loadPage(page + 1);
    }
  };

  const renderItem = useCallback(
    ({ item, index }: { item: HomeFeedItem; index: number }) => (
      <FeedCard
        title={item.title}
        subtitle={item.summary || undefined}
        badgeLabel={item.badgeLabel || undefined}
        thumbnailUrl={item.thumbnailUrl || undefined}
        contentType={item.contentType}
        onPress={() => onPressItem(item)}
        accentIndex={index}
        subtitleLines={2}
      />
    ),
    [onPressItem],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.contentId}`}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={isFetching && items.length === 0} onRefresh={onRefresh} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={() => (
        <View style={styles.emptyState}>
          {isFetching ? <ActivityIndicator /> : <Text style={styles.emptyText}>No Stories Yet</Text>}
        </View>
      )}
      ListFooterComponent={isFetching && items.length > 0 ? <ActivityIndicator style={styles.footer} /> : null}
      ListHeaderComponent={headerComponent}
      contentContainerStyle={[styles.listContent, { padding: contentPadding }]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
    backgroundColor: '#000000',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#9CA3AF',
  },
  footer: {
    marginVertical: 12,
  },
});

export default HomeFeedList;
