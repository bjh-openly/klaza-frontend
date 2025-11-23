import React, { useCallback, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const CELL_COUNT = 6;

const OtpCodeInput: React.FC<Props> = ({ value, setValue }) => {
  const inputRef = useRef<TextInput | null>(null);

  const handleChange = useCallback(
    (text: string) => {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, CELL_COUNT);
      setValue(sanitized);
    },
    [setValue],
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={CELL_COUNT}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        autoFocus
        style={styles.hiddenInput}
      />
      <View style={styles.cellsRow}>
        {Array.from({ length: CELL_COUNT }).map((_, index) => {
          const symbol = value[index];
          return (
            <View key={index} style={[styles.cell, symbol ? styles.filledCell : null]}>
              <Text style={styles.cellText}>{symbol ?? ' '}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
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
  },
  cellText: {
    fontSize: 18,
  },
});

export default OtpCodeInput;
