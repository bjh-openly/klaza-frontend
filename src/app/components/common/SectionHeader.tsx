import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface Props {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

const SectionHeader: React.FC<Props> = ({ title, actionLabel, onPressAction }) => (
  <View style={styles.container}>
    <Text variant="titleMedium">{title}</Text>
    {actionLabel && onPressAction && (
      <Button compact onPress={onPressAction}>
        {actionLabel}
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
});

export default SectionHeader;
