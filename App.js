import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';

export default function App() {
  const appName = 'Welcome';

  return (
    <SafeAreaView style={styles.container}>
      <StartScreen appName={appName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});