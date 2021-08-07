import { globantBright } from '../../assets/styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        // borderWidth: 2,
        // borderColor: 'blue',
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        // justifyContent: 'center',
        width: '100%'
    },
    text: {
        borderWidth: 2
    },
    title: {
        marginBottom: '10%',
        fontSize: 26
    },
    not: {
        marginTop: '60%',
        marginBottom: '25%',
        fontSize: 20
    },
    module: {
        borderWidth: 3,
        borderColor: globantBright.violet,
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        elevation: 12,
        backgroundColor: globantBright.bg,
        marginHorizontal: 10,
        width: 330
    },
    meetTitle: {
        fontSize: 19,
        color: 'black'
    },
    description: {
        marginTop: 5,
        fontSize: 15,
        color: 'black'
    },
    date: {
        marginTop: 5,
        fontSize: 13,
        color: 'gray'
    },
    new: {
        marginTop: 40,
        width: '60%'
    },
    deleteBtn: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#f2dede',
        height: 45,
        width: 110,
    },
    scroll: {
        alignItems: 'center',
      },
})

export default styles;