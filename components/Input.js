import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { styles } from './StyleHelper';

export default function Input({ label, value, onChangeText, labelStyle, error, ...props }) {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
