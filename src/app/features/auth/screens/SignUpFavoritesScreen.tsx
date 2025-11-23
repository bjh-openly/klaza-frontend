import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const options = ['drama', 'movie', 'webtoon', 'novels', 'romance', 'fantasy', 'comedy', 'horror', 'mystery', 'life', 'teens'];

const SignUpFavoritesScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_FAVORITES>> = ({
  navigation,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Choose your favs for a quick start.
      </Text>
      <View style={styles.chips}>
        {options.map((item) => (
          <Chip key={item} selected={selected.includes(item)} onPress={() => toggle(item)} style={styles.chip}>
            {item}
          </Chip>
        ))}
      </View>
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_DONE)} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpFavoritesScreen;
