import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContentType } from '../../types/content';

interface Props {
  title: string;
  subtitle?: string | null;
  badgeLabel?: string | null;
  thumbnailUrl?: string | null;
  contentType?: ContentType;
  onPress?: () => void;
  pinned?: boolean;
  footer?: React.ReactNode;
  accentIndex?: number;
  subtitleLines?: number;
}

const typeThemes: Record<ContentType | 'DEFAULT', { badgeBg: string; badgeText: string; overlay: string }> = {
  KLAZA: { badgeBg: '#22c55e', badgeText: '#0b5b2b', overlay: 'rgba(0,0,0,0.35)' },
  POLL: { badgeBg: '#38bdf8', badgeText: '#0a4a6d', overlay: 'rgba(0,0,0,0.35)' },
  RAFFLE: { badgeBg: '#fbbf24', badgeText: '#92400e', overlay: 'rgba(0,0,0,0.35)' },
  CLAN: { badgeBg: '#a855f7', badgeText: '#3b0764', overlay: 'rgba(0,0,0,0.35)' },
  DEFAULT: { badgeBg: '#e5e7eb', badgeText: '#111827', overlay: 'rgba(17,24,39,0.75)' },
};

const fallbackColors = ['#0ea5e9', '#a855f7', '#f97316', '#22c55e'];

const FeedCard: React.FC<Props> = ({
  title,
  subtitle,
  badgeLabel,
  thumbnailUrl,
  contentType,
  onPress,
  pinned,
  footer,
  accentIndex = 0,
  subtitleLines = 2,
}) => {
  const theme = typeThemes[contentType || 'DEFAULT'];
  const fallbackColor = fallbackColors[accentIndex % fallbackColors.length];
  const resolvedBadge = badgeLabel || contentType || 'Post';
  const imageSource = thumbnailUrl ? { uri: thumbnailUrl } : undefined;

  const overlayContent = (
    <View style={[styles.overlay, { backgroundColor: imageSource ? theme.overlay : `${fallbackColor}33` }]}>
      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}> 
          <Text style={[styles.badgeText, { color: theme.badgeText }]}>{resolvedBadge}</Text>
        </View>
        {pinned && <MaterialCommunityIcons name="pin" size={18} color="#fbbf24" />}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {!!subtitle && (
        <Text style={styles.subtitle} numberOfLines={subtitleLines}>
          {subtitle}
        </Text>
      )}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      {imageSource ? (
        <ImageBackground source={imageSource} style={styles.image} imageStyle={styles.imageInner}>
          {overlayContent}
        </ImageBackground>
      ) : (
        <View style={[styles.image, styles.placeholder, { backgroundColor: `${fallbackColor}22` }]}>{overlayContent}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  imageInner: {
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'flex-end',
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    marginTop: 6,
  },
  placeholder: {
    backgroundColor: '#111827',
  },
});

export default FeedCard;
