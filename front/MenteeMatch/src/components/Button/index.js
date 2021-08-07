import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import useMode from '../../hooks/useMode';

const Button = props => {
  const { mode } = useMode();

  const { title, pressFunction, style } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          ...styles.button,
          borderColor: mode.grey,
          backgroundColor: mode.green,
          justifyContent: "center"
        },
        style,
      ]}
      title={title}
      onPress={pressFunction}>
      {props.icon ? (
        props.icon
      ) : (
        <Text style={{ ...styles.buttonText, color: mode.text }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
