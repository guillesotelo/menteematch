import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: 200,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    marginLeft: 20,
  },
  text: {
    fontSize: 25,
    fontFamily: 'H',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});

export default styles;
