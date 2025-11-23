import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { KlazaSearchItem, useLazySearchKlazaQuery } from '../../../services/klazaApi';
import LoungeItemCard from './LoungeItemCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { finishLoading, resetFeed, selectLoungeState, setPageData, startLoading } from '../store/loungeSlice';

interface Props {
  header?: React.ReactElement;
  contentPadding?: number;
  onPressItem?: (item: KlazaSearchItem) => void;
}

const LoungeFeed: React.FC<Props> = ({ header, contentPadding = 16, onPressItem }) => {
  const dispatch = useAppDispatch();
  const { items, page, hasNext, isLoading } = useAppSelector(selectLoungeState);
  const [trigger, { isFetching }] = useLazySearchKlazaQuery();

  const loadPage = useCallback(
    async (targetPage: number, reset = false) => {
      dispatch(startLoading());
      const response = await trigger({ page: targetPage, size: 10 });
      if ('data' in response) {
        dispatch(
          setPageData({
            items: response.data.items,
            page: response.data.page,
            hasNext: response.data.hasNext,
            reset,
          }),
        );
      } else {
        dispatch(finishLoading());
      }
    },
    [dispatch, trigger],
  );

  useEffect(() => {
    if (items.length === 0 && !isFetching && !isLoading) {
      loadPage(0, true);
    }
  }, [isFetching, isLoading, items.length, loadPage]);

  const onRefresh = () => {
    dispatch(resetFeed());
    loadPage(0, true);
  };

  const onEndReached = () => {
    if (!isFetching && hasNext) {
      loadPage(page + 1);
    }
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.contentId}-${item.klazaId}`}
      renderItem={({ item, index }) => (
        <LoungeItemCard item={item} accentIndex={index} onPress={() => onPressItem?.(item)} />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={() => (
        <View style={styles.emptyState}>
          {isFetching || isLoading ? <ActivityIndicator /> : <Text>No lounge stories yet.</Text>}
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
