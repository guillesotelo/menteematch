import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Dialog from 'react-native-dialog';
import useMode from '../../hooks/useMode';

const ModalEdit = ({ show, inputs, toggle, handleEdit, noteId }) => {
  const [title, settitle] = useState(inputs.title);
  const [note, setnote] = useState(inputs.note);
  const { mode } = useMode();

  return (
    <Dialog.Container
      contentStyle={{ backgroundColor: mode.bg }}
      visible={show}>
      <Dialog.Title style={{ color: mode.text }}>Edita tu nota!</Dialog.Title>
      <Text style={{ ...styles.titulo, color: mode.text }}>Titulo</Text>
      <Dialog.Input color={mode.text} value={title} onChangeText={settitle} />

      <Text style={{ ...styles.titulo, color: mode.text }}>Nota</Text>
      <Dialog.Input color={mode.text} value={note} onChangeText={setnote} />
      <Dialog.Button label="Cerrar" onPress={() => toggle()} />
      <Dialog.Button
        label="Editar"
        onPress={() => handleEdit(noteId, title, note) && toggle()}
      />
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  titulo: { paddingLeft: 10 },
});

export default ModalEdit;
