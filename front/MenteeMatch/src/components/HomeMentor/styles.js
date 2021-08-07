import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    alignItems: 'center',
  },

  block: {
    paddingTop: 0,
    paddingBottom: 15,
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'column',
    width: '90%',
    height: '88%',
    borderRadius: 20,
    elevation: 12,
  },
  title: {
    color: 'black',
    fontSize: 20,

    paddingLeft: 5,
    width: '90%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  title_1: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },

  text_1: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 50,
    paddingBottom: '30%',
    paddingTop: '30%',
    padding: '10%',
    fontSize: 20,
  },

  name: {
    color: globantBright.violet,
    fontSize: 20,
    // fontWeight: 'bold',
    paddingTop: 4,
    marginLeft: '0%',
    paddingLeft: 5,
    width: '80%',
    paddingBottom: 5,
    /*  borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6, */
  },

  bord: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginHorizontal: 40,
    paddingRight: 20,
  },

  text: {
    color: '#434343',
    fontSize: 15,
    /* marginLeft: '9%', */
  },
  img: {
    width: 90,
    height: 90,
    marginLeft: 15,
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: globantBright.violet,
  },
  threePoints: {
    width: 30,
  },
  menu_options: {
    borderRadius: 15,
    padding: 8,
    width: '50%',
  },
});
