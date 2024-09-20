import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({ name }) {
  return (
    <View>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      color: 'blue',
      fontSize: 21,
      padding: 5,
      marginBottom: 10,
    },
  });