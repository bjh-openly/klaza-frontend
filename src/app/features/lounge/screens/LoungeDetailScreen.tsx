import React, { useMemo } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const accentColors = ['#0ea5e9', '#a855f7', '#f97316', '#22c55e'];

const LoungeDetailScreen = () => {
  const route = useRoute<RouteProp<LoungeStackParamList, typeof ROUTES.LOUNGE_DETAIL>>();
  const theme = useTheme();
  const { item } = route.params;

  const accent = useMemo(
    () => accentColors[(item.contentId + item.klazaId) % accentColors.length],
    [item.contentId, item.klazaId],
  );
  const snippet = item.contentSnippet.replace(/\{\{slot:[^}]+\}\}/g, '').trim();
  const author = item.authorLogins?.[0] ?? 'KLAZA Editor';

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: `https://picsum.photos/1200/800?sig=${item.contentId}` }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Chip style={[styles.chip, { backgroundColor: `${accent}22` }]} textStyle={{ color: accent }}>
              Post
            </Chip>
            <Text variant="headlineSmall" style={styles.heroTitle} numberOfLines={3}>
              {item.title}
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{author}</Text>
              <Text style={styles.metaLabel}>{new Date(item.publishAt).toLocaleDateString()}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Summary
          </Text>
          <Text variant="bodyLarge" style={styles.copy}>
            {snippet || '콘텐츠 요약이 준비되고 있습니다.'}
          </Text>
          <Text variant="bodyMedium" style={[styles.copy, { color: theme.colors.onSurfaceVariant }]}>
            "Share the Story"에서 추천하는 최신 KLAZA 글입니다.
          </Text>
        </View>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  hero: {
    height: 340,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroTitle: {
    color: '#fff',
    marginTop: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaLabel: {
    color: '#e5e7eb',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  copy: {
    lineHeight: 22,
    color: '#1f2937',
  },
  chip: {
    alignSelf: 'flex-start',
  },
});

export default LoungeDetailScreen;
