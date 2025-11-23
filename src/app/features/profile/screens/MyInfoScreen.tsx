import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, List, Switch, Text, TextInput } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleNotification } from '../slice';
import { pickImage } from '../../../services/imagePicker';

const MyInfoScreen = () => {
  const { preferences, notifications } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const handlePick = async () => {
    const asset = await pickImage();
    if (asset?.uri) setPhotoUri(asset.uri);
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>PERSONAL INFO</List.Subheader>
        <Button mode="outlined" onPress={() => setEditing(!editing)} style={styles.button}>
          {editing ? 'Done' : 'Edit'}
        </Button>
        {editing && (
          <>
            <TextInput label="Country" mode="outlined" style={styles.input} />
            <TextInput label="Date of birth" mode="outlined" style={styles.input} />
            <Button onPress={handlePick}>Upload profile image</Button>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
          </>
        )}
      </List.Section>

      <List.Section>
        <List.Subheader>SETTINGS</List.Subheader>
        <List.Item
          title="Push notices"
          right={() => <Switch value={notifications.push} onValueChange={() => dispatch(toggleNotification('push'))} />}
        />
        <List.Item
          title="SNS notices"
          right={() => <Switch value={notifications.sns} onValueChange={() => dispatch(toggleNotification('sns'))} />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>PREFERENCES</List.Subheader>
        <View style={styles.row}>
          {preferences.map((pref) => (
            <Text key={pref.id} style={styles.chip}>
              #{pref.label}
            </Text>
          ))}
        </View>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  button: {
    alignSelf: 'flex-start',
  },
  input: {
    marginVertical: 6,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f3f4f6',
    padding: 6,
    borderRadius: 12,
  },
});

export default MyInfoScreen;
