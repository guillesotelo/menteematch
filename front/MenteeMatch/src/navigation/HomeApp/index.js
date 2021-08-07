import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import ProfileNavigator from '../ProfileNavigator';
import HomeNavigator from '../HomeNavigator';
import MatcherNavigator from '../HomeNavigator/MatchNav';

import useMode from '../../hooks/useMode';
import NotificationsStack from '../NotificationsNavigator';

const Tab = createBottomTabNavigator();

export default function HomeApp() {
  const notifications = useSelector(state => state.user.notifications)
  const { mode } = useMode();
  const user = useSelector(state => state.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: { backgroundColor: mode.green },
        activeTintColor: mode.lightgray,
        inactiveTintColor: mode.blackPearl,
        showLabel: true,
      }}>
      {!user.mentor || user.actualRole === 'Mentor' ? (
        <Tab.Screen
          name="Matcher"
          component={MatcherNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-circle" size={size} color={color} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          tabBarLabel: 'Notificaciones',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-circle" size={size} color={color} />
          ),
          unmountOnBlur: true,
          tabBarBadge: notifications.length ? notifications.length : null
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
