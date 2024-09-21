import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

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
            <TouchableOpacity style={styles.button} onPress={onEdit}>
              <Text style={styles.gobackButton}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onContinue}>
              <Text style={styles.continueButton}>Continue</Text>
            </TouchableOpacity>
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
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    alignItems: 'left',
    justifyContent: 'center',
  },
  infoText: {
    color: 'blue',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  gobackButton: {
    color: 'red',
    fontSize: 16,
  },
  continueButton: {
    color: 'blue',
    fontSize: 16,
  },
});