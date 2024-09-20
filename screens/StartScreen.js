import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../components/Header';
import Input from '../components/Input';

export default function StartScreen({ appName }) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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

  const validatePhone = (text) => {
    if (!/^\d{10}$/.test(text) || /[01]/.test(text.slice(-1))) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
    setPhone(text);
  };

  const resetInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  const handleRegister = () => {
    if (!nameError && !emailError && !phoneError && name && email && phone) {
      Alert.alert('Registration successful');
    } else {
      Alert.alert('Please check the form for errors');
    }
  };

  return (
    <View style={styles.container}>
      <Header name={appName} />
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
      <Input
        label="Phone"
        value={phone}
        onChangeText={validatePhone}
        error={phoneError}
        keyboardType="numeric"
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={styles.label}>I am not a robot</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={resetInputs} />
        <Button
          title="Register"
          onPress={handleRegister}
          disabled={!isChecked}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});