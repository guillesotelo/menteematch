import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { InputText, Button } from '../../components';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import useMode from '../../hooks/useMode';
import { pushMeet } from '../../redux/Reducers/UserReducer';
import { sendNotification } from '../../services/axiosServices';

const CreateMeet = ({ navigation }) => {
  const { mode } = useMode();
  const user = useSelector(state => state.user);
  let mentorOrMentee = [];
  if (user.mentees.length) {
    let mentees = []
    user.mentees.map(person => mentees.push({
      label: person.name + ' ' + person.surname,
      value: person._id,
    }))
    mentorOrMentee = mentees
  }
  if (user.mentor) {
    mentorOrMentee.push({
      label: user.mentor.name + ' ' + user.mentor.surname,
      value: user.mentor._id,
    })
  }
  // console.log('mentorOrMentee: ', mentorOrMentee);
  const [open, setOpen] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [items, setItems] = useState(mentorOrMentee);
  // console.log('Items: ', items);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      if (!data) throw new Error('No data passed through');
      let datas = data;
      datas.participants = [user._id, participant];
      datas.date = date.toString();
      await dispatch(pushMeet({ data: datas, token: user.token }));
      // console.log('Presionaste Crear reunión. Data ---> ', datas);
      sendNotification(
        {
          receptor: participant,
          type: 'reunion',
        },
        user.token,
      )
      navigation.navigate('Meets');
    } catch (err) {
      console.log(err);
    }
  };

  return user.mentees.length || user.mentor ? (
    <View style={{ ...styles.module, backgroundColor: mode.bg }}>
      {/* <ScrollView contentContainerStyle={{ ...styles.scroll, backgroundColor: mode.bg }}> */}
      <View
        style={{ ...styles.container, backgroundColor: mode.bg }}
        onSubmit={onSubmit}>
        <Text style={{ ...styles.title, color: mode.text }}>
          Crear una reunión
        </Text>
        {/* <form onSubmit={handleSubmit(data => console.log(data))}> */}
        {errors.title && <Text style={{...styles.error, paddingBottom: 5}}>Ingrese un título</Text>}
        <Controller
          control={control}
          rules={{ required: 'Campo requerido' }}
          name="title"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              style={{ ...styles.input, backgroundColor: mode.bg, color: mode.text }}
              errors={errors.name}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Título de la reunión"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              style={{ ...styles.input, backgroundColor: mode.bg, color: mode.text }}
              errors={errors.name}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Breve descripción"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          render={() => (
            <DropDownPicker
              style={{ ...styles.dropDown, backgroundColor: mode.bg, color: mode.text }}
              open={open}
              value={participant}
              items={items}
              setOpen={setOpen}
              setValue={setParticipant}
              setItems={setItems}
              placeholder="Elige con quién"
              placeholderStyle={{...styles.placeholder, backgroundColor: mode.bg, color: mode.text}}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePicker
              style={{ ...styles.date, backgroundColor: mode.bg }}
              date={date}
              onDateChange={setDate}
            />
          )}
        />
        <Button title="Crear" pressFunction={handleSubmit(onSubmit)} />
      </View>
      {/* </ScrollView> */}
    </View>
  ) : (
    <View style={{ ...styles.notContainer, backgroundColor: mode.bg }}>
      <Text style={{ ...styles.not, color: mode.text }}>
        Para crear una reunión, debes tener al menos un mentee/mentor asignado.
      </Text>
      <Button
        title={user.isMentor ? 'Buscar Mentees' : 'Buscar Mentor'}
        pressFunction={() => navigation.navigate('Matcher')}
      />
    </View>
  );
};

export default CreateMeet;

