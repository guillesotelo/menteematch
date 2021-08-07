import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Matcher } from '../../screens';
import { useSelector } from 'react-redux';
import HeaderTitle from '../../components/Saludo';
import useMode from '../../hooks/useMode';

const Stack = createStackNavigator();

export default function MatchNav() {
  const { user } = useSelector(state => state);
  const { mode } = useMode();
  return (
    <Stack.Navigator
      initialRouteName="Matcher"
      screenOptions={{
        headerTitle: () => <HeaderTitle user={user} mode={mode} />,
        headerStyle: { backgroundColor: '#BFD732' },
        headerTintColor: '#F5F6F7',
      }}>
      <Stack.Screen
        name="Matcher"
        component={Matcher}
        options={{
          title: `Hola, ${user.name}!`,
        }}
      />
    </Stack.Navigator>
  );
}
