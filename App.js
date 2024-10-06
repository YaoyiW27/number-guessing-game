import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const appName = 'Welcome';
  const [userInfo, setUserInfo] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRegister = (userInfo) => {
    setUserInfo(userInfo);
    setShowConfirm(true);
  };

  const handleEdit = () => {
    setShowConfirm(false);
  };

  const handleContinue = () => {
    setShowConfirm(false);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setUserInfo(null);
    setGameStarted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {gameStarted ? (
        <GameScreen userInfo={userInfo} onRestart={handleRestart} />
      ) : (
        <>
          <StartScreen
            appName={appName}
            onRegister={handleRegister}
            userInfo={userInfo}
          />
          <ConfirmScreen
            visible={showConfirm}
            userInfo={userInfo}
            onEdit={handleEdit}
            onContinue={handleContinue}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});