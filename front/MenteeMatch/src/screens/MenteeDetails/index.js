import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getObjectivesFromUser } from '../../services/axiosServices';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import userImage from '../../assets/static/user_img.png';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMode from '../../hooks/useMode';
import { globantBright } from '../../assets/styles/colors';

export default function MenteeDetails({ route }) {
  const { mode } = useMode();
  //const user = useSelector(state => state.user);
  const [objectives, setObjectives] = useState([]);
  const { userToken } = useSelector(state => state.auth);
  const mentee = route.params.mentee;

  React.useEffect(() => {
    const getObjectives = async () => {
      const res = await getObjectivesFromUser(mentee._id, userToken);
      setObjectives(res.data);
    };

    getObjectives();
  }, [objectives.length]);

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
      <View style={styles.user_data_container}>
        <Image source={mentee.img ? { uri: mentee.img } : userImage} style={styles.foto} />
        <TouchableOpacity
          disabled={true}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome name="user" color={'#00A99D'} size={25} />
          <Text style={styles.textName}>
            {`${mentee.name} ${mentee.surname}`}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity disabled style={styles.touchButton}>
        <FontAwesome name="rocket" color={'#BFD732'} size={25} />
        <Text style={{ fontSize: 20, margin: 5, color: mode.text }}>
          Objetivos
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
                  size={25}
                  disableBuiltInState={true}
                  isChecked={item.state === 'En progreso' ? false : true}
                  text={item.description}
                  fillColor="#BFD732"
                  iconStyle={{ borderColor: '#BFD732' }}
                  textStyle={{ fontSize: 20, color: mode.text }}
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
      <TouchableOpacity disabled style={styles.touchButton}>
        <FontAwesome name="comments" color={'#BFD732'} size={25} />
        <Text style={{ fontSize: 20, margin: 5, color: mode.text }}>
          Reuniones programadas
        </Text>
      </TouchableOpacity>
      {!objectives.length ? (
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
                  size={25}
                  disableBuiltInState={true}
                  isChecked={item.state === 'En progreso' ? false : true}
                  text={item.description}
                  fillColor="#BFD732"
                  iconStyle={{ borderColor: '#BFD732' }}
                  textStyle={{ fontSize: 20 }}
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
}
