import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../../../config/constants';
import { AuthStackParamList } from '../../../navigation/types';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.AUTH_GATE>;

const AuthLandingScreen: React.FC<Props> = ({ navigation, route }) => {
  const redirect = route.params?.redirect ?? null;

  return (
    <AppSafeArea>
      <View style={styles.background}>
        <ModalCloseHeader onCloseToRoot />
        <View style={styles.overlay}>
          <View style={styles.logoRow}>
            <Text variant="displaySmall" style={styles.logoText}>
              KLAZA<Text style={styles.logoAccent}>Hub</Text>
            </Text>
            <Text variant="titleMedium" style={styles.tagline}>
              Share the Story™
            </Text>
          </View>

          <View style={styles.actions}>
            <Button
              mode="outlined"
              textColor="#fff"
              style={styles.button}
              onPress={() => navigation.navigate(ROUTES.SIGN_UP_TERMS)}
            >
              Create account
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate(ROUTES.SIGN_IN, { redirect })}
            >
              Sign in
            </Button>
            <Text style={styles.helperText}>
              Private Policy and Cookies Policy.
            </Text>
          </View>
        </View>
      </View>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
    justifyContent: 'space-between',
  },
  logoRow: {
    marginTop: 24,
  },
  logoText: {
    color: '#fff',
    letterSpacing: 1.5,
  },
  logoAccent: {
    color: '#f59e0b',
  },
  tagline: {
    color: '#e5e7eb',
    marginTop: 4,
  },
  actions: {
    marginBottom: 24,
    gap: 12,
  },
  button: {
    borderColor: '#fff',
  },
  helperText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default AuthLandingScreen;
