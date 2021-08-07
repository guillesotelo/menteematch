import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Meets, UserDetails } from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Camera } from '../../components';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: '#BFD732' },
        headerTintColor: '#F5F6F7',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={UserDetails}
        options={{
          title: 'Mi Perfil',
          headerRight: () => (
            <Ionicons
              name="settings"
              size={30}
              color={'#F5F6F7'}
              style={styles.margin}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ title: 'Camara' }}
      />
      <Stack.Screen
        name="Meets"
        component={Meets}
        options={{ title: 'Reuniones' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  margin: { marginRight: 15 },
});
