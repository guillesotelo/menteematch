import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btns_title: {
    borderRadius: 10,
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 6,
    width: '100%',
    height: '100%',
  },

  optionsContainer: {
    width: '85%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  selectedSkills: {
    opacity: 0.8,
  },
});

export default styles;
