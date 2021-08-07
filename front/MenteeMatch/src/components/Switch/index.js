import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import useMode from '../../hooks/useMode';
import useTheme from '../../hooks/useTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SwitchDarkMode = () => {
  const { isEnabled, toggleSwitch } = useTheme();
  const { mode } = useMode();

  return (
    <View style={styles.container}>
      {isEnabled ? <Ionicons name="moon" size={24} /> : <Ionicons name="sunny" size={24} />}
      <Text style={{ ...styles.title, color: mode.text }}>Modo oscuro</Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: '#767577', true: '#767577' }}
        thumbColor={isEnabled ? '#BFD732' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    padding: 20
  },
});

export default SwitchDarkMode;
