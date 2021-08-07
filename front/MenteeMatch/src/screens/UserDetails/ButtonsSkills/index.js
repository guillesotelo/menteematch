import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ButtonSkills = ({
  mode,
  user,
  learn,
  teach,
  handleLearn,
  handleTeach,
}) => {
  return (
    <View style={styles.optionsContainer}>
      {user.isMentee && (
        <TouchableOpacity onPress={handleLearn}>
          <Text
            style={[
              {
                ...styles.btns_title,
                color: mode.text,
                backgroundColor: mode.green,
              },
              !learn && styles.selectedSkills,
            ]}>
            Habilidades A Aprender
          </Text>
        </TouchableOpacity>
      )}

      {user.isMentor && (
        <TouchableOpacity onPress={handleTeach}>
          <Text
            style={[
              {
                ...styles.btns_title,
                color: mode.text,
                backgroundColor: mode.green,
              },
              !teach && styles.selectedSkills,
            ]}>
            Habilidades A Enseñar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ButtonSkills;
