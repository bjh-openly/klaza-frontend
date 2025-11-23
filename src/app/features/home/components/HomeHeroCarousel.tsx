import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const HomeHeroCarousel = () => (
  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.container}>
    {[1, 2, 3].map((item) => (
      <Card key={item} style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Feature {item}</Text>
          <Text>Spotlight content preview for Share the Story.</Text>
        </Card.Content>
      </Card>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  card: {
    width: 280,
    marginRight: 12,
  },
});

export default HomeHeroCarousel;
