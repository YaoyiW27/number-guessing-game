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

  return (
    <SafeAreaView style={styles.container}>
      <StartScreen 
        appName={appName} 
        onRegister={handleRegister} 
        userInfo={userInfo} />
      {showConfirm && (
        <ConfirmScreen 
          userInfo={userInfo}
          onEdit={() => setShowConfirm(false)} 
          onContinue={() => {
            setShowConfirm(false);
            // game logic here
          }} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});