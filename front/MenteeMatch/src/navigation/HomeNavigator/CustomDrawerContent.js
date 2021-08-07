import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useDispatch } from 'react-redux';
import Switch from '../../components/Switch';
import { removeData } from '../../utils/storage';
import { setUser } from '../../redux/Reducers/UserReducer';
import { logout } from '../../redux/Slices/authSlice';
import { setSkills } from '../../redux/Reducers/Skills';
import { setMatches } from '../../redux/Reducers/matchesReducer';
import useMode from '../../hooks/useMode';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function CustomDrawerContent(props) {
  const { mode } = useMode();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await removeData('user');
      dispatch(logout());
      dispatch(setUser({}));
      dispatch(setSkills([]));
      dispatch(setMatches([]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList labelStyle={{ color: mode.green }} {...props} />
      <DrawerItem
        label="Cerrar sesion"
        labelStyle={{ color: mode.text }}
        onPress={handleLogOut}
        icon={() => <Ionicons name="log-out" size={24} />}
      />
      <Switch />
    </DrawerContentScrollView>
  );
}

/* Para cerrar el drawer usar -> props.navigation.closeDrawer() */
/* Para togglear el drawer usar -> props.navigation.toggleDrawer() */
