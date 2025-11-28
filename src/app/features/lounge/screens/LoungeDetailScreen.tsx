import React, { useMemo } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Chip, Divider, Text } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';
import { useGetKlazaPostDetailQuery } from '../../../services/klazaApi';

const LoungeDetailScreen = () => {
  const route = useRoute<RouteProp<LoungeStackParamList, typeof ROUTES.LOUNGE_DETAIL>>();
  const { klazaId, preview } = route.params;
  const { data, isFetching, refetch, isError } = useGetKlazaPostDetailQuery({ klazaId });
  const detail = data ?? preview;

  const author = useMemo(() => detail?.subtitle || 'Brought to you by: KLAZA Editor', [detail?.subtitle]);
  const label = useMemo(() => detail?.badgeLabel || 'KLAZA made', [detail?.badgeLabel]);

  if (isFetching && !detail) {
    return (
      <AppSafeArea>
        <AppHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      </AppSafeArea>
    );
  }

  if (isError && !detail) {
    return (
      <AppSafeArea>
        <AppHeader />
        <View style={styles.loadingContainer}>
          <Text>Failed to load lounge story.</Text>
          <Button mode="contained" onPress={refetch} style={styles.retryButton}>
            Retry
          </Button>
        </View>
      </AppSafeArea>
    );
  }

  if (!detail) return null;

  return (
    <AppSafeArea>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <ImageBackground
            source={detail.coverImageUrl ? { uri: detail.coverImageUrl } : undefined}
            style={styles.cover}
            imageStyle={styles.coverImage}
          >
            <View style={styles.coverOverlay}>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                {label}
              </Chip>
              <Text variant="headlineMedium" style={styles.title}>
                {detail.title}
              </Text>
              <Text style={styles.meta}>{author}</Text>
            </View>
          </ImageBackground>
        </View>

        <Text style={styles.body}>{detail.body || 'Content is being prepared.'}</Text>

        <Divider style={styles.divider} />
        <View style={styles.comments}>
          <Text variant="titleMedium">Comments</Text>
          <Text style={styles.comment}>User123: Love this take!</Text>
          <Text style={styles.comment}>Another fan: Can’t wait for more.</Text>
        </View>
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
  hero: {
    gap: 6,
  },
  cover: {
    height: 260,
    width: '100%',
  },
  coverImage: {
    borderRadius: 16,
  },
  coverOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 8,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  chipText: {
    color: '#111827',
    fontWeight: '700',
  },
  meta: {
    color: '#9CA3AF',
  },
  title: {
    fontWeight: '700',
    color: '#F9FAFB',
  },
  body: {
    lineHeight: 22,
    color: '#E5E7EB',
  },
  divider: {
    marginVertical: 8,
  },
  comments: {
    gap: 6,
  },
  comment: {
    color: '#E5E7EB',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000000',
  },
  retryButton: {
    marginTop: 12,
  },
});

export default LoungeDetailScreen;
