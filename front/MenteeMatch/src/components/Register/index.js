import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { InputText, Button } from '../../components';
import logo from '../../utils/logo.png';

import styles from './styles';
import useMode from '../../hooks/useMode';

const Register = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mode } = useMode();

  return (
    <View style={{ ...styles.login, backgroundColor: mode.bg }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          style={{ ...styles.logo, borderColor: mode.green }}
          source={logo}
        />

        <View style={styles.inputs}>
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: 'Campo requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                errors={errors.name}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nombre"
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.surname && (
            <Text style={styles.error}>{errors.surname.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: 'Campo requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                errors={errors.surname}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Apellido"
              />
            )}
            name="surname"
            defaultValue=""
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: 'Campo requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                errors={errors.email}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCompleteType="off"
                placeholder="menteematch@ejemplo.com"
                keyboardType="email-address"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: 'Campo requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                errors={errors.password}
                onBlur={onBlur}
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
                placeholder="Contraseña"
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.passwordConf && (
            <Text style={styles.error}>{errors.passwordConf.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: 'Campo requerido' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                errors={errors.passwordConf}
                onBlur={onBlur}
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
                placeholder="Confirmar Contraseña"
              />
            )}
            name="passwordConf"
            defaultValue=""
          />
          <Button title="Crear" pressFunction={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
