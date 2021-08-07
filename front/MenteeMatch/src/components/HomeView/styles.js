import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  user_data_container: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  foto: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 62.5,
    borderWidth: 3,
    borderColor: '#00A99D',
  },

  text: {
    margin: 10,
    fontSize: 20,
  },

  flatContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    borderColor: globantBright.blackPearl,
    backgroundColor: globantBright.lightgray,
    margin: 5,
  },

  flatContent: {
    height: 40,
    paddingHorizontal: 40,
  },

  touchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    margin: 5,
  },

  textName: {
    fontSize: 25,
    margin: 5,
    color: '#00A99D',
  },
});

export default styles;
