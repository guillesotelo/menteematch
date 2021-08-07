import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../redux/Reducers/UserReducer';
import { Button, CheckBoxText } from '../../components';
import useMode from '../../hooks/useMode';
import styles from './styles';

const RoleSelection = ({ navigation }) => {
  const [boxUno, setBoxUno] = useState(false);
  const [boxDos, setBoxDos] = useState(false);
  const [boxTres, setBoxTres] = useState(false);
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const { mode } = useMode();

  const handleMenteeOp = () => {
    if (!boxUno) {
      setBoxUno(true);
      setBoxDos(false);
      setBoxTres(false);
      setRole('mentee');
    }
  };

  const handleMentorOp = () => {
    if (!boxDos) {
      setBoxDos(true);
      setBoxUno(false);
      setBoxTres(false);
      setRole('mentor');
    }
  };

  const handleBoth = () => {
    if (!boxTres) {
      setBoxTres(true);
      setBoxDos(false);
      setBoxUno(false);
      setRole('ambos');
    }
  };

  const confirmOption = () => {
    if (role === 'ambos') {
      dispatch(
        updateUser({
          url: '/api/users/profile',
          data: { isMentor: true, isMentee: true, actualRole: 'Mentor' },
        }),
      ).then(() => navigation.navigate('SelectSkills'));
    } else {
      dispatch(updateUser({ url: `/api/users/${role}`, data: {} })).then(() =>
        navigation.navigate('SelectSkills'),
      );
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: mode.bg }}>
      <Text style={{ ...styles.text, color: mode.text }}>
        {'Quiero ser...'}
      </Text>

      <View
        style={{
          ...styles.select_container,
          backgroundColor: mode.inputBg,
        }}>
        <CheckBoxText
          mode={mode}
          text="Mentee"
          isChecked={boxUno}
          onPress={handleMenteeOp}
        />
        <CheckBoxText
          mode={mode}
          text="Mentor"
          isChecked={boxDos}
          onPress={handleMentorOp}
        />
        <CheckBoxText
          mode={mode}
          text="Ambos"
          isChecked={boxTres}
          onPress={handleBoth}
        />
      </View>

      <Button title="Siguiente" pressFunction={confirmOption} />
    </View>
  );
};

export default RoleSelection;
