import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    alignItems: 'center',
  },

  userImg: {
    width: 100,
    height: 100,
    borderRadius: 62.5,
  },

  pressableFoto: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#000000',
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
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
