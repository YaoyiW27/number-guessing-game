import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, Alert } from 'react-native';
import { colors } from '../components/StyleHelper';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../components/StyleHelper';

export default function GameScreen({ userInfo, onRestart }) {
  const [gameState, setGameState] = useState('start');
  const [secretNumber, setSecretNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [lastGuess, setLastGuess] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const generateSecretNumber = () => {
    if (userInfo) {
      const lastDigit = parseInt(userInfo.phone.slice(-1));
      const multiples = [];

      for (let i = lastDigit; i <= 100; i += lastDigit) {
        multiples.push(i);
      }

      const randomIndex = Math.floor(Math.random() * multiples.length);
      setSecretNumber(multiples[randomIndex]);
    }
  };

  useEffect(() => {
    generateSecretNumber();
  }, [userInfo]);

  useEffect(() => {
    let timer;
    if (
      (gameState === 'guessing' || gameState === 'guessedWrong') &&
      timeLeft > 0
    ) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setGameState('lose');
      setGameOverMessage('You are out of time');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleUseHint = () => {
    const hint = secretNumber % 2 === 0 ? 'even' : 'odd';
    Alert.alert('Hint', `The number is ${hint}.`);
    setHintUsed(true);
  };

  const handleSubmitGuess = () => {
    const userGuessNumber = parseInt(userGuess);

    if (
      isNaN(userGuessNumber) ||
      userGuessNumber < 1 ||
      userGuessNumber > 100
    ) {
      Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
      setUserGuess('');
      return;
    }

    setLastGuess(userGuessNumber);

    if (userGuessNumber === secretNumber) {
      setGameState('win');
    } else {
      const remainingAttempts = attemptsLeft - 1;
      setAttemptsLeft(remainingAttempts);

      if (remainingAttempts === 0) {
        setGameState('lose');
        setGameOverMessage('You are out of attempts');
      } else {
        setGameState('guessedWrong');
      }
    }

    setUserGuess('');
  };

  const handleNewGame = () => {
    setGameState('start');
    setUserGuess('');
    setAttemptsLeft(4);
    setTimeLeft(60);
    setHintUsed(false);
    setGameOverMessage('');
    generateSecretNumber();
  };

  const startCard = () => (
    <View style={styles.gameCard}>
      <Text style={styles.gameText}>
        Guess a number between 1 & 100 that is a multiple of{' '}
        {userInfo.phone.slice(-1)}
      </Text>
      <Button title="Start" onPress={() => setGameState('guessing')} />
    </View>
  );

  const guessingCard = () => (
    <View style={styles.gameCard}>
      <Text style={styles.gameText}>
        Guess a number between 1 & 100 that is multiply of{' '}
        {userInfo.phone.slice(-1)}
      </Text>
      <TextInput
        style={styles.gameInput}
        value={userGuess}
        onChangeText={setUserGuess}
        keyboardType="numeric"
      />
      <Text style={styles.grayText}>Attempts left: {attemptsLeft}</Text>
      <Text style={styles.grayText}>Timer: {timeLeft}s</Text>
      <View style={styles.gameButtonContainer}>
        <Button
          title="Use a Hint"
          onPress={handleUseHint}
          disabled={hintUsed}
        />
        <Button title="Submit Guess" onPress={handleSubmitGuess} />
      </View>
    </View>
  );

  const guessedWrongCard = () => (
    <View style={styles.gameCard}>
      <Text style={styles.gameText}>
        You did not guess correct! 
        You should guess {lastGuess > secretNumber ? 'lower' : 'higher'}!
      </Text>
      <View style={styles.gameButtonContainer}>
        <Button title="Try Again" onPress={() => setGameState('guessing')} />
        <Button title="End the Game" onPress={() => setGameState('lose')} />
      </View>
    </View>
  );

  const winCard = () => (
    <View style={styles.gameCard}>
      <Text style={styles.gameText}>You guessed correct!</Text>
      <Text style={styles.gameText}>Attempts used: {4 - attemptsLeft}</Text>
      <Image
        source={{ uri: `https://picsum.photos/id/${secretNumber}/100/100` }}
        style={styles.resultImage}
      />
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );

  const loseCard = () => (
    <View style={styles.gameCard}>
      <Text style={styles.gameText}>The game is over!</Text>
      <Image
        source={require('../assets/sad_face.jpg')}
        style={styles.resultImage}
      />
      <Text style={styles.gameText}>{gameOverMessage}</Text>
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );

  const gameContent = () => {
    switch (gameState) {
      case 'start':
        return startCard();
      case 'guessing':
        return guessingCard();
      case 'guessedWrong':
        return guessedWrongCard();
      case 'win':
        return winCard();
      case 'lose':
        return loseCard();
      default:
        return <Text>Invalid Game State</Text>;
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.gamContainer}>
      <View style={styles.gamContainer}>
        <View style={styles.restartButton}>
          <Button title="Restart" onPress={onRestart} />
        </View>
        {gameContent()}
      </View>
    </LinearGradient>
  );
}
