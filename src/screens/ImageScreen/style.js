import { StyleSheet, Dimensions } from 'react-native';
import * as COLOR from '../../constants/colors'

let width = Dimensions.get("screen").width

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignSelf: "center",
        margin: 5,
        width: "100%",
        height: "95%"
    },
    imageStyle: {
        width: '100%',
        height: "100%"
    },
    rowContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20,
        height: 20,
        width: 20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingLeft: 15
    },
    saperator: {
        backgroundColor: 'gray',
        height: 0.5,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 10
    },
    cancelButton: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
});