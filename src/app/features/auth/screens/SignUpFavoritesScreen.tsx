import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const options = ['Drama', 'Movie', 'Webtoon', 'Novels', 'Romance', 'Fantasy'];

const SignUpFavoritesScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_FAVORITES>> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Choose your favorites</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {options.map((item) => (
          <Chip key={item} selected={selected.includes(item)} onPress={() => toggle(item)} style={styles.chip}>
            {item}
          </Chip>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_DONE)} style={styles.button}>
        Finish
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    marginVertical: 16,
  },
  chip: {
    marginRight: 8,
  },
  button: {
    marginTop: 12,
  },
});

export default SignUpFavoritesScreen;
