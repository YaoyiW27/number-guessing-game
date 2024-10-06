import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from './Text';
import { styles } from '../styles/StyleHelper';

export default function Button({ onPress, title, style, textStyle, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}