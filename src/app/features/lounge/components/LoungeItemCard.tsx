import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KlazaPostListItem } from '../../../services/klazaApi';
import FeedCard from '../../../components/common/FeedCard';

interface Props {
  item: KlazaPostListItem;
  accentIndex?: number;
  onPress?: () => void;
}

const LoungeItemCard: React.FC<Props> = ({ item, accentIndex = 0, onPress }) => {
  const badge = item.badgeLabel || 'Post';
  const dateValue = item.publishAt ?? item.createdAt;

  return (
    <FeedCard
      title={item.title}
      subtitle={item.subtitle}
      badgeLabel={badge}
      thumbnailUrl={item.thumbnailUrl || undefined}
      contentType={item.contentType}
      onPress={onPress}
      pinned={!!item.pinned}
      footer={
        <View style={styles.footerRow}>
          {item.pinned && (
            <View style={styles.pinnedTag}>
              <MaterialCommunityIcons name="pin" color="#fbbf24" size={16} />
              <Text style={styles.pinnedText}>Pinned</Text>
            </View>
          )}
          <Text style={styles.date}>{new Date(dateValue).toLocaleDateString()}</Text>
        </View>
      }
      accentIndex={accentIndex}
      subtitleLines={2}
    />
  );
};

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  pinnedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pinnedText: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  date: {
    color: '#d1d5db',
    fontSize: 12,
  },
});

export default LoungeItemCard;
