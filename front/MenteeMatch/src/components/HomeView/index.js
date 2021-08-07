import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import HomeMentor from '../HomeMentor/index';
import { getObjectivesFromUser } from '../../services/axiosServices';
import userImage from '../../assets/static/user_img.png';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMode from '../../hooks/useMode';
import { globantBright } from '../../assets/styles/colors';

import styles from './styles';

export default () => {
  const { mode } = useMode();
  const user = useSelector(state => state.user);
  const mentor = useSelector(state => state.user.mentor);
  const { userToken } = useSelector(state => state.auth);
  const [objectives, setObjectives] = useState([]);

  React.useEffect(() => {
    const getObjectives = async () => {
      const res = await getObjectivesFromUser(user._id, userToken);
      setObjectives(res.data);
    };

    getObjectives();
  }, [objectives.length]);

  const getIsMentor = () => {
    if (user.actualRole) return user.actualRole === 'Mentor';
    return !!user.isMentor;
  };
  const isMentor = getIsMentor();

  return isMentor ? (
    <HomeMentor />
  ) : (
    <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
      <View style={styles.user_data_container}>
        <TouchableOpacity
          disabled={true}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              margin: 10,
              fontWeight: 'bold',
              color: '#BFD732',
            }}>
            Mentor
          </Text>
        </TouchableOpacity>

        <Image
          source={
            mentor ? (mentor.img ? { uri: mentor.img } : userImage) : userImage
          }
          style={styles.foto}
        />
        <TouchableOpacity
          disabled={true}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome name="user" color={'#00A99D'} size={25} />
          <Text style={styles.textName}>
            {`${mentor.name} ${mentor.surname}`}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity disabled={true} style={styles.touchButton}>
        <FontAwesome name="rocket" color={'#BFD732'} size={25} />
        <Text style={{ fontSize: 20, margin: 5, color: mode.text }}>
          Mis objetivos
        </Text>
      </TouchableOpacity>
      {objectives.length ? (
        <View
          style={{
            ...styles.flatContainer,
            borderColor: mode.text,
            backgroundColor: mode.bg,
          }}>
          <FlatList
            scrollEnabled={true}
            contentContainerStyle={{
              alignSelf: 'auto',
              alignItems: 'flex-start',
            }}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={objectives}
            keyExtractor={objectives => objectives._id}
            renderItem={({ item }) => (
              <View style={styles.flatContent}>
                <BouncyCheckbox
                  disabled
                  size={25}
                  disableBuiltInState={true}
                  isChecked={item.state === 'En progreso' ? false : true}
                  text={item.description}
                  fillColor="#BFD732"
                  iconStyle={{ borderColor: '#BFD732' }}
                  textStyle={{ fontSize: 20, color: mode.text, textDecorationLine: 'none',}}
                />
              </View>
            )}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: mode.text }}>Sin objetivos!</Text>
        </View>
      )}
      <TouchableOpacity disabled={true} style={styles.touchButton}>
        <FontAwesome name="comments" color={'#BFD732'} size={25} />
        <Text style={{ fontSize: 20, margin: 5, color: mode.text }}>
          Reuniones programadas
        </Text>
      </TouchableOpacity>
      {user.meets.length ? (
        <View
          style={{
            ...styles.flatContainer,
            borderColor: mode.text,
            backgroundColor: mode.bg,
          }}>
          <FlatList
            scrollEnabled={true}
            contentContainerStyle={{
              alignSelf: 'auto',
              alignItems: 'flex-start',
            }}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={user.meets}
            keyExtractor={objectives => objectives._id}
            renderItem={({ item }) => (
              <View style={styles.flatContent}>
                <BouncyCheckbox
                  disabled
                  size={25}
                  disableBuiltInState={true}
                  isChecked={item.state === 'En progreso' ? false : true}
                  text={`${item.title} - ${item.date.substring(0,15)}`}
                  fillColor="#BFD732"
                  iconStyle={{ borderColor: '#BFD732' }}
                  textStyle={{ fontSize: 20, color: mode.text, textDecorationLine: 'none'}}
                />
              </View>
            )}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: mode.text }}>Sin reuniones programadas!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
