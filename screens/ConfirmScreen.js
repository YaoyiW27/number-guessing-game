import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, colors } from '../components/StyleHelper'; 

export default function ConfirmScreen({ visible, userInfo, onEdit, onContinue }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      {/* Apply a semi-transparent gradient background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={[styles.modalBackground, { opacity: 0.9 }]} 
      >
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
      </LinearGradient>
    </Modal>
  );
}