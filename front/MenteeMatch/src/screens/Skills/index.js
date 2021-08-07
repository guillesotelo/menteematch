import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Text,
  FlatList,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';
import { getSkills } from '../../redux/Reducers/Skills';
import { simpleMessage } from '../../utils';
import styles from './styles';
import { updateUser } from '../../redux/Reducers/UserReducer';
import useMode from '../../hooks/useMode';
import { storeData } from '../../utils/storage';

const Skills = ({ route, navigation }) => {
  const learnOrTeach = route.params.learnOrTeach;
  const property = route.params.property;
  const dispatch = useDispatch();
  const { skills } = useSelector(state => state);
  const [buttonsStyle, setButtonsStyle] = useState({});
  const [selection, setSelection] = useState([]);
  const [menteesQty, setMenteesQty] = useState(1);
  const { mode } = useMode();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  const handleSubmit = () => {
    if (selection.length < 5) {
      return simpleMessage(
        '¡Atención!',
        'Debes seleccionar al menos 5 habilidades',
        'warning',
      );
    }
    dispatch(
      updateUser({
        url: `/api/users/skills/${learnOrTeach}`,
        data: { [property]: selection, maxMentees: menteesQty },
      }),
    ).then(data => {
      navigation.navigate('Role');
      setSelection([]);
      setButtonsStyle({});
      ToastAndroid.showWithGravityAndOffset(
        'Se actualizaron tus habilidades',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      storeData('user', data.payload);
    });
    setSelection([]);
    setButtonsStyle({});
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
        'No puedes tener una cantidad menor a uCENTERno',
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
          {route.params.name === 'Mentee'
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

      {route.params.name === 'Mentor' && (
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
          title={'Confirmar'}
          style={styles.nextBtn}
          pressFunction={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default Skills;
