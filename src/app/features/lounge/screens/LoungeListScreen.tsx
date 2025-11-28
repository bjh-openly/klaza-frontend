import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LoungeFeed from '../components/LoungeFeed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const LoungeListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoungeStackParamList>>();

  const openDetail = (item: LoungeStackParamList[typeof ROUTES.LOUNGE_DETAIL]['preview']) => {
    if (!item) return;
    navigation.navigate(ROUTES.LOUNGE_DETAIL, { klazaId: item.klazaId, preview: item });
  };

  return (
    <AppSafeArea>
      <AppHeader />
      <View style={styles.pageHeader}>
        <Text variant="titleLarge" style={styles.pageTitle}>
          Lounge
        </Text>
      </View>
      <LoungeFeed
        header={
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Share the Story™
            </Text>
            <Text style={styles.subtitle}>Dive into today’s feature</Text>
          </View>
        }
        contentPadding={16}
        onPressItem={openDetail}
      />
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
    gap: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  pageHeader: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  pageTitle: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    color: '#F9FAFB',
  },
  subtitle: {
    color: '#9CA3AF',
  },
});

export default LoungeListScreen;
