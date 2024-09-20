import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const appName = 'Welcome';
  const [userInfo, setUserInfo] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = (userInfo) => {
    setUserInfo(userInfo);
    setShowConfirm(true);
  };

  const handleEdit = () => {
    setShowConfirm(false);
  };

  const handleContinue = () => {
    setShowConfirm(false);
    // Continue to the game screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StartScreen 
        appName={appName} 
        onRegister={handleRegister} 
        userInfo={userInfo} />
      {showConfirm && (
        <ConfirmScreen 
          userInfo={userInfo}
          onEdit={handleEdit} 
          onContinue={handleContinue} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});