import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../redux/Reducers/Skills';
import { updateUser } from '../../redux/Reducers/UserReducer';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import useMode from '../../hooks/useMode';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { storeData } from '../../utils/storage';
import styles from './styles';

export default function RoleEdit({ navigation }) {
  const { mode } = useMode();
  const user = useSelector(state => state.user);
  const { theme } = useSelector(state => state);
  const [role, setRole] = React.useState('');

  const dispatch = useDispatch();
  const skills = useSelector(state => state.skills);

  React.useEffect(() => {
    if (!skills.length) {
      dispatch(getSkills());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.isMentor, user.isMentee]);

  const menteeCheck = () => {
    setRole('mentee');
  };

  const mentorCheck = () => {
    setRole('mentor');
  };

  const handleSubmit = () => {
    if (role === 'mentee' && !user.isMentee) {
      return dispatch(
        updateUser({
          url: '/api/users/profile',
          data: { isMentee: true, actualRole: 'Mentee' },
        }),
      ).then(data => {
        storeData('user', data.payload);
        ToastAndroid.showWithGravityAndOffset(
          'Ahora tambien sos Mentee!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Skills', {
          name: 'Mentee',
          learnOrTeach: 'learn',
          property: 'skillsToLearn',
        });
      });
    } else if (role === 'mentor' && !user.isMentor) {
      return dispatch(
        updateUser({
          url: '/api/users/profile',
          data: { isMentor: true, actualRole: 'Mentor' },
        }),
      ).then(data => {
        storeData('user', data.payload);
        ToastAndroid.showWithGravityAndOffset(
          'Ahora tambien sos Mentor!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Skills', {
          name: 'Mentor',
          learnOrTeach: 'teach',
          property: 'skillsToTeach',
      })
      });
    }
  };

  return (
    <SafeAreaView style={{ ...styles.mainContainer, backgroundColor: mode.bg }}>
      <View style={styles.header}>
        <BouncyCheckbox
          textStyle={{ textDecorationLine: 'none' }}
          disableBuiltInState={user.isMentee}
          isChecked={user.isMentee}
          text="Mentee"
          fillColor={mode.green}
          iconStyle={{ borderColor: mode.green }}
          onPress={() =>
            user.isMentee
              ? ToastAndroid.showWithGravityAndOffset(
                  'No puedes desmarcar esta opcion',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                )
              : menteeCheck()
          }
        />
      </View>
      {user.isMentee ? (
        <>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              user.mentor
                ? ToastAndroid.showWithGravityAndOffset(
                    'No puedes cambiar tus habilidades si tienes mentor',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  )
                : navigation.navigate('Skills', {
                    name: 'Mentee',
                    learnOrTeach: 'learn',
                    property: 'skillsToLearn',
                  })
            }>
            <FontAwesome name="edit" color={mode.green} size={30} />
            <Text style={{ ...styles.editText, color: mode.text }}>
              Habilidades que quieres aprender
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...styles.btnsContainer,
              borderColor: mode.text,
              backgroundColor: mode.bg,
            }}>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flatListContainer}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={user.skillsToLearn}
              keyExtractor={skill => skill._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  disabled={true}
                  style={{ ...styles.skillButton }}>
                  <LinearGradient
                    colors={
                      theme === 'ligth'
                        ? ['#25F198', '#15C9C3']
                        : ['#CCC', mode.bg]
                    }
                    useAngle={true}
                    angle={40}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    style={styles.gradient}>
                    <Text style={styles.text}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : (
        <View style={styles.flex_1}>
          <Text style={{color: mode.text}}>Todavia no sos Mentee</Text>
        </View>
      )}
      <View style={styles.header}>
        <BouncyCheckbox
          disableBuiltInState={user.isMentor}
          isChecked={user.isMentor}
          text="Mentor"
          fillColor={mode.green}
          iconStyle={{ borderColor: mode.green }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() =>
            user.isMentor
              ? ToastAndroid.showWithGravityAndOffset(
                  'No puedes desmarcar esta opcion',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                )
              : mentorCheck()
          }
        />
      </View>
      {user.isMentor ? (
        <>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              user.mentees.length
                ? ToastAndroid.showWithGravityAndOffset(
                    'No puedes cambiar tus habilidades si tienes mentees',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  )
                : navigation.navigate('Skills', {
                    name: 'Mentor',
                    learnOrTeach: 'teach',
                    property: 'skillsToTeach',
                  })
            }>
            <FontAwesome name="edit" color={'#BFD732'} size={30} />
            <Text style={{ ...styles.editText, color: mode.text }}>
              Habilidades que quieres enseñar
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...styles.btnsContainer,
              borderColor: mode.text,
              backgroundColor: mode.bg,
            }}>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flatListContainer}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={user.skillsToTeach}
              keyExtractor={skill => skill._id}
              renderItem={({ item }) => (
                <TouchableOpacity disabled={true} style={styles.skillButton}>
                  <LinearGradient
                    colors={
                      theme === 'ligth'
                        ? ['#25F198', '#15C9C3']
                        : ['#CCC', mode.bg]
                    }
                    useAngle={true}
                    angle={40}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    style={styles.gradient}>
                    <Text style={styles.text}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : (
        <View style={styles.flex_1}>
          <Text style={{color: mode.text}}>Todavia no sos Mentor</Text>
        </View>
      )}
      {user.isMentor && user.isMentee ? null : (
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <LinearGradient
            colors={['#D9E021', '#8CC63f']}
            useAngle={true}
            angle={40}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={styles.gradient}>
            <Text style={styles.text}>Confirmar</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
