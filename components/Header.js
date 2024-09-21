import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './StyleHelper'

export default function Header({ name }) {
  return (
    <View>
      <Text style={styles.header}>{name}</Text>
    </View>
  )
}
