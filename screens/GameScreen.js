import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function GameScreen({ userInfo, onRestart }) {
  return (
    <View style={styles.container}>
      {/* later */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});