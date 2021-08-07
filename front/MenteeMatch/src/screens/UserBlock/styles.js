import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 2,
    width: 400,
  },
  block: {
    paddingBottom: 10,
    flexDirection: 'column',
    width: '90%',
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 4,
    marginLeft: '5%',
    paddingLeft: 5,
  },
  rowDirection: { flexDirection: 'row' },
  text: {
    fontSize: 15,
    marginLeft: '9%',
  },
  img: {
    width: 90,
    height: 90,
    marginLeft: 25,
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 100,
  },
  skillsContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 85,
  },
  skills: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  likeButton: {
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: globantBright.grass,
    height: 50,
    width: 90,
    marginRight: 20,
  },
  dislikeButton: {
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: '#f44336',
    height: 50,
    width: 90,
    marginLeft: 20,
  },
  confirmButton: {
    height: 45,
    width: 45,
    marginLeft: 3,
  },
  notElegible: {
    height: 45,
    width: 45,
    marginLeft: 3,
    backgroundColor: '#666666',
  },
  cardTitleBox: {
    // position: "relative",
    marginTop: 40,
    height: 60,
    width: '53%',
    // borderWidth: 1,
    // borderColor: "red",
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textCargando: { textAlign: 'center', fontSize: 30 },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
