import { StyleSheet } from 'react-native';
import * as fonts from '../../constants/fonts/index'
import * as scale from '../../Utility/util'
//let top = Platform.OS === 'ios' ? 58 : 61

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    viewContainer: {
        // backgroundColor: scale.changeBackgroundColor('#f3f3f3'),
        width: '100%',
        height: '100%',
        //padding: 10
    },
    viewScrennShot: {
        // backgroundColor: scale.changeBackgroundColor('#f3f3f3'),
    },
    text: {
        fontWeight: '500',
        fontSize: scale.normalize(20),
        marginTop: 2,
        marginLeft: 10,
        fontFamily: fonts.FONT_SFPRO_MEDIUM
    },
    borderContainer: {
        borderBottomWidth: 3,
        width: 35,
        marginTop: 5,
        marginLeft: 10
    },
    moderateText: {
        // color: '#8bb2b5',
        fontSize: scale.normalize(30),
        marginTop: 5,
        marginLeft: 10,
        fontFamily: fonts.FONT_SFPRO_SEMI_BOLD
    },
    normalText: {
        fontSize: scale.normalize(14),
        fontWeight: 'normal',
        marginLeft: 10,
        marginRight: 10,
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    modalQuestionText: {
        fontSize: scale.normalize(14),
        //fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
        // color: scale.changeFontColor('#253647'),
        fontFamily: fonts.FONT_SFPRO_BOLD
    },
    modalText: {
        paddingTop: 5,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'justify',
        // color: scale.changeFontColor('#253647'),
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    chartView: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    chartImg: {
        width: 200,
        height: 200,
    },
    chartItems: {
        width: 25,
        height: 25,
        borderRadius: 30,
        borderWidth: 6,
        backgroundColor: 'white'
    },
    chartItemView: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        alignItems: 'center',
    },

    containerFundList: {
        backgroundColor: "#FFFFFF",
        // backgroundColor: 'red',
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
