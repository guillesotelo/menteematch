import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import logo from '../../utils/logo.png';
import logoG from '../../utils/logoG.png';
import styles from './styles';
import useMode from '../../hooks/useMode';

const FirstScreen = () => {
  const { mode } = useMode();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, [navigation]);

  return (
    <View
      style={{
        ...styles.background,
        backgroundColor: mode.bg,
      }}>
      <View>
        <Image
          style={{
            ...styles.logo,
            borderColor: mode.green,
          }}
          source={logo}
        />
      </View>
      <View style={styles.logo_g_container}>
        <Image style={styles.logoG} source={logoG} />
      </View>
    </View>
  );
};

export default FirstScreen;
