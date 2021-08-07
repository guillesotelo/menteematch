import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MenteeDetails, Matcher, Meets, CreateMeet } from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoleButton from '../../components/RoleButton';
import UserViewModel from '../../components/UserViewModel';
import Objectives from '../../screens/Objectives';
import Notes from '../../screens/Notes';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#BFD732' },
        headerTintColor: '#F5F6F7',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={40}
              color={'#F5F6F7'}
              style={styles.margin}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => <RoleButton style={styles.roleButton} />,
        }}
      />
      <Stack.Screen
        name="UserViewModel"
        component={UserViewModel}
        options={{
          title: 'Mentee',
        }}
      />
      <Stack.Screen
        name="CreateMeet"
        component={CreateMeet}
        options={{
          title: 'CreateMeet',
        }}
      />
      <Stack.Screen
        name="MenteeDetails"
        component={MenteeDetails}
        options={{
          title: 'Mentee',
        }}
      />
      <Stack.Screen
        name="Matcher"
        component={Matcher}
        options={{
          title: 'Matcher',
        }}
      />
      <Stack.Screen
        name="Objectives"
        component={Objectives}
        options={{
          title: 'Objetivos',
        }}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          title: 'Notes',
        }}
      />
      <Stack.Screen
        name="Meets"
        component={Meets}
        options={{
          title: 'Reuniones',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  roleButton: {
    alignSelf: 'center',
    width: 140,
    height: 45.6,
    marginRight: 8,
    textAlignVertical: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  margin: {
    marginLeft: 5,
  },
});
