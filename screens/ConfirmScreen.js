import React from 'react';
import { View, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, colors } from '../styles/StyleHelper';
import Button from '../components/Button';
import Text from '../components/Text';
import Card from '../components/Card';

export default function ConfirmScreen({ visible, userInfo, onEdit, onContinue }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={[styles.modalBackground, { opacity: 0.9 }]}
      >
        <Card style={styles.card}>
          {userInfo && (
            <>
              <Text style={styles.infoText}>Hello {userInfo.name}</Text>
              <Text style={styles.infoText}>Here is the information you entered:</Text>
              <Text style={styles.infoText}>{userInfo.email}</Text>
              <Text style={styles.infoText}>{userInfo.phone}</Text>
              <Text style={styles.infoText}>
                If it is not correct, please go back and edit them.
              </Text>
            </>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Go Back"
              onPress={onEdit}
              textStyle={styles.gobackButton}
            />
            <Button
              title="Continue"
              onPress={onContinue}
              textStyle={styles.continueButton}
            />
          </View>
        </Card>
      </LinearGradient>
    </Modal>
  );
}