import { StyleSheet, Platform } from 'react-native';
import * as color from '../../../constants/colors'
import * as fonts from '../../../constants/fonts/index'
import * as scale from '../../../Utility/util'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 10,
        marginTop: 10,
        //width: '100%',
        padding: 2

    },
    titleContainer: {
        marginLeft: 10,
        marginTop: 5,
        flexDirection: "row",
        //color: 'black',

    },
    titleText: {
        // fontWeight: 'bold',
        fontSize: scale.normalize(12),
        width: '100%',
        color: "black",
        fontFamily: fonts.FONT_SFPRO_BOLD
    },
    currencyText: {
        // fontWeight: 'bold',
        fontSize: scale.normalize(10),
        position: "absolute",
        bottom: 0,
        right: 10,
        color: "black",
        fontFamily: fonts.FONT_SFPRO_BOLD

    },
    imageContainer: {
        marginLeft: 10,
        marginTop: 5,
        flexDirection: "row"
    },
    imageStyle: {
        width: 15,
        height: 15,
        alignSelf: "center"
    },
    verticalLineContainer: {
        borderLeftWidth: 1,
        borderLeftColor: '#8bb2b5',
        marginLeft: 10,
        height: '80%'
    },
    descText: {
        paddingLeft: 10,
        fontSize: scale.normalize(17),
        paddingRight: 10,
        color: "black",
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    categoryContainer: {
        marginLeft: 10,
        marginTop: 5,
        flexDirection: "row"
    },
    countryText: {
        fontSize: scale.normalize(12),
        color: "gray",
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    categoryText: {
        marginLeft: 10,
        marginBottom: 5,
        fontSize: scale.normalize(12),
        color: "gray",
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    cornerImage: {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: 8,
        width: 8
    }
});