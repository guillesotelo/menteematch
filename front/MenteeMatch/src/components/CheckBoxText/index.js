import React from 'react';
import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useMode from '../../hooks/useMode';

import styles from './styles';

function ChecKBoxText({ text, isChecked, onPress }) {
  const { mode } = useMode();
  
  return (
    <View style={styles.optionContainer}>
      <BouncyCheckbox
        text={text}
        fillColor={mode.green}
        iconStyle={{ borderColor: mode.green }}
        textContainerStyle={{
          ...styles.option,
          borderColor: mode.green,
          backgroundColor: mode.bg,
        }}
        textStyle={{
          ...styles.text,
          color: mode.text,
        }}
        disableBuiltInState
        isChecked={isChecked}
        onPress={onPress}
      />
    </View>
  );
}

export default ChecKBoxText;
