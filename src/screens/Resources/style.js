import { StyleSheet } from 'react-native';
import * as scale from '../../Utility/util'
import * as fonts from '../../constants/fonts'
import * as color from '../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF")
    },
    bottomView: {
        height: 50,
        width: '80%',
        // backgroundColor: scale.changeButtonColor("#56b5d0"),
        alignItems: "center",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 30
    },
    buttonText: {
        //fontWeight: "bold",
        color: "white",
        fontSize: scale.normalize(15),
        width: "100%",
        textAlign: "center",
        fontFamily: fonts.FONT_SFPRO_BOLD,

    },
    // textFont: {
    //     fontSize: scale.normalize(15),
        // color: scale.changeFontColor('rgba(0.15,0.22,0.28,1.0)')
    // },
    fundPlatformText: {
        marginTop: 15,
        // color: scale.changeFontColor("#000000"),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },

    imageTitle: {
        fontSize: scale.normalize(16),
        color: scale.changeFontColor(color.BLUE),
        fontFamily: fonts.FONT_SFPRO_LIGHT,

    },
    imageCategory: {
        fontSize: scale.normalize(20),
        color: scale.changeFontColor(color.BLUE),
        fontFamily: fonts.FONT_SFPRO_SEMI_BOLD
    },
    imageDesc: {
        width: '70%',
        fontSize: scale.normalize(14),
        color: scale.changeFontColor("#56b5d0"),
        fontFamily: fonts.FONT_SFPRO_MEDIUM,
        marginTop: 10,
    }

});
