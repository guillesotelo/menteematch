import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  userImg: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
  },

  pressableFoto: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  userInfo: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 40,
    width: '85%',
    borderRadius: 10,
    marginBottom: 10,
  },

  btnsContainer: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
  },

  keyText: {
    fontSize: 15,
    paddingVertical: 8,
  },

  flatlist: {
    flex: 8,
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },

  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: '0.5%',
    width: '32%',
    elevation: 5,
  },
  panelView: {
    alignItems: 'center',
  },
  panel: {
    padding: 20,
    borderWidth: 0.5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;
