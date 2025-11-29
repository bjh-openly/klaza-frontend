import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, HelperText, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';
import { useSignupMutation } from '../../../services/authApi';
import AppSafeArea from '../../../components/layout/AppSafeArea';
import ModalCloseHeader from '../../../components/layout/ModalCloseHeader';

const options = ['drama', 'movie', 'webtoon', 'novels', 'romance', 'fantasy', 'comedy', 'horror', 'mystery', 'life', 'teens'];

const SignUpFavoritesScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_FAVORITES>> = ({
  navigation,
  route,
}) => {
  const { id, password, termsAgreed1, termsAgreed2, email, emailVerifySeq, country, birthDt, gender } = route.params;
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [signup, { isLoading }] = useSignupMutation();
  const canSelectMore = useMemo(() => selected.length < 3, [selected]);
  const canSubmit = selected.length <= 3 && selected.length > 0;

  const toggle = (item: string) => {
    setSelected((prev) => {
      if (prev.includes(item)) return prev.filter((v) => v !== item);
      if (!canSelectMore) return prev;
      return [...prev, item];
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Select up to 3 favorites.');
      return;
    }
    try {
      setError(null);
      await signup({
        id,
        password,
        email,
        emailVerifySeq,
        country,
        birthDt,
        gender,
        favorites: selected,
        termsAgreed1,
        termsAgreed2,
      }).unwrap();
      navigation.reset({ index: 0, routes: [{ name: ROUTES.SIGN_UP_DONE as never }] });
    } catch (e) {
      const code = (e as { data?: { code?: string } })?.data?.code as string | undefined;
      const message =
        code === 'EMAIL_NOT_VERIFIED'
          ? 'Please verify your e-mail again.'
          : code === 'TERMS_NOT_ACCEPTED'
            ? 'Please confirm both terms.'
            : code === 'PASSWORD_RULE_VIOLATION'
              ? 'Password does not meet the rules.'
              : 'Signup failed. Please review your info.';
      setError(message);
    }
  };

  return (
    <AppSafeArea>
      <ModalCloseHeader onCloseToRoot />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Choose your favs for a quick start.
        </Text>
        <View style={styles.chips}>
          {options.map((item) => (
            <Chip
              key={item}
              selected={selected.includes(item)}
              onPress={() => toggle(item)}
              style={[styles.chip, selected.includes(item) && styles.chipSelected]}
              showSelectedCheck={false}
              textStyle={styles.chipText}
              selectedColor="#F9FAFB"
            >
              {item}
            </Chip>
          ))}
        </View>
        {error && <HelperText type="error">{error}</HelperText>}
        <HelperText type={canSubmit ? 'info' : 'error'}>Pick up to 3 genres.</HelperText>
        <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={!canSubmit || isLoading}>
          Submit
        </Button>
      </ScrollView>
    </AppSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
  },
  title: {
    marginBottom: 12,
    color: '#F9FAFB',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#111827',
    borderColor: '#4B5563',
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: '#1F2937',
  },
  chipText: {
    color: '#E5E7EB',
  },
  button: {
    marginTop: 8,
  },
});

export default SignUpFavoritesScreen;
