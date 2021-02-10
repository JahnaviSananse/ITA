import { StyleSheet, Platform } from 'react-native';
import * as color from '../../../constants/colors'
import * as scale from './../../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.INDICATOR,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 15,
        paddingRight: 0,
        height: 70
    },
    text: {
        color: color.TAB_NORMAL,
        fontSize: 18
    },
    headerTitle: {
        fontSize: scale.normalize(30),
        paddingHorizontal: 10,
        paddingBottom: 0,
    },
    ButtonTouch: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        paddingVertical: 10,
    },
    iconStyles: {
        width: 22,
        height: 22
    }
});