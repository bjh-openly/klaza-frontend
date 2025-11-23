import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';

const heroTitle = 'The art of ambiguity in Korean drama titles';
const listItems = [
  {
    type: 'Poll',
    title: 'Legendary creatures in Korean film',
    imageUri: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    type: 'Fanmade',
    title: 'Drama trailer for <A Magical Girl Retires>',
    imageUri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    type: 'Fanmade',
    title: 'Fan art collection for the movie <Wonderland>',
    imageUri: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80',
  },
];

const heroImageUri = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1400&q=80';

const HomeIntroScreen = () => {
  return (
    <AppSafeArea>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity activeOpacity={0.92}>
          <ImageBackground source={{ uri: heroImageUri }} style={styles.heroImage} imageStyle={styles.heroImageInner}>
            <View style={styles.heroOverlay}>
              <Chip style={styles.heroTag} textStyle={styles.heroTagText}>
                Post
              </Chip>
              <Text style={styles.heroTitle}>{heroTitle}</Text>
              <View style={styles.paginationDots}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {listItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.listCard} activeOpacity={0.92}>
            <ImageBackground
              source={{ uri: item.imageUri }}
              style={styles.listImage}
              imageStyle={styles.listImageInner}
            >
              <View style={styles.listOverlay}>
                <Chip style={styles.listTag} textStyle={styles.listTagText}>
                  {item.type}
                </Chip>
                <Text style={styles.listTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: '#000000',
  },
  heroImage: {
    height: 280,
    marginBottom: 10,
  },
  heroImageInner: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  heroTagText: {
    color: '#111827',
    fontWeight: '600',
  },
  heroTitle: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '700',
  },
  paginationDots: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(249,250,251,0.4)',
    marginLeft: 4,
  },
  dotActive: {
    backgroundColor: '#F9FAFB',
  },
  listCard: {
    marginTop: 2,
  },
  listImage: {
    height: 150,
    width: '100%',
  },
  listImageInner: {},
  listOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  listTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.85)',
    marginBottom: 6,
  },
  listTagText: {
    color: '#111827',
    fontWeight: '600',
  },
  listTitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HomeIntroScreen;
