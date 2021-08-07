import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import { getSkills } from '../../redux/Reducers/Skills';
import { simpleMessage } from '../../utils';
import styles from './styles';
import { updateUser } from '../../redux/Reducers/UserReducer';
import { login } from '../../redux/Slices/authSlice';
import useMode from '../../hooks/useMode';

const SelectSkills = () => {
  const dispatch = useDispatch();
  const { user, skills } = useSelector(state => state);
  const [buttonsStyle, setButtonsStyle] = useState({});
  const [selection, setSelection] = useState([]);
  const [menteesQty, setMenteesQty] = useState(1);
  const { mode } = useMode();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleNext = () => {
    if (selection.length < 5) {
      return simpleMessage(
        '¡Atención!',
        'Debes seleccionar al menos 5 habilidades',
        'warning',
      );
    }
    const [property, learnOrTeach] =
      (!user.isMentor && user.isMentee) || user.skillsToTeach.length
        ? ['skillsToLearn', 'learn']
        : ['skillsToTeach', 'teach'];

    dispatch(
      updateUser({
        url: `/api/users/skills/${learnOrTeach}`,
        data: { [property]: selection, maxMentees: menteesQty },
      }),
    );
    setSelection([]);
    setButtonsStyle({});

    if (learnOrTeach === 'learn' || !user.isMentee) {
      dispatch(login({ token: user.token }));
    }
  };

  const handlePress = item => {
    if (!buttonsStyle[item.name]) {
      return setButtonsStyle({
        ...buttonsStyle,
        [item.name]: { ...item, styles: { backgroundColor: mode.green } },
      });
    }
    const updatedButtonsStyle = { ...buttonsStyle };
    delete updatedButtonsStyle[item.name];
    setButtonsStyle(updatedButtonsStyle);
  };

  useEffect(() => {
    const selectedSkills = Object.values(buttonsStyle);
    const finalSkillsIds = selectedSkills.map(skill => ({ _id: skill._id }));
    setSelection(finalSkillsIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(buttonsStyle).length]);

  const handleChangeQty = number => {
    const totalQty = menteesQty + number;
    if (totalQty >= 1 && totalQty <= 5) {
      setMenteesQty(menteesQty + number);
    } else if (totalQty < 1) {
      simpleMessage(
        '¡Atención!',
        'No puedes tener una cantidad menor a uno',
        'warning',
      );
    } else if (totalQty > 5) {
      simpleMessage(
        '¡Atención!',
        `Solo puedes tener hasta ${totalQty - 1} mentees`,
        'warning',
      );
    }
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
      <View style={{ ...styles.header, backgroundColor: mode.inputBg }}>
        <Text style={{ ...styles.headerText, color: mode.text }}>
          {(!user.isMentor && user.isMentee) || user.skillsToTeach.length
            ? '¿Qué quieres aprender?'
            : '¿Qué quieres enseñar?'}
        </Text>
      </View>

      <View
        style={{
          ...styles.btnsContainer,
          borderColor: mode.text,
          backgroundColor: mode.bg,
        }}>
        <FlatList
          scrollEnabled={true}
          contentContainerStyle={styles.flatListAlign}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={skills}
          keyExtractor={skill => skill._id}
          renderItem={({ item }) => (
            <Pressable
              style={[
                {
                  ...styles.pressable,
                  backgroundColor: mode.inputBg,
                  borderColor: mode.text,
                },
                buttonsStyle[item.name]?.styles,
              ]}
              onPress={() => handlePress(item)}>
              <Text style={{ color: mode.text }}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>

      {user.isMentor && !user.skillsToTeach.length && (
        <View>
          <Text style={{ ...styles.menteeQtyTitleTxt, color: mode.text }}>
            Cantidad de mentees a mentorear
          </Text>
          <View style={styles.menteeQtyBox}>
            <Button
              title="-"
              style={styles.menteeQtyBtn}
              pressFunction={() => handleChangeQty(-1)}
            />
            <Text style={{ ...styles.menteeQtyTxt, color: mode.text }}>
              {menteesQty}
            </Text>
            <Button
              title="+"
              style={styles.menteeQtyBtn}
              pressFunction={() => handleChangeQty(+1)}
            />
          </View>
        </View>
      )}

      <View style={{ ...styles.footer, backgroundColor: mode.inputBg }}>
        <Button
          title={'Siguiente'}
          style={styles.nextBtn}
          pressFunction={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectSkills;
