import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setUserImg, getData } from '../../utils/storage';
import userImg from '../../assets/static/user_img.png';
import useMode from '../../hooks/useMode';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { updateUser } from '../../redux/Reducers/UserReducer';
import { useForm, Controller } from 'react-hook-form';
import { storeData } from '../../utils/storage';

import styles from './styles';

const ProfileEdit = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const { mode } = useMode();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData('userImg').then(data => {
      data && setImg(data);
    });
  }, [dispatch, img, user]);

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

  const profileSubmit = personalData => {
    dispatch(
      updateUser({ url: '/api/users/profile', data: personalData }),
    ).then(data => {
      ToastAndroid.showWithGravityAndOffset(
        'Perfil actualizado!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate('Perfil');
      storeData('user', data.payload);
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
    <SafeAreaView style={{ ...styles.mainContainer, backgroundColor: mode.bg }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 200, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={2}
      />

      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: mode.bg,
        }}>
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
        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="person" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nombre..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="name"
            defaultValue={user.name ? user.name : ''}
          />
            {errors.name && (
                ToastAndroid.showWithGravityAndOffset(
                  'el nombre no puede ser vacio',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                ) 
            )}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Apellido..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="surname"
            defaultValue={user.surname ? user.surname : ''}
          />
            {errors.surname&& (
                ToastAndroid.showWithGravityAndOffset(
                  'el apellido no puede ser vacio',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                ) 
            )}

        </View>

        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="mail" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="email"
            defaultValue={user.email ? user.email : ''}
          />
            {errors.email && (
                ToastAndroid.showWithGravityAndOffset(
                  'el email no puede ser vacio',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                ) 
            )}

        </View>
        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="briefcase" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Posicion..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="position"
            defaultValue={user.position ? user.position : ''}
          />
        </View>
        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="call" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Teléfono..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="phone"
            defaultValue={user.phone ? user.phone : ''}
          />
        </View>
        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="location" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ubicacion..."
                placeholderTextColor="#666666"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="country"
            defaultValue={user.country ? user.country : ''}
          />
        </View>
        <View style={{ ...styles.action, borderBottomColor: mode.green }}>
          <Ionicons name="create" size={25} color={'#BFD732'} />
          <Controller
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Acerca de mí..."
                placeholderTextColor="#666666"
                autoCorrect={false}
                errors={errors.personalDescription}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{ ...styles.textInput, color: mode.text }}
              />
            )}
            name="personalDescription"
            defaultValue={
              user.personalDescription ? user.personalDescription : ''
            }
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(profileSubmit)}>
          <LinearGradient
            colors={['#D9E021', '#8CC63f']}
            useAngle={true}
            angle={40}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={styles.gradient}>
            <Text style={styles.text}>Confirmar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEdit;
