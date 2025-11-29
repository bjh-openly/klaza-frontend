import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import AppSafeArea from '../../../components/layout/AppSafeArea';

const SignUpDoneScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_DONE>> = ({
  navigation,
}) => {
  return (
    <AppSafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Yay! Now you're one of us!
        </Text>
        <Text style={styles.subtitle}>Welcome to KLAZA Hub. Jump right into discovery.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: ROUTES.SIGN_IN as never }] })}
          style={styles.button}
        >
          Start >>
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: '#F9FAFB',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#9CA3AF',
  },
  button: {
    alignSelf: 'center',
  },
});

export default SignUpDoneScreen;
