import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const ToolTipModal = ({ visible, handleClose }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      transparent={true}
      animationType="slide">
      <View style={styles.mainContainer}>
        <Icon
          style={styles.iconContainer}
          onPress={handleClose}
          name="close-outline"
          size={40}
          color={'#F5F6F7'}
        />
        <View style={styles.msgContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Para confirmar tu elección podés hacer click en el botón de la
              esquina superior derecha.
            </Text>
            <View style={styles.flecha} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.likeButton}
              title={'✔'}
              onPress={handleClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ToolTipModal;
