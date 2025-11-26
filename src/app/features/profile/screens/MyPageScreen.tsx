import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Chip, Divider, Switch, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import AppHeader from '../../../components/layout/AppHeader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { restoreSession, signOut } from '../../auth/slice';
import apiClient from '../../../services/apiClient';
import { clearStoredAuthState } from '../../../services/session';
import { ROUTES } from '../../../config/constants';

const preferenceOptions = [
  'dorama',
  'movie',
  'webtoon',
  'novels',
  'romance',
  'fantasy',
  'comedy',
  'horror',
  'mystery',
  'life',
  'teens',
];

const MyPageScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken, actor, userProfile, preferences } = useAppSelector((state) => state.auth);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [snsEnabled, setSnsEnabled] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const selectedTags = useMemo(() => preferences?.tags ?? [], [preferences]);

  const persistProfileIfNeeded = useCallback(
    (payload: { actor?: any; userProfile?: any; preferences?: any; joinedClans?: any }) => {
      dispatch(
        restoreSession({
          actor: payload.actor ?? null,
          userProfile: payload.userProfile ?? null,
          preferences: payload.preferences ?? null,
          joinedClans: payload.joinedClans ?? [],
        }),
      );
    },
    [dispatch],
  );

  const handleLogout = useCallback(async () => {
    try {
      if (accessToken) {
        await apiClient.post('/auth/logout', { refreshToken: refreshToken ?? null });
      }
    } catch (e) {
      // ignore logout errors
    } finally {
      dispatch(signOut());
      await clearStoredAuthState();
      navigation.reset({ index: 0, routes: [{ name: ROUTES.MAIN as never }] });
    }
  }, [accessToken, dispatch, navigation, refreshToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken || (actor && userProfile)) return;
      setLoadingProfile(true);
      try {
        const { data } = await apiClient.get('/me');
        persistProfileIfNeeded({
          actor: data.actor,
          userProfile: data.userProfile,
          preferences: data.preferences,
          joinedClans: data.joinedClans,
        });
      } catch (error: any) {
        if (error?.response?.status === 401) {
          await handleLogout();
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [accessToken, actor, userProfile, persistProfileIfNeeded, handleLogout]);

  const renderInfoRow = (label: string, value?: string) => (
    <View style={styles.infoRow} key={label}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
  );

  return (
    <AppSafeArea>
      <AppHeader showProfileIcon={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={80} icon="account" style={styles.avatar} />
        </View>

        <View style={styles.tabRow}>
          {['MY INFO', 'MY POINTS', 'MY ACTIVITY', 'CHARGE'].map((label, index) => (
            <Text key={label} style={[styles.tabLabel, index === 0 && styles.activeTabLabel]}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONAL INFO</Text>
          <Divider style={styles.sectionDivider} />
          {renderInfoRow('ID', actor?.id)}
          {renderInfoRow('E-mail', actor?.email)}
          {renderInfoRow('Country', userProfile?.countryName)}
          {renderInfoRow('Birth Date', userProfile?.birthDate)}
          {renderInfoRow('Gender', userProfile?.genderLabel)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          <Divider style={styles.sectionDivider} />
          <View style={styles.settingRow}>
            <Text style={styles.infoLabel}>PUSH notices</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.infoLabel}>SNS notices</Text>
            <Switch value={snsEnabled} onValueChange={setSnsEnabled} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.preferencesHeader}>
            <Text style={styles.sectionTitle}>PREFERENCES</Text>
            <Text style={styles.editText}>Edit</Text>
          </View>
          <Divider style={styles.sectionDivider} />
          <View style={styles.chipsRow}>
            {preferenceOptions.map((tag) => (
              <Chip
                key={tag}
                mode={selectedTags.includes(tag) ? 'flat' : 'outlined'}
                style={[styles.chip, selectedTags.includes(tag) ? styles.chipActive : styles.chipInactive]}
                textStyle={selectedTags.includes(tag) ? styles.chipActiveText : styles.chipText}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </View>

        <Button mode="contained" onPress={handleLogout} style={styles.signOut} disabled={loadingProfile}>
          Sign Out
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
    flexGrow: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#1F2937',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabLabel: {
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: 12,
  },
  activeTabLabel: {
    color: '#F9FAFB',
  },
  section: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#F9FAFB',
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionDivider: {
    marginVertical: 8,
    backgroundColor: '#1F2937',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#9CA3AF',
  },
  infoValue: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editText: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginVertical: 4,
  },
  chipActive: {
    backgroundColor: '#F59E0B',
  },
  chipInactive: {
    borderColor: '#374151',
  },
  chipActiveText: {
    color: '#111827',
    fontWeight: '700',
  },
  chipText: {
    color: '#F9FAFB',
  },
  signOut: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default MyPageScreen;
