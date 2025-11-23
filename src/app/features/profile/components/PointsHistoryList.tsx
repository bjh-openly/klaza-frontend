import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PointsHistoryItem } from '../types';

interface Props {
  items: PointsHistoryItem[];
}

const PointsHistoryList: React.FC<Props> = ({ items }) => (
  <FlatList
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.row}>
        <Text>{item.date}</Text>
        <Text>{item.description}</Text>
        <Text>{item.delta > 0 ? `+${item.delta}` : item.delta} pts</Text>
      </View>
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
  },
});

export default PointsHistoryList;
