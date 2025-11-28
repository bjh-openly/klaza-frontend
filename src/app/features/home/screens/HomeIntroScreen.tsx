import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';
import HomeFeedList from '../components/HomeFeedList';
import { HomeFeedItem } from '../../../types/content';
import { ROUTES, TABS } from '../../../config/constants';

const categories = ['Fanmade', 'KLAZA made', 'Poll', 'Post'];

const HomeIntroScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handlePressItem = useCallback(
    (item: HomeFeedItem) => {
      switch (item.contentType) {
        case 'KLAZA':
          if (item.klazaId) {
            navigation.navigate(TABS.LOUNGE as never, {
              screen: ROUTES.LOUNGE_DETAIL,
              params: { klazaId: item.klazaId },
            });
          }
          break;
        case 'POLL':
          navigation.navigate(TABS.EVENTS as never, {
            screen: ROUTES.POLL_DETAIL,
            params: { pollId: String(item.pollId ?? '') },
          });
          break;
        case 'RAFFLE':
          navigation.navigate(TABS.EVENTS as never, {
            screen: ROUTES.RAFFLE_DETAIL,
            params: { raffleId: String(item.raffleId ?? '') },
          });
          break;
        case 'CLAN':
          navigation.navigate(TABS.CLAN as never, {
            screen: ROUTES.CLAN_POST_DETAIL,
            params: { postId: String(item.clanContentId ?? '') },
          });
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  return (
    <AppSafeArea>
      <AppHeader />
      <HomeFeedList
        contentPadding={0}
        onPressItem={handlePressItem}
        headerComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Share the Story™</Text>
            <Text style={styles.subtitle}>Dive into today’s feature</Text>
            <View style={styles.chips}>
              {categories.map((label) => (
                <Chip key={label}>{label}</Chip>
              ))}
            </View>
          </View>
        }
      />
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#000000',
    gap: 10,
  },
  title: {
    color: '#F9FAFB',
    fontWeight: '800',
    fontSize: 22,
  },
  subtitle: {
    color: '#9CA3AF',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export default HomeIntroScreen;
