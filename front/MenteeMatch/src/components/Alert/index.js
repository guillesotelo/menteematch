import React from 'react';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import useMode from '../../hooks/useMode';

const ConfirmAlert = ({
  show,
  handleClose,
  handleConfirm,
  theme,
  title,
  subtitle,
}) => {
  const { mode } = useMode();
  return (
    <SCLAlert
      show={show}
      onRequestClose={handleClose}
      theme={theme}
      title={title}
      titleStyle={{
        color: mode.text,
      }}
      subtitleStyle={{
        color: mode.text,
      }}
      innerStyle={{
        backgroundColor: mode.bg,
      }}
      headerContainerStyles={{
        backgroundColor: mode.bg,
      }}
      subtitle={subtitle}>
      <SCLAlertButton
        theme="info"
        onPress={() => {
          handleConfirm();
          handleClose();
        }}>
        Confirmar
      </SCLAlertButton>
      <SCLAlertButton theme="default" onPress={handleClose}>
        Cancelar
      </SCLAlertButton>
    </SCLAlert>
  );
};

export default ConfirmAlert;
