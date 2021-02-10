import { StyleSheet } from 'react-native';
import * as scale from '../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: scale.changeBackgroundColor("#FFFF")
    },
    viewContainer: {
        backgroundColor: scale.changeBackgroundColor("#FFFF"),
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        color: scale.changeFontColor("#000000"),
        fontWeight: '500',
        fontSize: 20,
        marginTop: 5
    },

    headerContainer: {
        //position: 'absolute',
        flexDirection: 'row'
    },
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
    messageContainer: {
        width: '80%',
        minHeight: 40,
        borderColor: '#a1a1a1', //a1a1a1
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        marginTop: 8,
        marginRight: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    }

});
