import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    backgroundColor: '#F5F6F7',
    marginVertical: 15,
    borderWidth: 2,
    borderRadius: 100,
  },

  inputs: {
    width: '100%',
    alignItems: 'center',
  },

  error: {
    color: 'red',
    fontSize: 16,
  },

  create: {
    paddingTop: 40,
  },
});

export default styles;
