import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import RoleButton from '../RoleButton';

const HeaderTitle = ({ user, mode }) => {

  const getCorrectOption = ({ actualRole, isMentor }) => {
    if(actualRole) return user.actualRole === 'Mentor' ? 'mentees' : 'mentores'
    return isMentor ? 'mentees' : 'mentors'
  }

  return (
    <View style={styles.container}>
      <View styles={styles.subContainer}>
        <Text style={{ ...styles.title, color: mode.text }}>
          Hola, {user.name}.
        </Text>
        <Text style={{ ...styles.subtitle, color: mode.text }}>
          {`Elige entre tus posibles ${getCorrectOption(user)}`}
        </Text>
      </View>
      <RoleButton style={styles.roleSelectionBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    /* borderWidth: 4,
    borderColor: "red", */
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
  },
  roleSelectionBtn: {
    width: 140,
    marginBottom: 20,
    elevation: 5,
    left: 8
  },
});

export default HeaderTitle;
