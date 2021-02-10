import { StyleSheet } from 'react-native';
import * as scale from '../../../Utility/util'
import * as fonts from '../../../constants/fonts/index'

export default styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 5,
        // backgroundColor: scale.changeBackgroundColor("#F2F2F2"),
        borderBottomColor: "#E4E3E2",
        borderBottomWidth: 0.5,
        width: '100%',
    },
    titleText: {
        fontSize: scale.normalize(18),
        position: "relative",
        // color: scale.changeFontColor("#000000"),
        bottom: 0,
        left: 20,
        color: "black",
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    viewAll: {
        fontSize: 30,
        alignSelf: "center",
        position: "absolute",
        right: 15,
        color: "#43AAB0",
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    itemContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    productTitle: {
        marginVertical: 5,
        //fontWeight: "bold",
        fontSize: scale.normalize(14),
        paddingLeft: 2,
        // color: "black",
        fontFamily: fonts.FONT_SFPRO_MEDIUM,
        // color: scale.changeFontColor("#000000")
    },
    productDesc: {
        fontSize: scale.normalize(10),
        paddingLeft: 2,
        paddingBottom: 10,
        // color: scale.changeFontColor("#757575"),
    },
    viewAllContainer: {
        position: "absolute",
        flexDirection: "row",
        height: 15,
        right: 15,
        height: '100%',
    },
    viewAllText: {
        fontSize: scale.normalize(12),
        paddingLeft: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        color: "#54B0B6",
    },
    viewAllButton: {
        alignSelf: "center",
        paddingLeft: 10,
        height: 8,
        width: 8
    }

});
