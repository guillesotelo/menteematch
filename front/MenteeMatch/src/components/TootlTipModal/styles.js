import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
  },
  likeButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: '#39B54A',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 17,
    borderRadius: 10,
    width: '70%',
    backgroundColor: '#20252C',
  },
  msgContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    height: '50%',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 8,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  flecha: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderTopWidth: 12.5,
    borderBottomWidth: 12.5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: '#20252C',
  },
});

export default styles;
