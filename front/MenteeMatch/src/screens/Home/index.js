import React from 'react';

import { Text, Image, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HomeView from '../../components/HomeView';
import useMode from '../../hooks/useMode';
import { styles } from './styles';
import user_img from '../../assets/static/user_img.png';

const Home = () => {
  const { mode } = useMode();
  const user = useSelector(state => state.user);
  const getIsMentor = () => {
    if (user.actualRole) {
      return user.actualRole === 'Mentor';
    }
    return !!user.isMentor;
  };
  const isMentor = getIsMentor();
  const usersLikes = useSelector(state =>
    isMentor ? state.user.likedMentees : state.user.likedMentors,
  );

  const usersToConfirm =
    usersLikes &&
    usersLikes.map((userLike, indice) => (
      <View key={indice}>
        <View style={styles.bord}>
          <Image
            style={styles.img}
            source={userLike.img ? { uri: userLike.img } : user_img}
          />
          <Text
            style={{
              ...styles.name,
              color: mode.violet,
            }}>{`${userLike.name} ${userLike.surname}`}</Text>
        </View>
      </View>
    ));

  return isMentor || user.mentor ? (
    <>
      <HomeView />
    </>
  ) : user.likedMentors.length ? (
    <View style={{ ...styles.container, backgroundColor: mode.bg }}>
      <Text style={{ ...styles.title, color: mode.text }}>
        Debes confirmar algun mentor, para eso dirijete a matcher y confirma la
        selección
      </Text>
      <View
        style={{
          ...styles.block,
          backgroundColor: mode.bg,
          borderColor: mode.inputBg,
        }}>
        <ScrollView style={{ ...styles.flatList, backgroundColor: mode.bg }}>
          {usersToConfirm}
        </ScrollView>
      </View>
    </View>
  ) : (
    <View style={{ ...styles.lastContainer, backgroundColor: mode.bg }}>
      <Text style={{ ...styles.title_1, color: mode.text }}>
        Bienvenido a MenteeMatch.
      </Text>
      <View>
        <Text style={{ ...styles.text_1, color: mode.text }}>
          Como es la primera vez que ingresas no tienes un mentor asignado. Por
          favor dirijase al icono de matcher ubicado en la esquina inferior
          izquierda para buscar un mentor que se adecue a tu perfil.
        </Text>
      </View>
    </View>
  );
};

export default Home;
