import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useGetClanPostDetailQuery } from '../../../services/clanApi';
import { ContentBlock } from '../types';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  if (block.type === 'PHOTO_ONLY') {
    return <Image source={{ uri: block.imageUrl }} style={styles.imageBlock} />;
  }

  if (block.type === 'PHOTO_TEXT') {
    return (
      <View style={styles.photoTextBlock}>
        <Image source={{ uri: block.imageUrl }} style={styles.photoTextImage} />
        {block.text && <Text style={styles.blockText}>{block.text}</Text>}
      </View>
    );
  }

  return (
    <Text style={styles.blockText}>
      {block.text}
    </Text>
  );
};

const ClanPostDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ClanStackParamList, typeof ROUTES.CLAN_POST_DETAIL>>();
  const postId = route.params?.postId as string;
  const { data: post } = useGetClanPostDetailQuery(postId!, { skip: !postId });

  return (
    <AppSafeArea>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>

        {post?.coverImageUrl && <Image source={{ uri: post.coverImageUrl }} style={styles.cover} />}
        <View style={styles.header}>
          <Text style={styles.postType}>Fanmade</Text>
          <Text style={styles.title}>{post?.title}</Text>
          {!!post?.createdBy && <Text style={styles.meta}>Created by: {post.createdBy}</Text>}
        </View>

        <View style={styles.blocks}>
          {post?.blocks?.map((block, index) => (
            <BlockRenderer key={index.toString()} block={block} />
          ))}
        </View>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#000',
  },
  container: {
    paddingBottom: 32,
  },
  closeButton: {
    padding: 12,
    alignSelf: 'flex-start',
  },
  cover: {
    width: '100%',
    height: 260,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  postType: {
    color: '#c7d2fe',
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    color: '#9ca3af',
  },
  blocks: {
    paddingHorizontal: 16,
    gap: 14,
  },
  imageBlock: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  photoTextBlock: {
    gap: 8,
  },
  photoTextImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  blockText: {
    color: '#e5e7eb',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ClanPostDetailScreen;
