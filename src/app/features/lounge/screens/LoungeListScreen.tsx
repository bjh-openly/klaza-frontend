import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import LoungeFeed from '../components/LoungeFeed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const categories = ['Fanmade', 'KLAZA made', 'Poll', 'Post'];

const LoungeListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoungeStackParamList>>();

  const openDetail = (item: LoungeStackParamList[typeof ROUTES.LOUNGE_DETAIL]['item']) => {
    navigation.navigate(ROUTES.LOUNGE_DETAIL, { item });
  };

  return (
    <AppSafeArea>
      <AppHeader />
      <LoungeFeed
        header={
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Share the StoryTM
            </Text>
            <Text style={styles.subtitle}>Dive into today’s feature</Text>
            <View style={styles.chips}>
              {categories.map((label) => (
                <Chip key={label} style={styles.chip}>
                  {label}
                </Chip>
              ))}
            </View>
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
  title: {
    fontWeight: '700',
    color: '#F9FAFB',
  },
  subtitle: {
    color: '#9CA3AF',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 6,
  },
});

export default LoungeListScreen;
