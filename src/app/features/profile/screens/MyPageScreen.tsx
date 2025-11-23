import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, SegmentedButtons, Text } from 'react-native-paper';
import MyInfoScreen from './MyInfoScreen';
import MyPointsScreen from './MyPointsScreen';
import MyActivityScreen from './MyActivityScreen';
import ChargeScreen from './ChargeScreen';
import { useAppDispatch } from '../../../store/hooks';
import { signOut } from '../../auth/slice';
import { clearStoredAccessToken } from '../../../services/session';

const MyPageScreen = () => {
  const [tab, setTab] = useState<'info' | 'points' | 'activity' | 'charge'>('info');
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useAppDispatch();

  const renderContent = useMemo(() => {
    switch (tab) {
      case 'info':
        return <MyInfoScreen />;
      case 'points':
        return <MyPointsScreen />;
      case 'activity':
        return <MyActivityScreen />;
      case 'charge':
        return <ChargeScreen />;
      default:
        return null;
    }
  }, [tab]);

  const tabLabel = {
    info: 'MY INFO',
    points: 'MY POINTS',
    activity: 'MY ACTIVITY',
    charge: 'CHARGE',
  }[tab];

  const handleSignOut = async () => {
    await clearStoredAccessToken();
    dispatch(signOut());
    setShowConfirm(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {tabLabel}
      </Text>
      <SegmentedButtons
        value={tab}
        onValueChange={(value) => setTab(value as any)}
        buttons={[
          { value: 'info', label: 'MY INFO' },
          { value: 'points', label: 'MY POINTS' },
          { value: 'activity', label: 'MY ACTIVITY' },
          { value: 'charge', label: 'CHARGE' },
        ]}
      />
      <View style={styles.content}>{renderContent}</View>
      <Button mode="outlined" onPress={() => setShowConfirm(true)} style={styles.signOut}>
        Sign Out
      </Button>

      <Portal>
        <Dialog visible={showConfirm} onDismiss={() => setShowConfirm(false)}>
          <Dialog.Title>Are you sure you want to leave?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setShowConfirm(false)}>No, still more to do.</Button>
            <Button onPress={handleSignOut}>Yes, for now.</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  content: {
    marginTop: 16,
  },
  signOut: {
    marginTop: 16,
  },
});

export default MyPageScreen;
