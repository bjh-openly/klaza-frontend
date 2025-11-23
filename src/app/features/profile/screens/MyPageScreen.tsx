import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import MyInfoScreen from './MyInfoScreen';
import MyPointsScreen from './MyPointsScreen';
import MyActivityScreen from './MyActivityScreen';
import ChargeScreen from './ChargeScreen';
import { useAppDispatch } from '../../../store/hooks';
import { signOut } from '../../auth/slice';
import { clearStoredAccessToken } from '../../../services/session';

const MyPageScreen = () => {
  const [tab, setTab] = useState<'info' | 'points' | 'activity' | 'charge'>('info');
  const dispatch = useAppDispatch();
  const renderContent = () => {
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        My Page
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
      <View style={styles.content}>{renderContent()}</View>
      <Button
        mode="outlined"
        onPress={async () => {
          await clearStoredAccessToken();
          dispatch(signOut());
        }}
        style={styles.signOut}
      >
        Sign Out
      </Button>
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
