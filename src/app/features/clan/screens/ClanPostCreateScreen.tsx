import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, RadioButton, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { pickImage } from '../../../services/imagePicker';

const clans = ['SCI-FY', 'Creatures Everywhere', 'The Rom-commers'];

const ClanPostCreateScreen = () => {
  const [mode, setMode] = useState<'photo' | 'photoText' | 'text'>('photoText');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [category, setCategory] = useState(clans[0]);

  const handlePick = async () => {
    const asset = await pickImage();
    if (asset?.uri) setPhotoUri(asset.uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        New Post
      </Text>
      <TextInput
        mode="outlined"
        label="Title"
        placeholder="Insert title..."
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Insert text..."
        placeholder="Insert text..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <RadioButton.Group onValueChange={(value) => setCategory(value)} value={category}>
        {clans.map((clan) => (
          <RadioButton.Item key={clan} label={clan} value={clan} />
        ))}
      </RadioButton.Group>

      <Button mode="outlined" onPress={handlePick} style={styles.button}>
        Upload a main picture
      </Button>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      <Text style={styles.label}>Mode</Text>
      <SegmentedButtons
        value={mode}
        onValueChange={(value) => setMode(value as typeof mode)}
        buttons={[
          { value: 'photo', label: 'photo only' },
          { value: 'photoText', label: 'photo+text' },
          { value: 'text', label: 'text only' },
        ]}
        style={styles.segmented}
      />

      <Button mode="contained" style={styles.submit}>Post</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  title: { marginBottom: 8 },
  input: { marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 4, color: '#6b7280' },
  button: { marginVertical: 8 },
  image: { height: 180, borderRadius: 12, marginBottom: 8 },
  segmented: { marginVertical: 8 },
  submit: { marginTop: 8 },
});

export default ClanPostCreateScreen;
