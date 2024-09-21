import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../components/Header';
import Input from '../components/Input';
import { colors, styles } from '../components/StyleHelper';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartScreen({ appName, onRegister, userInfo }) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
    }
  }, [userInfo]);

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
      const userData = { name, email, phone };
      onRegister(userData);
    } else {
      Alert.alert('Please check the form for errors');
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Header name={appName} />
      </View>
      <View style={styles.formContainer}>
        <Input 
          label="Name"
          value={name}
          onChangeText={validateName}
          error={nameError}
          style={styles.input}
          labelStyle={styles.labelColor}
        />
        <Input
          label="Email address"
          value={email}
          onChangeText={validateEmail}
          error={emailError}
          keyboardType="email-address"
          style={styles.input}
          labelStyle={styles.labelColor}
        />
        <Input
          label="Phone Number"
          value={phone}
          onChangeText={validatePhone}
          error={phoneError}
          keyboardType="numeric"
          style={styles.input}
          labelStyle={styles.labelColor}
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
          <TouchableOpacity style={styles.button} onPress={resetInputs}>
            <Text style={styles.resetButton}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={!isChecked}
          >
            <Text style={styles.registerButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
