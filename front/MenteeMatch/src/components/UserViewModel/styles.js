import { StyleSheet } from 'react-native';
import { globantBright } from '../../assets/styles/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    backgroundColor: globantBright.bg,
    alignItems: 'center',
  },

  pressableFoto: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  UserInfo: {
    justifyContent: 'center',
    paddingLeft: 40,
    width: '85%',
    borderRadius: 20,
    backgroundColor: globantBright.green,
    borderRadius: 10,
    marginBottom: 20,
  },

  btnsContainer: {
    width: '100%',
    alignItems: 'center',
  },

  keyText: {
    color: globantBright.text,
    fontSize: 15,
    paddingVertical: 8,
  },

  btns_title: {
    color: globantBright.text,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: globantBright.green,
    borderRadius: 10,
    fontSize: 15,
  },

  flatlist: {
    paddingHorizontal: 15,
    paddingTop: 5,
    height: '60%',
  },

  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globantBright.inputBg,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: globantBright.green,
    margin: '0.5%',
    width: '32%',
    elevation: 5,
  },
  pressableTxt: {
    color: globantBright.text,
  },
  skillsText: {
    width: '100%',
    color: globantBright.text,
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
  },
  userImg: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    marginBottom: 16,
  },
  panel: {
    padding: 20,
    backgroundColor: globantBright.bg,
    borderWidth: 0.5,
    borderColor: globantBright.gray,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 27,
    color: globantBright.text,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: globantBright.text,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: globantBright.green,
    alignItems: 'center',
    marginVertical: 8,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: globantBright.bg,
  },
});

export default styles;
