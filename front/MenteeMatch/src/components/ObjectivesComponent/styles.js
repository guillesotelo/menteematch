import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 0.5,
    padding: 20,
  },

  title: {
    fontSize: 20,
    textAlign: 'justify',
  },

  add_objectives: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },

  content: {
    flex: 6.5,
    /* height: 392, */
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: 5,

    marginHorizontal: 5,
  },

  btns_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  btn: {
    width: 53,
    marginLeft: 10,
  },
});

export default styles;
