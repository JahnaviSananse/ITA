import { StyleSheet, Platform } from 'react-native';
import * as color from '../../../constants/colors'
import * as fonts from '../../../constants/fonts/index'
import * as scale from '../../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.INDICATOR,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    text: {
        fontSize: scale.normalize(18),
        paddingVertical: 10,
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    iconStyle: {
        height: 24,
        width: 24,
    },
    ButtonTouch: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        resizeMode: 'contain',
    }
});

