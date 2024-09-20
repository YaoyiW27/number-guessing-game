import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, value, onChangeText, error, ...props }) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  errorText: {
    color: 'gray',
    fontSize: 12,
  },
});