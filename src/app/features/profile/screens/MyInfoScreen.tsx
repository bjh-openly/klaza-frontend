import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Chip, Divider, List, Switch, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleNotification } from '../slice';
import { pickImage } from '../../../services/imagePicker';

const MyInfoScreen = () => {
  const { preferences, notifications } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  const handlePick = async () => {
    const asset = await pickImage();
    if (asset?.uri) {
      setPhotoUri(asset.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <Avatar.Image size={72} source={photoUri ? { uri: photoUri } : undefined} />
        <Button mode="text" onPress={handlePick}>
          Submit a picture for your profile.
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Title title="PERSONAL INFO" />
        <Divider />
        <List.Item
          title="Country"
          description="United States"
          right={() => <Button onPress={() => {}}>Edit</Button>}
        />
        <List.Item
          title="Date of Birth"
          description="2000-02-17"
          right={() => <Button onPress={() => {}}>Edit</Button>}
        />
        <List.Item
          title="Gender"
          description="Male"
          right={() => <Button onPress={() => {}}>Edit</Button>}
        />
        <List.Item
          title="Phone number"
          description="+82 10-1234-1234"
          right={() => <Button onPress={() => {}}>Edit</Button>}
        />
      </Card>

      <Card style={styles.card}>
        <Card.Title title="SETTINGS" />
        <Divider />
        <List.Item
          title="PUSH notices"
          right={() => (
            <Switch
              value={notifications.push}
              onValueChange={() => dispatch(toggleNotification({ key: 'push' }))}
            />
          )}
        />
        <List.Item
          title="SNS notices"
          right={() => (
            <Switch value={notifications.sns} onValueChange={() => dispatch(toggleNotification({ key: 'sns' }))} />
          )}
        />
      </Card>

      <Card style={styles.card}>
        <Card.Title title="PREFERENCES" right={() => <Button onPress={() => {}}>Edit</Button>} />
        <Card.Content>
          <View style={styles.chipsRow}>
            {preferences.map((pref) => (
              <Chip key={pref.id} style={styles.chip}>
                {pref.label}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  card: {
    borderRadius: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 4,
  },
});

export default MyInfoScreen;
