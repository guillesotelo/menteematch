import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from '../../screens';

const Stack = createStackNavigator();

export default function NotificationsStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={{
        headerStyle: { backgroundColor: '#BFD732' },
        headerTintColor: '#F5F6F7',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notificaciones',
        }}
      />
    </Stack.Navigator>
  );
}
