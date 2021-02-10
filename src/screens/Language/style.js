import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';
import * as fonts from '../../constants/fonts/index';
import * as scale from '../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    SectionHeader: {
        // backgroundColor: "#FFFFFF",
        fontSize: scale.normalize(17),
        padding: 10,
        color: 'black',
        fontFamily: fonts.FONT_SFPRO_SEMI_BOLD
        //fontWeight: 'bold'
    },
    SectionListItemS: {
        fontSize: scale.normalize(17),
        padding: 10,
        // color: '#696969',
        // backgroundColor: "#FFFFFF",
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    iconStyle: {
        width: 24,
        height: 24,
        right: 20,
        alignSelf: "center",
        position: "absolute"
    },
    container: {
        flex: 1,
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
    },
    SectionHeader: {
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
        fontSize: scale.normalize(17),
        padding: 10,
        marginLeft: 10,
        // color: scale.changeFontColor('#000000'),
        fontWeight: 'bold'
    },
    SectionListItemS: {
        fontSize: scale.normalize(17),
        paddingTop: 10,
        paddingBottom: 10,
        color: scale.changeFontColor('#696969'),
        backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
    },
    iconStyle: {
        width: 24,
        height: 24,
        right: 20,
        alignSelf: "center",
        position: "absolute"
    }
});
