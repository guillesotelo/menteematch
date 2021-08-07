import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 25,
    fontFamily: 'H',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    textDecorationLine: 'none',
  },
  select_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '50%',
    width: '100%',
  },
});
export default styles;
