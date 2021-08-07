import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
    fontSize: 24,
    position: 'relative',
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    elevation: 1,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,

    margin: 5,
    elevation: 5,
    width: 120,
    height: 75,
  },
  pressableImg: {
    position: 'absolute',
    top: 32,
    left: 32,
  },

  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  menteeQtyBox: {
    alignSelf: 'center',
    width: 125,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menteeQtyTitleTxt: {
    padding: 16,
    fontSize: 18,
  },
  menteeQtyTxt: {
    textAlignVertical: 'center',
    fontSize: 18,
  },
  menteeQtyBtn: {
    width: 25,
    height: 25,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  footer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  flatListAlign: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default styles;
