import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#F5F6F7',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 100,
  },
  logo_g_container: {
    height: '50%',
  },
  logoG: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: -250,
  },
});

export default styles;
