import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ClanStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import { pickImage } from '../../../services/imagePicker';
import { BlockType, EditorBlock, NewPostState } from '../types';
import { useAppSelector } from '../../../store/hooks';
import { useCreateClanPostMutation, useGetClanDetailQuery, useGetClansQuery } from '../../../services/clanApi';

const blockOptions: { type: BlockType; label: string; icon: string }[] = [
  { type: 'PHOTO_ONLY', label: 'photo only', icon: 'image' },
  { type: 'PHOTO_TEXT', label: 'photo+text', icon: 'image-text' },
  { type: 'TEXT_ONLY', label: 'text only', icon: 'text' },
];

const ClanPostCreateScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ClanStackParamList, typeof ROUTES.CLAN_POST_CREATE>>();
  const preselectedClanId = route.params?.clanId;
  const { accessToken } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!accessToken;

  const { data: clanDetail } = useGetClanDetailQuery(preselectedClanId!, { skip: !preselectedClanId });
  const { data: clanList } = useGetClansQuery({ page: 0, size: 20 });

  const [postState, setPostState] = useState<NewPostState>({
    title: '',
    blocks: [],
    clanId: preselectedClanId,
  });
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [createPost, { isLoading }] = useCreateClanPostMutation();

  const selectedClanName = useMemo(() => {
    if (preselectedClanId && clanDetail) return clanDetail.name;
    const fallbackClan = clanList?.items?.[0];
    const selected = clanList?.items?.find((c) => String(c.id) === String(postState.clanId));
    return selected?.name ?? fallbackClan?.name ?? 'Select clan';
  }, [clanDetail, clanList?.items, postState.clanId, preselectedClanId]);

  const handlePickImage = async (blockId?: string) => {
    const asset = await pickImage();
    if (!asset?.uri) return;
    if (blockId) {
      setPostState((prev) => ({
        ...prev,
        blocks: prev.blocks.map((block) =>
          block.id === blockId ? { ...block, upload: { uri: asset.uri }, imageUrl: asset.uri } : block,
        ),
      }));
    } else {
      setPostState((prev) => ({ ...prev, coverImage: { uri: asset.uri } }));
    }
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock: EditorBlock = { id: Date.now().toString(), type };
    setPostState((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    setShowBlockPicker(false);
  };

  const handleRemoveBlock = (blockId: string) => {
    setPostState((prev) => ({ ...prev, blocks: prev.blocks.filter((block) => block.id !== blockId) }));
  };

  const handleSave = async () => {
    if (!isLoggedIn) {
      Alert.alert('Sign in required', 'Please sign in before posting.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign in', onPress: () => navigation.navigate(ROUTES.AUTH as never) },
      ]);
      return;
    }

    const clanId = postState.clanId || clanDetail?.id || clanList?.items?.[0]?.id;
    if (!clanId) {
      Alert.alert('Missing clan', 'Please choose a clan for this post.');
      return;
    }
    if (!postState.title.trim()) {
      Alert.alert('Add a title', 'Please enter a title before saving.');
      return;
    }
    if (postState.blocks.length === 0) {
      Alert.alert('Add content', 'Please add at least one block.');
      return;
    }

    const payloadBlocks = postState.blocks.map((block) => ({
      type: block.type,
      text: block.text?.trim() || undefined,
      fileId: block.upload?.fileId,
    }));

    await createPost({ clanId: String(clanId), body: { title: postState.title.trim(), blocks: payloadBlocks } });
    navigation.goBack();
  };

  const renderBlock = (block: EditorBlock) => {
    const requiresPhoto = block.type !== 'TEXT_ONLY';
    const showText = block.type !== 'PHOTO_ONLY';
    return (
      <View key={block.id} style={styles.editorBlock}>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>{blockOptions.find((opt) => opt.type === block.type)?.label}</Text>
          <TouchableOpacity onPress={() => handleRemoveBlock(block.id)} hitSlop={8}>
            <MaterialCommunityIcons name="close" color="#fff" size={18} />
          </TouchableOpacity>
        </View>
        {requiresPhoto && (
          <TouchableOpacity style={styles.photoPlaceholder} onPress={() => handlePickImage(block.id)}>
            {block.imageUrl ? (
              <Image source={{ uri: block.imageUrl }} style={styles.photoPreview} />
            ) : (
              <Text style={styles.placeholderText}>Upload a picture</Text>
            )}
          </TouchableOpacity>
        )}
        {showText && (
          <TextInput
            style={styles.blockInput}
            placeholder={block.type === 'TEXT_ONLY' ? 'Insert text...' : 'Insert text'}
            placeholderTextColor="#6b7280"
            multiline
            value={block.text}
            onChangeText={(value) =>
              setPostState((prev) => ({
                ...prev,
                blocks: prev.blocks.map((b) => (b.id === block.id ? { ...b, text: value } : b)),
              }))
            }
          />
        )}
      </View>
    );
  };

  return (
    <AppSafeArea>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>New Post</Text>
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryLabel}>Category</Text>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>{selectedClanName}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cover} onPress={() => handlePickImage()}>
          {postState.coverImage?.uri ? (
            <Image source={{ uri: postState.coverImage.uri }} style={styles.coverImage} />
          ) : (
            <Text style={styles.placeholderText}>Upload cover</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.titleInput}
          placeholder="Insert title..."
          placeholderTextColor="#6b7280"
          value={postState.title}
          onChangeText={(value) => setPostState((prev) => ({ ...prev, title: value }))}
        />

        <View style={styles.blocksWrapper}>{postState.blocks.map((block) => renderBlock(block))}</View>

        <TouchableOpacity style={styles.addButton} onPress={() => setShowBlockPicker((prev) => !prev)}>
          <Text style={styles.addButtonText}>+add new block</Text>
        </TouchableOpacity>

        {showBlockPicker && (
          <View style={styles.blockPicker}>
            {blockOptions.map((option) => (
              <TouchableOpacity
                key={option.type}
                style={styles.blockPickerItem}
                onPress={() => handleAddBlock(option.type)}
              >
                <MaterialCommunityIcons name={option.icon} size={22} color="#fff" />
                <Text style={styles.blockPickerLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  saveText: {
    color: '#60a5fa',
    fontWeight: '700',
  },
  scroll: {
    backgroundColor: '#000',
  },
  container: {
    padding: 16,
    gap: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLabel: {
    color: '#9ca3af',
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#0b1222',
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
  },
  cover: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#0b1222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  titleInput: {
    color: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1f2937',
    paddingVertical: 8,
  },
  blocksWrapper: {
    gap: 10,
  },
  editorBlock: {
    backgroundColor: '#0b1222',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  photoPlaceholder: {
    backgroundColor: '#111827',
    height: 160,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  blockInput: {
    minHeight: 80,
    color: '#fff',
    textAlignVertical: 'top',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#374151',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  blockPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 10,
    gap: 10,
  },
  blockPickerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    gap: 8,
  },
  blockPickerLabel: {
    color: '#fff',
  },
});

export default ClanPostCreateScreen;
