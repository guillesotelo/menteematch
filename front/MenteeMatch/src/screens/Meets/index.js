import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { pullMeets, removeMeet } from '../../redux/Reducers/UserReducer';
import useMode from '../../hooks/useMode';
import styles from './styles';

const Meets = ({ navigation, route }) => {

  const arrCompare = (arr1, arr2) => {
    let j=0
    for(let i=j; i<arr1.length ; i++){
      if(arr1[i]._id === arr2[j]._id) j++
    }
    if(j>0) return true
  }

  const { mode } = useMode();
  const dispatch = useDispatch();
  console.log("route", route)
  const user = useSelector(state => state.user)
  const userMeets = user.meets
  let mentee = route.params && route.params.mentee
  let { meets } = mentee && mentee.meets.length ? mentee : user
  if(!user.meets.length || (route.params.mentee && arrCompare(route.params.mentee.meets, userMeets))){
    meets = user.meets
  }
  const token = useSelector(state => state.user.token);

  const handleDelete = async meet => {
      const data = { _id: meet._id, token: token };
     await dispatch(removeMeet(data)).then(()=> dispatch(pullMeets(token)))
  };

  useEffect(() => {
    dispatch(pullMeets(token));
  }, [dispatch, meets.length]);

  return (
    <View style={{ ...styles.container, backgroundColor: mode.bg }}>
      <ScrollView
        contentContainerStyle={{ ...styles.scroll, backgroundColor: mode.bg }}>
        <Text style={{ ...styles.title, color: mode.text }}>Reuniones</Text>
        {meets && meets.length ? (
          meets.map((meet, i) => (
            <View key={i} style={{ ...styles.module, backgroundColor: mode.bg, color: mode.text, borderColor: mode.text }}>
              <Text style={{...styles.meetTitle, color: mode.text}}>{meet.title}</Text>
              <Text style={{...styles.description, color: mode.text}}>{meet.description}</Text>
              <Text style={{...styles.date, color: mode.text}}>{meet.date}</Text>
              <Button
                style={{...styles.deleteBtn, backgroundColor: '#f44336'}}
                title="Eliminar"
                pressFunction={() => handleDelete(meet)}
              />
            </View>
          ))
        ) : (
          <Text style={{ ...styles.not, color: mode.text }}>
            No tienes reuniones agendadas.
          </Text>
        )}
        <Button
          style={styles.new}
          title="Nueva reunión"
          pressFunction={() => navigation.navigate('CreateMeet')}
        />
      </ScrollView>
    </View>
  );
};

export default Meets;