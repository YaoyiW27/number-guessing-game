import React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ children, style, ...props }) {
  return (
    <RNText style={style} {...props}>
      {children}
    </RNText>
  );
}