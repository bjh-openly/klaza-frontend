import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  KlazaSearchItem,
  useLazySearchKlazaQuery,
  KlazaSearchResponse,
} from '../../../services/klazaApi';
import LoungeItemCard from './LoungeItemCard';

interface Props {
  header?: React.ReactElement;
  contentPadding?: number;
}

const LoungeFeed: React.FC<Props> = ({ header, contentPadding = 16 }) => {
  const [items, setItems] = useState<KlazaSearchItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [trigger, { isFetching } ] = useLazySearchKlazaQuery();

  const appendData = useCallback((response?: KlazaSearchResponse, reset?: boolean) => {
    if (!response) return;
    setItems((prev) => (reset ? response.items : [...prev, ...response.items]));
    setPage(response.page);
    setHasNext(response.hasNext);
  }, []);

  const loadPage = useCallback(
    async (targetPage: number, reset = false) => {
      const response = await trigger({ page: targetPage, size: 10 });
      if ('data' in response) {
        appendData(response.data, reset);
      }
    },
    [appendData, trigger],
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

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.contentId}-${item.klazaId}`}
      renderItem={({ item, index }) => <LoungeItemCard item={item} accentIndex={index} />}
      ListHeaderComponent={header}
      ListEmptyComponent={() => (
        <View style={styles.emptyState}>
          {isFetching ? <ActivityIndicator /> : <Text>No lounge stories yet.</Text>}
        </View>
      )}
      ListFooterComponent={isFetching && items.length > 0 ? <ActivityIndicator style={styles.footer} /> : null}
      contentContainerStyle={[styles.listContent, { padding: contentPadding }]}
      refreshControl={<RefreshControl refreshing={isFetching && items.length === 0} onRefresh={onRefresh} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footer: {
    marginVertical: 12,
  },
});

export default LoungeFeed;
