import { StyleSheet } from 'react-native';
import * as scale from '../../Utility/util'
import * as COLOR from '../../constants/colors'
import * as fonts from '../../constants/fonts/index'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        padding: 15,
        fontSize: scale.normalize(17),
        // color: scale.changeFontColor("#6b6b6a"),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    bottomView: {
        width: '100%',
        height: 45,
        alignItems: 'flex-start',
    },
    iconNext: {
        width: 15,
        height: 15,
        position: "absolute",
        right: 10,
        bottom: 15
    }
});
