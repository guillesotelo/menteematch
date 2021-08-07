import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    width: '30%',
    height: 50,
    margin: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    borderColor: globantBright.blackPearl,
    backgroundColor: globantBright.lightgray,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    margin: 5,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globantBright.bg,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: globantBright.charade,
    margin: 5,
    elevation: 5,
    width: 120,
    height: 75,
  },
  pressableTxt: {
    color: globantBright.text,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '5%',
  },
  editText: {
    fontSize: 16,
    color: '#000000',
  },
  skillButton: {
    width: 120,
    height: 60,
    margin: 3,
    paddingHorizontal: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
    fontSize: 24,
    position: 'relative',
    zIndex: 10,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  flex_1: { flex: 1 },

  flatListContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default styles;
