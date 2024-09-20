import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GameScreen({ userInfo, onRestart }) {
  const [targetNumber, setTargetNumber] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(60);
    setAttemptsLeft(4);
    startTimer();
  };

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
      {!gameStarted ? (
        <>
          <Text style={styles.text}>
            Guess a number between 1 and 100 that is multiply of {userInfo.phone.slice(-1)} 
          </Text>
          <Button title="Start" onPress={startGame} />
        </>
      ) : (
        // page after
        <View>{/* Game components */}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 20,
  },
});