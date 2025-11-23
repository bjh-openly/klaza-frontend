import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { KlazaSearchItem } from '../../../services/klazaApi';

interface Props {
  item: KlazaSearchItem;
  accentIndex?: number;
  onPress?: () => void;
}

const accentColors = ['#0ea5e9', '#a855f7', '#f97316', '#22c55e'];

const LoungeItemCard: React.FC<Props> = ({ item, accentIndex = 0, onPress }) => {
  const accent = accentColors[accentIndex % accentColors.length];
  const snippet = item.contentSnippet.replace(/\{\{slot:[^}]+\}\}/g, '').trim();
  const author = item.authorLogins?.[0] ?? 'KLAZA Editor';

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: `https://picsum.photos/800/400?sig=${item.contentId}` }} style={styles.cover} />
      <Card.Content style={styles.content}>
        <View style={styles.row}>
          <Chip style={[styles.chip, { backgroundColor: `${accent}22` }]} textStyle={{ color: accent }}>
            Post
          </Chip>
          <Text style={styles.meta}>{author}</Text>
        </View>
        <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text variant="bodyMedium" style={styles.snippet} numberOfLines={3}>
          {snippet}
        </Text>
        <Text style={styles.date}>{new Date(item.publishAt).toLocaleDateString()}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 20,
    marginHorizontal: 16,
  },
  cover: {
    height: 180,
  },
  content: {
    paddingTop: 12,
  },
  title: {
    marginBottom: 8,
  },
  snippet: {
    color: '#475569',
  },
  date: {
    marginTop: 10,
    color: '#94a3b8',
    fontSize: 12,
  },
  chip: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    color: '#6b7280',
  },
});

export default LoungeItemCard;
