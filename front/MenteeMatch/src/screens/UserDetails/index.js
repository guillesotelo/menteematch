import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setUserImg, getData } from '../../utils/storage';
import { getSkills } from '../../redux/Reducers/Skills';
import userImg from '../../assets/static/user_img.png';
import useMode from '../../hooks/useMode';
import styles from './styles';
import ButtonSkills from './ButtonsSkills';
import useToggleSkills from '../../hooks/useToggleSkills';

const UserDetails = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { name, surname, email, position } = user;
  const [img, setImg] = useState(null);
  const { mode } = useMode();

  const { skillsToRender, learn, teach, handleTeach, handleLearn } =
    useToggleSkills(user);

  useEffect(() => {
    if (!user) {
      return navigation.navigate('Login');
    }
    dispatch(getSkills());
    getData('userImg').then(data => {
      data && setImg(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, img]);

  const onPicture = uri => {
    setImg(uri);
    setUserImg(uri);
  };

  const choosePhoto = () => {
    sheetRef.current.snapTo(2);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImg(image.path);
      setUserImg(image.path);
    });
  };

  const renderContent = () => (
    <View
      style={{
        ...styles.panel,
        backgroundColor: mode.bg,
        borderColor: mode.gray,
      }}>
      <View style={styles.panelView}>
        <Text style={{ ...styles.panelTitle, color: mode.text }}>
          Subir foto
        </Text>
        <Text style={{ ...styles.panelSubtitle, color: mode.text }}>
          Elija su foto de perfil
        </Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.panelButton, backgroundColor: mode.green }}
        onPress={() => navigation.navigate('Camera', { onPicture: onPicture })}>
        <Text style={{ ...styles.panelButtonTitle, color: mode.bg }}>
          Tomar foto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.panelButton, backgroundColor: mode.green }}
        onPress={() => choosePhoto()}>
        <Text style={{ ...styles.panelButtonTitle, color: mode.bg }}>
          Elige de la biblioteca
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.panelButton, backgroundColor: mode.green }}
        onPress={() => sheetRef.current.snapTo(2)}>
        <Text style={{ ...styles.panelButtonTitle, color: mode.bg }}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 200, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={2}
      />

      <SafeAreaView style={{ ...styles.container, backgroundColor: mode.bg }}>
        <View style={styles.pressableFoto}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => sheetRef.current.snapTo(0)}>
            {img ? (
              <Image source={{ uri: img }} style={styles.userImg} />
            ) : (
              <Image
                source={user.img ? { uri: user.img } : userImg}
                style={styles.userImg}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.userInfo, backgroundColor: mode.inputBg }}>
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
          <ButtonSkills
            user={user}
            mode={mode}
            learn={learn}
            teach={teach}
            handleLearn={handleLearn}
            handleTeach={handleTeach}
          />
          <View style={styles.flatlist}>
            <FlatList
              scrollEnabled={true}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={skillsToRender}
              keyExtractor={skill => skill._id}
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

export default UserDetails;
