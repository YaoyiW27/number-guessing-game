import React from 'react';
import { View, TextInput } from 'react-native';
import Text from './Text';
import { styles } from '../styles/StyleHelper';

export default function Input({
  label,
  value,
  onChangeText,
  labelStyle,
  error,
  style,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}