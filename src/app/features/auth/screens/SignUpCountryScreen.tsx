import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Menu, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

type SignUpCountryScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof ROUTES.SIGN_UP_COUNTRY
>;

const COUNTRIES = [
  { code: 'KR', name: 'South Korea' },
  { code: 'US', name: 'United States' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'TH', name: 'Thailand' },
];

const SignUpCountryScreen: React.FC<SignUpCountryScreenProps> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState<string>('KR');
  const [menuVisible, setMenuVisible] = useState(false);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((country) => country.code === countryCode)?.name ?? 'Select country',
    [countryCode],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Select your country
      </Text>
      <View style={styles.menuContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMenuVisible(true)}>
              {selectedCountry}
            </Button>
          }
        >
          {COUNTRIES.map((country) => (
            <Menu.Item
              key={country.code}
              onPress={() => {
                setCountryCode(country.code);
                setMenuVisible(false);
              }}
              title={country.name}
            />
          ))}
        </Menu>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(ROUTES.SIGN_UP_BIRTH)}
        style={styles.button}
      >
        Next
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
  menuContainer: {
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 24,
  },
});

export default SignUpCountryScreen;
