import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';
import * as fonts from '../../constants/fonts/index';

import * as scale from '../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
    },
    SectionHeader: {
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
        fontSize: scale.normalize(17),
        paddingTop: 20,
        paddingLeft: 10,
        color: scale.changeFontColor("red"),        
        //fontWeight: 'bold',
        fontFamily: fonts.FONT_SFPRO_SEMI_BOLD
    },
    SectionListItemS: {
        fontSize: scale.normalize(19),
        padding: 8,
        paddingLeft: 15,
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginLeft: 15,
        alignSelf: "center"
    },
    switchStyle: {
        position: "absolute",
        right: 15,
        alignSelf: "center",
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
    },
    iconNextStyle: {
        width: 15,
        height: 15,
        position: "absolute",
        right: 15,
        alignSelf: "center"
    },
    textSignout: {
        color: "blue",
        marginTop: 20,
        fontSize: 20,
        marginLeft: 15
    }
});
