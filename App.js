import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = 'Welcome'
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.topView}>
          <Header name={appName}></Header>
          <Input
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  }
});
