import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GameScreen({ userInfo, onRestart }) {
  const [targetNumber, setTargetNumber] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const lastDigit = parseInt(userInfo.phone.slice(-1));
      const multiples = [];
  
      for (let i = lastDigit; i <= 100; i += lastDigit) {
        multiples.push(i);
      }
  
      const randomIndex = Math.floor(Math.random() * multiples.length);
      setTargetNumber(multiples[randomIndex]);
    }
  }, [userInfo]);

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
});