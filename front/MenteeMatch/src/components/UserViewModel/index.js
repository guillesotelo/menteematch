import React from 'react';
import { View, Text, Pressable, Image, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import useMode from '../../hooks/useMode';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import user_img from '../../assets/static/user_img.png';

export default ({ navigation, route }) => {
  const user = useSelector(state => state.user);
  const { name, surname, email, position, img, skillsToLearn } =
    route.params.name;
  const { mode } = useMode();

  const sheetRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
        <View style={styles.pressableFoto}>
          <Image
            source={img ? { uri: img } : user_img}
            style={styles.userImg}
          />
        </View>
        <View style={styles.UserInfo}>
          <Text style={{ ...styles.keyText, color: mode.text }}>
            Nombre: {`${name} ${surname}`}
          </Text>
          <Text style={{ ...styles.keyText, color: mode.text }}>
            Contacto: {email}
          </Text>
          <Text style={{ ...styles.keyText, color: mode.text }}>
            Posición: {position}
          </Text>
        </View>

        <View style={styles.btnsContainer}>
          <Text style={{ ...styles.btns_title, color: mode.text }}>
            Habilidades a aprender
          </Text>
          <View style={styles.flatlist}>
              <FlatList
                scrollEnabled={true}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={skillsToLearn}
                keyExtractor={skillsToLearn => skillsToLearn._id}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      ...styles.pressable,
                      backgroundColor: mode.inputBg,
                      borderColor: mode.green,
                    }}>
                    <Text style={{ color: mode.text }}>{item.name}</Text>
                  </Pressable>
                )}
              />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
