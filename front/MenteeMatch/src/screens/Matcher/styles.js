import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleBox_like: {
    flex: 0,
  },

  title: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 25,
  },
  subtitle: {
    fontSize: 15,
    paddingLeft: 25,
    marginBottom: 5,
  },

  subContainer_1: {
    flex: 3.8,
  },
  optionsTxt: {
    textAlign: 'center',
    fontSize: 16,
  },
  subContainer: {
    flex: 5.25,
  },

  lastText: {
    textAlign: 'center',
    paddingTop: '50%',
  },

  pressable: {
    justifyContent: 'center',
  },

  pressablePressed: {
    backgroundColor: 'gray',
  },
  flatAlign: { alignItems: 'center' },
  flatContent: {
    height: 350,
    paddingHorizontal: 6,
  },
  textCargStyle: {
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 30,
  },
  reloadMatchsBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    top: -175,
  },
  reloadMatchsTxt: {
    fontSize: 16,
    textAlign: 'center',
  },
  reloadMatchsBtn: {
    width: '35%',
  },
  reloadAllDiscardedBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeHeight: { height: 120 },
});

export default styles;
