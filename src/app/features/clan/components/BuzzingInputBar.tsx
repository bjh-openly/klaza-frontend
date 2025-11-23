import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface Props {
  onSend: (message: string) => void;
}

const BuzzingInputBar: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Drop a message" />
      <Button mode="contained" onPress={handleSend}>
        Send
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
  },
});

export default BuzzingInputBar;
