import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { useGetClansQuery } from '../../../services/clanApi';
import SectionHeader from '../../../components/common/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const ClanListScreen = () => {
  const { data = [] } = useGetClansQuery();
  const navigation = useNavigation<NativeStackNavigationProp<ClanStackParamList>>();

  return (
    <AppSafeArea>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader title="CLAN" />
        {data.map((clan) => (
          <Card
            key={clan.id}
            style={styles.card}
            onPress={() => navigation.navigate(ROUTES.CLAN_DETAIL, { clanId: clan.id })}
          >
            <Card.Title title={clan.name} subtitle={clan.description} titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} />
            <Card.Content>
              <View style={styles.tags}>
                {clan.tags.map((tag) => (
                  <Chip key={tag} style={styles.chip}>
                    {tag}
                  </Chip>
                ))}
              </View>
              <Text style={styles.meta}>buzzing {clan.latestBuzz}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#111827',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 6,
  },
  chip: {
    marginRight: 6,
  },
  meta: {
    color: '#9CA3AF',
  },
  cardTitle: {
    color: '#F9FAFB',
  },
  cardSubtitle: {
    color: '#E5E7EB',
  },
});

export default ClanListScreen;
