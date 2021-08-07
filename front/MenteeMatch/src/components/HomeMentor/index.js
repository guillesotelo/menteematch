import React from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import useMode from '../../hooks/useMode';
import {
  cancelMatch,
  cancelMatchMentor,
} from '../../redux/Reducers/UserReducer';
import user_img from '../../assets/static/user_img.png';

import { styles } from './styles';

export default () => {
  const { mode } = useMode();
  let user = useSelector(state => state.user);
  /* console.log("User Mentees en HomeMentor: ", user.mentees) */
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = (mentorId, menteeId) => {
    dispatch(cancelMatch({ data: { mentorId, menteeId }, token: user.token })); //saca el mentee del mentor
    dispatch(
      cancelMatchMentor({ data: { mentorId, menteeId }, token: user.token }),
    ); //saca el mentor del mentee
  };

  return (
    <View style={{ ...styles.container, backgroundColor: mode.bg }}>
      <Text style={{ ...styles.title, color: mode.text }}>
        {user.mentees.length
          ? 'Tus mentees son los siguientes:'
          : 'No tienes mentees asignados todavia. Dirígete al Matcher para seleccionar mentees'}
      </Text>
      <View
        style={{
          ...styles.block,
          backgroundColor: mode.inputBg,
          borderColor: mode.inputBg,
        }}>
        <ScrollView>
          {user.mentees.map(mentee => (
            <View style={styles.bord} key={mentee._id}>
              <Image
                onPress={() => navigation.navigate('UserViewModel')}
                style={styles.img}
                source={mentee.img ? { uri: mentee.img } : user_img}
              />
              <Text
                onPress={() =>
                  navigation.navigate('UserViewModel', { name: mentee })
                }
                style={styles.name}>
                {`${mentee.name} ${mentee.surname}`}
              </Text>

              <View>
                <Menu>
                  <MenuTrigger
                    children={
                      <Ionicons
                        style={styles.threePoints}
                        name="ellipsis-vertical"
                        size={40}
                        color="#BFD732"
                      />
                    }
                  />
                  <MenuOptions
                    optionsContainerStyle={{
                      ...styles.menu_options,
                      backgroundColor: mode.bg,
                    }}
                    customStyles={{
                      optionText: { color: mode.text, fontSize: 18 },
                    }}>
                    <MenuOption
                      onSelect={() =>
                        navigation.navigate('MenteeDetails', { mentee })
                      }
                      text="Detalles"
                      style={{ color: 'red' }}
                    />

                    <MenuOption
                      onSelect={() =>
                        navigation.navigate('Objectives', {
                          mente: mentee,
                        })
                      }
                      text="Objetivos"
                    />
                    <MenuOption
                      onSelect={() =>
                        navigation.navigate('Notes', {
                          mente: mentee,
                        })
                      }
                      text="Notas"
                    />
                    <MenuOption
                      onSelect={() => navigation.navigate('Meets', { mentee })}
                      text="Reuniones"
                    />
                    <MenuOption
                      onSelect={() => handleDelete(user._id, mentee._id)}
                      text="Cancelar Match"
                    />
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
