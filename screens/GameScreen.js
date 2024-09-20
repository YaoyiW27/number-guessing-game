import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Alert,
} from 'react-native';

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
      setGameOverMessage('Time is up!');
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

  const renderStartCard = () => (
    <View style={styles.card}>
      <Text style={styles.text}>
        Guess a number between 1 & 100 that is multiply
        of {userInfo.phone.slice(-1)}
      </Text>
      <Button title="Start Game" onPress={() => setGameState('guessing')} />
    </View>
  );

  const renderGuessingCard = () => (
    <View style={styles.card}>
      <Text style={styles.text}>Attempts left: {attemptsLeft}</Text>
      <Text style={styles.text}>Timer: {timeLeft}s</Text>
      <TextInput
        style={styles.input}
        value={userGuess}
        onChangeText={setUserGuess}
        keyboardType="numeric"
        placeholder="Enter your guess"
      />
      <View style={styles.buttonContainer}>
        <Button title="Use a Hint" onPress={handleUseHint} disabled={hintUsed} />
        <Button title="Submit Guess" onPress={handleSubmitGuess} />
      </View>
    </View>
  );

  const renderGuessedWrongCard = () => (
    <View style={styles.card}>
      <Text style={styles.text}>
        Your guess is too {lastGuess > secretNumber ? 'high' : 'low'}!
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Try Again" onPress={() => setGameState('guessing')} />
        <Button title="End Game" onPress={() => setGameState('lose')} />
      </View>
    </View>
  );

  const renderWinCard = () => (
    <View style={styles.card}>
      <Text style={styles.text}>You guessed correct!</Text>
      <Text style={styles.text}>Attempts used: {4 - attemptsLeft}</Text>
      <Image
        source={{ uri: `https://picsum.photos/id/${secretNumber}/100/100` }}
        style={styles.resultImage}
      />
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );

  const renderLoseCard = () => (
    <View style={styles.card}>
      <Text style={styles.text}>The game is over!</Text>
      <Image
        source={require('../assets/sad_face.jpg')} 
        style={styles.resultImage}
      />
      <Text style={styles.text}>{gameOverMessage}</Text>
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );

  const renderGameContent = () => {
    switch (gameState) {
      case 'start':
        return renderStartCard();
      case 'guessing':
        return renderGuessingCard();
      case 'guessedWrong':
        return renderGuessedWrongCard();
      case 'win':
        return renderWinCard();
      case 'lose':
        return renderLoseCard();
      default:
        return <Text>Invalid Game State</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end' }}>
        <Button title="Restart" onPress={onRestart} />
      </View>
      {renderGameContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  resultImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});