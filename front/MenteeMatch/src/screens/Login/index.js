import React from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../redux/Reducers/UserReducer';
import { loginMessage } from '../../utils';
import styles from './styles';
import logo from '../../utils/logo.png';
import { InputText, Button } from '../../components';
import { storeData } from '../../utils/storage';
import { login } from '../../redux/Slices/authSlice';
import useMode from '../../hooks/useMode';
import { API_URL } from '@env';


const Login = ({ navigation }) => {
  /* console.log({api: API_URL}) */
  const { mode } = useMode();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onSubmit = async userData => {
    const { payload } = await dispatch(getUser(userData));
    if (payload) {
      loginMessage(true);
      await storeData('user', payload);
      dispatch(login({ token: user.token }));
    } else {
      loginMessage(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ ...styles.login, backgroundColor: mode.bg }}
      behavior="height"
      keyboardVerticalOffset={-30}>
      <Image
        style={{ ...styles.logo, borderColor: mode.green }}
        source={logo}
      />

      <View style={styles.inputs}>
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Ingrese su email' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              errors={errors.email}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="E-mail"
              keyboardType="email-address"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Ingrese su contraseña',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              errors={errors.password}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Contraseña"
              textContentType="password"
              secureTextEntry={true}
            />
          )}
        />
        <Button title={'Acceder'} pressFunction={handleSubmit(onSubmit)} />
        <Text
          style={{ ...styles.create, color: mode.text }}
          onPress={() => navigation.navigate('Register')}>
          Crear una cuenta
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
