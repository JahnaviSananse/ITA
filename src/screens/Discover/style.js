import { StyleSheet } from 'react-native';
import * as fonts from '../../../constants/fonts/index'


export default styles = StyleSheet.create({
    navBar: {
        height: 50,
    },
    descContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    videoTitle: {
        fontSize: 18,
        color: 'black'
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1
    },
    videoStats: {
        fontSize: 15,
        fontFamily: "SF Pro Text",
        paddingTop: 10
    },
    closeBtn: {
        height: 40,
        width: 40,
        alignSelf: 'flex-end',
        justifyContent: "center"
    }
});
