import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { pickImage } from '../../../services/imagePicker';

const ClanPostCreateScreen = () => {
  const [mode, setMode] = useState<'photo' | 'photoText' | 'text'>('photoText');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const handlePick = async () => {
    const asset = await pickImage();
    if (asset?.uri) setPhotoUri(asset.uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">New Clan Post</Text>
      <TextInput mode="outlined" label="Title" value={title} onChangeText={setTitle} style={styles.input} />

      <RadioButton.Group onValueChange={(value) => setMode(value as any)} value={mode}>
        <RadioButton.Item label="Photo only" value="photo" />
        <RadioButton.Item label="Photo + text" value="photoText" />
        <RadioButton.Item label="Text only" value="text" />
      </RadioButton.Group>

      {(mode === 'photo' || mode === 'photoText') && (
        <View style={styles.media}>
          <Button mode="contained" onPress={handlePick}>
            Upload photo
          </Button>
          {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
        </View>
      )}

      {(mode === 'photoText' || mode === 'text') && (
        <TextInput
          mode="outlined"
          label="Content"
          multiline
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
      )}

      <Button mode="contained" style={styles.button}>
        Save draft
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginVertical: 8 },
  media: { marginVertical: 8 },
  image: { height: 160, marginTop: 8, borderRadius: 8 },
  button: { marginTop: 12 },
});

export default ClanPostCreateScreen;
