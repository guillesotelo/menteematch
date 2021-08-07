import React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import useMode from '../../../../hooks/useMode';
import useAlert from '../../../../hooks/useAlert';
import userImg from '../../../../assets/static/user_img.png';
import { Alert } from '../../../../components';
import {
  sendNotification,
  setMenteeToMentor,
  setMentorToMentee,
} from '../../../../services/axiosServices';
import { deleteNotification } from '../../../../redux/Reducers/UserReducer';
import styles from '../styles';

const Solicitud = ({ item }) => {
  const { mode } = useMode();
  const { emisor, receptor } = item;
  const { user } = useSelector(state => state);
  const [showConfirm, handleCloseConfirm, handleOpenConfirm] = useAlert();
  const [showReject, handleCloseReject, handleOpenReject] = useAlert();

  const dispatch = useDispatch();

  const handleConfirmation = () => {
    try {
      (async function () {
        await Promise.all([
          setMentorToMentee(emisor._id, receptor, user.token),
          setMenteeToMentor(receptor, emisor._id, user.token),
          sendNotification(
            { receptor: emisor, type: 'confirmation' },
            user.token,
          ),
          sendNotification(
            {
              emisor: emisor._id,
              receptor: receptor,
              type: 'congratulations',
            },
            user.token,
          ),
        ]);
      })();

      dispatch(deleteNotification(item._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejection = () => {
    try {
      (async function () {
        await sendNotification(
          { receptor: emisor, type: 'rechazo' },
          user.token,
        );
      })();
      dispatch(deleteNotification(item._id));
    } catch (err) {
      console.log(err);
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
          }}>{`${emisor.name} ${emisor.surname} quiere ser tu mentor`}</Text>
      </View>
      <View style={styles.buttons}>
        <Icon
          onPress={handleOpenConfirm}
          name="check-circle"
          size={40}
          color={'#006606'}
        />
        <Icon
          onPress={handleOpenReject}
          name="times-circle"
          size={40}
          color={'#aa0000'}
        />
      </View>
      <Alert
        theme={'success'}
        title={'¡Perfecto!'}
        subtitle={`¿Quieres confirmar a ${emisor.name} ${emisor.surname} cómo tu mentor?`}
        show={showConfirm}
        handleClose={handleCloseConfirm}
        emisor={item.emisor}
        handleConfirm={handleConfirmation}
      />
      <Alert
        theme={'danger'}
        title={'¡Atención!'}
        subtitle={`¿Seguro que deseas rechazar a ${emisor.name} ${emisor.surname} cómo tu mentor?`}
        show={showReject}
        handleClose={handleCloseReject}
        emisor={item.emisor}
        handleConfirm={handleRejection}
      />
    </View>
  );
};

export default Solicitud;
