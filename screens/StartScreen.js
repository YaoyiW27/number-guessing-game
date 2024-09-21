import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../components/Header';
import Input from '../components/Input';
import colors from '../components/StyleHelper';
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
        />
        <Input
          label="Email address"
          value={email}
          onChangeText={validateEmail}
          error={emailError}
          keyboardType="email-address"
          style={styles.input}
        />
        <Input
          label="Phone Number"
          value={phone}
          onChangeText={validatePhone}
          error={phoneError}
          keyboardType="numeric"
          style={styles.input}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center', 
    marginTop: 30, 
  },
  formContainer: {
    width: '80%',
    padding: 15,
    backgroundColor: 'lightgray', 
    borderRadius: 10, 
    alignSelf: 'center', 
    marginTop: 40, 
    paddingVertical: 40, 
  },
  input: {
    borderWidth: 1.5, 
    borderBlockEndColor: 'black',
    borderLeftColor: 'lightgray',
    borderRightColor: 'lightgray',
    borderTopColor: 'lightgray',
    height: 40,
    margin: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});