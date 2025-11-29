import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  value: string;
  setValue: (value: string) => void;
  cellCount?: number;
}

const OtpCodeInput: React.FC<Props> = ({ value, setValue, cellCount = 8 }) => {
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, cellCount);
      setValue(sanitized);
    },
    [cellCount, setValue],
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={cellCount}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        autoFocus
        style={styles.hiddenInput}
      />
      <Pressable onPress={() => inputRef.current?.focus()} style={styles.cellsRow} accessibilityRole="button">
        {Array.from({ length: cellCount }).map((_, index) => {
          const symbol = value[index];
          return (
            <View key={index} style={[styles.cell, symbol ? styles.filledCell : null]}>
              <Text style={[styles.cellText, symbol ? styles.filledCellText : null]}>{symbol ?? ' '}</Text>
            </View>
          );
        })}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 1,
    width: 1,
  },
  cellsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cell: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  filledCell: {
    borderColor: '#5A3EED',
    backgroundColor: '#3B82F6',
  },
  cellText: {
    fontSize: 18,
  },
  filledCellText: {
    color: '#FFFFFF',
  },
});

export default OtpCodeInput;
