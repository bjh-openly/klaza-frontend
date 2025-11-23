import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Divider, Text } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import { useAppSelector } from '../../../store/hooks';
import { selectLoungeByContentId } from '../store/loungeSlice';

const LoungeDetailScreen = () => {
  const route = useRoute<RouteProp<LoungeStackParamList, typeof ROUTES.LOUNGE_DETAIL>>();
  const { item: paramItem } = route.params;
  const cachedItem = useAppSelector(selectLoungeByContentId(paramItem.contentId, paramItem.klazaId));
  const item = cachedItem ?? paramItem;

  const snippet = item.contentSnippet.replace(/\{\{slot:[^}]+\}\}/g, '').trim();
  const author = item.authorLogins?.[0] ?? 'KLAZA Editor Judy';
  const isKlazaMade = author.toLowerCase().includes('buzz');

  const label = useMemo(() => (isKlazaMade ? 'KLAZA made' : 'Fanmade'), [isKlazaMade]);

  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Chip style={styles.chip}>{label}</Chip>
          <Text style={styles.meta}>
            {isKlazaMade ? 'Brought to you by: KLAZA Editor Judy' : 'Fanmade'}
          </Text>
          <Text variant="headlineMedium" style={styles.title}>
            {item.title}
          </Text>
        </View>

        <Text style={styles.body}>{snippet || 'Content is being prepared.'}</Text>
        <Text style={styles.body}>"Share the Story"에서 추천하는 최신 KLAZA 글입니다.</Text>

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
  },
  hero: {
    gap: 6,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  meta: {
    color: '#6b7280',
  },
  title: {
    fontWeight: '700',
  },
  body: {
    lineHeight: 22,
    color: '#1f2937',
  },
  divider: {
    marginVertical: 8,
  },
  comments: {
    gap: 6,
  },
  comment: {
    color: '#4b5563',
  },
});

export default LoungeDetailScreen;
