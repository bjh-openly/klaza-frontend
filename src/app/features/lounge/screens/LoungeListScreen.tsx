import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LoungeFeed from '../components/LoungeFeed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoungeStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const LoungeListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoungeStackParamList>>();

  const openDetail = (item: LoungeStackParamList[typeof ROUTES.LOUNGE_DETAIL]['item']) => {
    navigation.navigate(ROUTES.LOUNGE_DETAIL, { item });
  };

  return (
    <LoungeFeed
      header={
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Lounge-main
          </Text>
          <Text style={styles.subtitle}>Only posts published to KLAZA are gathered here.</Text>
        </View>
      }
      onPressItem={openDetail}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 4,
  },
});

export default LoungeListScreen;
