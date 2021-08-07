import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    marginTop: '1.5%',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  imgContainer: { flex: 3, alignItems: 'center' },
  message: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
