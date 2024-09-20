import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome'
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateName = (text) => {
    if (/\d/.test(text) || text.length <= 1) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
    setName(text);
  };

  const validateEmail = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.topView}>
          <Header name={appName}></Header>
          <Input
            label="Name"
            value={name}
            onChangeText={validateName}
            error={nameError}
          />
          <Input
            label="Email" 
            value={email}
            onChangeText={validateEmail}
            error={emailError}
            keyboardType="email-address"
          />
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  }
});
