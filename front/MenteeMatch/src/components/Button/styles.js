import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

const styles = StyleSheet.create({
  button: {
    width: '50%',
    backgroundColor: globantBright.green,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0.6,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'H',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default styles;
