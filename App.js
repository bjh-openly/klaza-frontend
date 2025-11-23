import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';

export default function App() {
  const greeting = useMemo(() => 'Welcome to the new klaza mobile experience!', []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>klaza-frontend</Text>
        <Text style={styles.subtitle}>{greeting}</Text>
        <Text style={styles.body}>
          This project is built with React Native on Expo. Start by running
          <Text style={styles.bold}> npm start</Text> to launch the Metro bundler, then open the
          Expo Go app or a simulator to view the project.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#334155',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#475569',
  },
  bold: {
    fontWeight: '700',
  },
});
