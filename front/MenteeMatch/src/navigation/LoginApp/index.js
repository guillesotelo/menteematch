import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  Register,
  RoleSelection,
  SelectSkills,
  UserData,
} from '../../screens';
import { FirstScreen } from '../../components';

const Stack = createStackNavigator();

export default function LoginApp() {
  return (
    <Stack.Navigator
      initialRouteName="FirstScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#BFD732' },
        headerTintColor: '#F5F6F7',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Registro' }}
      />
      <Stack.Screen
        name="UserData"
        component={UserData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectSkills"
        component={SelectSkills}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
