import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BuzzingMessage } from '../types';

interface Props {
  messages: BuzzingMessage[];
}

const BuzzingMessageList: React.FC<Props> = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text variant="labelSmall">{item.author}</Text>
          <Text>{item.message}</Text>
          <Text style={styles.time}>{item.createdAt}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  time: {
    color: '#9ca3af',
    fontSize: 12,
  },
});

export default BuzzingMessageList;
