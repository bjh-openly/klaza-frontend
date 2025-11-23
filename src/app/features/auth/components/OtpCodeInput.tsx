import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const CELL_COUNT = 6;

const OtpCodeInput: React.FC<Props> = ({ value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: 40,
    height: 48,
    lineHeight: 46,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    textAlign: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  focusCell: {
    borderColor: '#5A3EED',
  },
  cellText: {
    fontSize: 18,
  },
});

export default OtpCodeInput;
