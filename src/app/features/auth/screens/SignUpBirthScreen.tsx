import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../config/constants';

const SignUpBirthScreen: React.FC<NativeStackScreenProps<AuthStackParamList, typeof ROUTES.SIGN_UP_BIRTH>> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall">Select your birth date</Text>
      <DatePicker date={date} mode="date" onDateChange={setDate} androidVariant="iosClone" />
      <Button mode="contained" onPress={() => navigation.navigate(ROUTES.SIGN_UP_FAVORITES)} style={styles.button}>
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SignUpBirthScreen;
