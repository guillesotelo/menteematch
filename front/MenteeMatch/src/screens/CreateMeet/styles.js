import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    module: {
        flex: 1, 
        backgroundColor: 'white'
    },
    container: {
        // borderWidth: 2,
        // borderColor: 'blue',
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        // justifyContent: 'center',
        width: '80%'
    },
    meetContainer: {

    },
    title: {
        marginBottom: '10%',
        fontSize: 25
    },
    date: {
        margin: 20,
        height: 140
    },
    input: {
        width: '100%',
        height: 54,
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        marginBottom: 15,
        backgroundColor: '#efefef'
      },
    placeholder: {
        color: '#606060'
    },
    dropDown: {
        alignSelf: 'center',
        backgroundColor: '#efefef'
    },
    error: {
        color: '#ff0039',
        fontSize: 14,
        marginLeft: -190,
        padding: -2,
      },
    notContainer:{
        flex: 1,
        alignItems: 'center'
    },
    not: {
        paddingTop: '20%',
        alignSelf: 'center',
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
        marginBottom: 30
    },
    scroll: {
        alignItems: 'center',
    },

})

export default styles;