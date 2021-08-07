import React from 'react';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useMode from '../../hooks/useMode';

const AlertDelete = ({ show, toggle, handleDelete, noteId }) => {
  const { mode } = useMode()
  return (
    <SCLAlert
      show={show}
      onRequestClose={toggle}
      theme="danger"
      title="Atencion!"
      subtitle="Estas por eliminar una nota"
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
      headerIconComponent={
        <Ionicons name="alert-outline" size={32} color="white" />
      }>
      <SCLAlertButton
        theme="info"
        onPress={() => handleDelete(noteId) && toggle()}>
        Eliminar
      </SCLAlertButton>
      <SCLAlertButton theme="default" onPress={() => toggle()}>
        Cancelar
      </SCLAlertButton>
    </SCLAlert>
  );
};

export default AlertDelete;
