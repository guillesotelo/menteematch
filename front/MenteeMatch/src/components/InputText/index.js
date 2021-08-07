import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';
import useMode from '../../hooks/useMode';

const Input = props => {
  const { mode } = useMode();
  const { errors } = props;

  return (
    <TextInput
      style={
        errors
          ? styles.error
          : {
              ...styles.input,
              color: mode.text,
              borderColor: mode.text,
              backgroundColor: mode.inputBg,
            }
      }
      {...props}
      placeholderTextColor={mode.text}
    />
  );
};

export default Input;
