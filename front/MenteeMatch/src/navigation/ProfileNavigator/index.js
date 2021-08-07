import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import ProfileStack from './ProfileStack';
import useMode from '../../hooks/useMode';
import ProfileEditStack from './ProfileEditStack.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function ProfileNavigator() {
  const { mode } = useMode();

  return (
    <Drawer.Navigator
      initialRouteName="Perfil"
      drawerStyle={{
        backgroundColor: mode.bg,
        width: "60%",
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "center"
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{ activeTintColor: '#BFD732' }}
      drawerPosition="right"
      drawerType="back">
      <Drawer.Screen
        name="Perfil"
        component={ProfileStack}
        options={{ title: 'Mi Perfil', drawerIcon: () => <Ionicons name="person" size={24} />  }}
      />
      <Drawer.Screen
        name="ProfileEdit"
        component={ProfileEditStack}
        options={{ title: 'Editar perfil', drawerIcon: () => <Ionicons name="create" size={24} />}}
      />
    </Drawer.Navigator>
  );
}
