import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Text, TextInput } from 'react-native-paper';
import { KlazaComment, PostKlazaCommentRequest, usePostKlazaCommentMutation } from '../../../services/klazaApi';
import { FEATURE_FLAGS } from '../../../config/env';

interface Props {
  contentId: number;
  initialComments?: KlazaComment[];
  reportedCount?: number | null;
}

const mockComments: KlazaComment[] = [
  {
    commentId: 1,
    contentId: 0,
    parentCommentId: null,
    text: '라운지에 오신 것을 환영해요. 자유롭게 의견을 남겨주세요!',
    authorActorId: 100,
    status: 'CREATED',
    createdAt: new Date().toISOString(),
  },
];

const LoungeComments: React.FC<Props> = ({ contentId, initialComments, reportedCount }) => {
  const [postComment, { isLoading: isSubmitting }] = usePostKlazaCommentMutation();
  const seedComments = useMemo(() => {
    if (initialComments) return initialComments;
    if (FEATURE_FLAGS.enableMockApis) {
      return mockComments.map((comment) => ({ ...comment, contentId }));
    }
    return [];
  }, [contentId, initialComments]);
  const [comments, setComments] = useState<KlazaComment[]>(seedComments);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setComments(seedComments);
  }, [seedComments]);

  const visibleCount = Math.max(comments.length, reportedCount ?? 0);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('댓글 내용을 입력해 주세요.');
      return;
    }
    setError(null);

    const payload: PostKlazaCommentRequest = { contentId, text: trimmed };

    try {
      const created = await postComment(payload).unwrap();
      setComments((prev) => [created, ...prev]);
      setText('');
    } catch (e) {
      setError('댓글 등록에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          댓글
        </Text>
        <Text style={styles.count}>{visibleCount}개</Text>
      </View>

      <TextInput
        mode="outlined"
        value={text}
        onChangeText={setText}
        placeholder="내용을 입력해 주세요"
        placeholderTextColor="#9CA3AF"
        multiline
        maxLength={10000}
        style={styles.input}
        outlineColor="#374151"
        activeOutlineColor="#F59E0B"
      />
      {error ? (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting || text.trim().length === 0}
        style={styles.submitButton}
        contentStyle={styles.submitButtonContent}
      >
        등록
      </Button>

      <Divider style={styles.divider} />

      <View style={styles.list}>
        {comments.length === 0 ? (
          <Text style={styles.empty}>첫 댓글을 남겨보세요.</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.commentId} style={styles.commentCard}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>라운저 {comment.authorActorId}</Text>
                <Text style={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
  count: {
    color: '#9CA3AF',
  },
  input: {
    backgroundColor: '#0B0F19',
    color: '#E5E7EB',
  },
  submitButton: {
    alignSelf: 'flex-end',
  },
  submitButtonContent: {
    paddingHorizontal: 12,
  },
  divider: {
    backgroundColor: '#1F2937',
  },
  list: {
    gap: 10,
  },
  empty: {
    color: '#9CA3AF',
  },
  commentCard: {
    backgroundColor: '#0B0F19',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentAuthor: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  commentDate: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  commentText: {
    color: '#E5E7EB',
    lineHeight: 20,
  },
});

export default LoungeComments;
