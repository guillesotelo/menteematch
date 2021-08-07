import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Card, Button, Icon } from 'react-native-elements';
import AlertDelete from './AlertDelete';
import ModalEdit from './ModalEdit';
import useMode from '../../hooks/useMode';

export default function CardComponent({ mentee, functions, userToken, notes }) {
  const { handleAdd, handleEdit, handleDelete } = functions;
  const menteeId = mentee._id;
  const [note, setnote] = useState('');
  const [title, settitle] = useState('');
  const { mode } = useMode();

  // delete alert
  const [showAlert, setshowAlert] = useState(false);
  const toggle = () => setshowAlert(!showAlert);

  //editModal
  const [showModal, setshowModal] = useState(false);
  const toggleModal = () => setshowModal(!showModal);

  return (
    <ScrollView style={{ backgroundColor: mode.bg }}>
      <Card containerStyle={{ backgroundColor: mode.bg, borderColor: mode.bg }}>
        <Card.Title
          style={{
            color: mode.text,
          }}>{`${mentee.name} ${mentee.surname}`}</Card.Title>

        <Input
          style={{ color: mode.text }}
          placeholder="Titulo..."
          leftIcon={<Icon name="edit" size={20} color="black" />}
          onChangeText={settitle}
        />
        <Input
          style={{ color: mode.text }}
          placeholder="Nota..."
          leftIcon={<Icon name="edit" size={20} color="black" />}
          onChangeText={setnote}
        />

        <Button
          title="Agregar notas"
          buttonStyle={{ backgroundColor: mode.green }}
          onPress={() =>
            handleAdd(userToken, menteeId, {
              description: note,
              title: title,
            })
          }
        />

        <Card.Divider />
        {notes.map((u, i) => {
          return (
            <View key={i} style={styles.card}>
              <Text style={{ ...styles.title, color: mode.text }}>
                {u.title}
              </Text>
              <Text style={{ ...styles.note, color: mode.text }}>
                - {u.description}
              </Text>
              <Card.Divider />
              <View style={styles.direction}>
                <Button
                  icon={<Icon name="edit" color="#ffffff" />}
                  buttonStyle={{ ...styles.btns, backgroundColor: mode.green }}
                  onPress={() => toggleModal()}
                />

                <ModalEdit
                  handleEdit={handleEdit}
                  show={showModal}
                  inputs={{ title: u.title, note: u.description }}
                  toggle={toggleModal}
                  noteId={u._id}
                />

                <Button
                  icon={<Icon name="delete" color="#ffffff" />}
                  buttonStyle={{ ...styles.btns, backgroundColor: mode.green }}
                  onPress={() => toggle()}
                />
                <AlertDelete
                  show={showAlert}
                  toggle={toggle}
                  handleDelete={handleDelete}
                  noteId={u._id}
                />
              </View>
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    display: 'flex',
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 15,
  },
  note: {
    fontSize: 17,
  },
  btns: {
    width: 100,
  },
  direction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
