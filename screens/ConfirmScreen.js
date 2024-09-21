import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';

export default function ConfirmScreen({ visible, userInfo, onEdit, onContinue }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.card}>
          {userInfo && (
            <>
              <Text style={styles.infoText}>Hello {userInfo.name}</Text>
              <Text style={styles.infoText}>Here is the information you entered:</Text>
              <Text style={styles.infoText}>{userInfo.email}</Text>
              <Text style={styles.infoText}>{userInfo.phone}</Text>
              <Text style={styles.infoText}>If it is not correct, please go back and edit them.</Text>
            </>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Go back" onPress={onEdit} />
            <Button title="Continue" onPress={onContinue} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgary',
  },
  infoText: {
    color: 'blue',
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});