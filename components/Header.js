import React from 'react';
import Text from './Text';
import { View } from 'react-native';
import { styles } from '../styles/StyleHelper';

export default function Header({ name }) {
  return (
    <View>
      <Text style={styles.header}>{name}</Text>
    </View>
  );
}