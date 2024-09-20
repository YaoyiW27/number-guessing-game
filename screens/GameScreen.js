import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';

export default function GameScreen({ userInfo, onRestart }) {
  const [targetNumber, setTargetNumber] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [feedback, setFeedback] = useState(''); 
  const [showFeedback, setShowFeedback] = useState(false); 
  const [gameResult, setGameResult] = useState(null); 

  const handleUseHint = () => {
    // later
  };
  
  const handleSubmitGuess = () => {
    const userGuess = parseInt(guess);
  
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
      return;
    }
    setAttemptsLeft((prevAttempts) => prevAttempts - 1);
    if (userGuess === targetNumber) {
      setGameResult('won');
    } else {
      setFeedback(userGuess > targetNumber ? 'lower' : 'higher');
      setShowFeedback(true);
    }
    setGuess('');
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    if (attemptsLeft === 0) {
      setGameResult('lost');
    }
  };
  
  const handleEndGame = () => {
    setGameResult('lost');
    setShowFeedback(false);
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

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(timer);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      // later
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  return (
    <View style={styles.container}>
        {!gameStarted ? (
          <>
            <Text style={styles.text}>
                Guess a number between 1 & 100 that is multiply of {userInfo.phone.slice(-1)}.
            </Text>
            <Button title="Start" onPress={() => setGameStarted(true)} />
          </>
        ) : (
          <Text>Game Started!</Text>
        )}
        {gameStarted && (
          <View style={styles.gameContainer}>
            <Text>Attempts left: {attemptsLeft}</Text>
            <Text>Timer: {timeLeft}s</Text>
            <TextInput
              style={styles.input}
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              placeholder="Enter your guess"
            />
            <View style={styles.buttonContainer}>
              <Button
                  title="Use a hint"
                  onPress={handleUseHint}
                  disabled={hintUsed}
              />
              <Button title="Submit guess" onPress={handleSubmitGuess} />
            </View>
          </View>
        )}
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>
              Your guess is too {feedback}! Try again.
            </Text>
          <View style={styles.buttonContainer}>
            <Button title="Try Again" onPress={handleTryAgain} />
            <Button title="End Game" onPress={handleEndGame} />
          </View>
          </View>
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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  gameContainer: {
    marginTop: 20,
  },
  input: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});