import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import useMode from '../../../../hooks/useMode';
import { deleteNotification } from '../../../../redux/Reducers/UserReducer';
import userImg from '../../../../assets/static/user_img.png';
import styles from '../styles';

const Information = ({ item }) => {
  const { mode } = useMode();
  const { emisor } = item;
  const dispatch = useDispatch();

  const handleSeen = () => {
    dispatch(deleteNotification(item._id));
  };

  const message = () => {
    if (item.type === 'confirmation') {
      return `${emisor.name} ${emisor.surname} ha aceptado tu solicitud como mentor. ¡¡Felicidades!!`;
    } else if (item.type === 'rechazo') {
      return `${emisor.name} ${emisor.surname} ha rechazado tu solicitud.`;
    } else if (item.type === 'asignacion') {
      return `¡Felicitaciones!. ${emisor.name} ${emisor.surname} te ha elegido como mentor.`;
    } else if (item.type === 'information') {
      return `Has invitado a ${emisor.name} ${emisor.surname} a ser tu mentee`;
    } else if (item.type === 'congratulations') {
      return `¡Felicitaciones!. Has seleccionado a ${emisor.name} ${emisor.surname} cómo tu mentor`;
    } else if (item.type === 'reunion') {
      return `Tu mentor ${emisor.name} ${emisor.surname} ha creado una nueva reunión`;
    } else if (item.type === 'objective') {
      return `Tu mentor ${emisor.name} ${emisor.surname} te ha asignado un nuevo objetivo`;
    } 
  };
  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: mode.inputBg,
      }}>
      <View style={styles.imgContainer}>
        <Image
          style={{ ...styles.img, borderColor: mode.violet }}
          source={emisor.img ? { uri: emisor.img } : userImg}
        />
      </View>
      <View style={styles.message}>
        <Text
          style={{
            color: mode.text,
          }}>
          {message()}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Icon
          onPress={handleSeen}
          name="check-circle"
          size={40}
          color={'#006606'}
        />
      </View>
    </View>
  );
};

export default Information;
