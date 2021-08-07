import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
  },

  scroll: {
    alignItems: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F6F7',
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 50,
  },

  inputs: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },

  error: {
    color: '#ff0039',
    fontSize: 14,
    marginLeft: -190,
    padding: -2,
  },
});

export default styles;
