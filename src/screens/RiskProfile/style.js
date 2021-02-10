import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as fonts from '../../constants/fonts/index'
import * as scale from '../../Utility/util'

let width = Dimensions.get("screen").width
let height = Dimensions.get("screen").height

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

    },
    navBar: {
        height: 100,
        backgroundColor: "white",
        elevation: 3
    },
    viewContainer: {
        // backgroundColor: scale.changeBackgroundColor('#f3f3f3'),
        width: '100%',
        height: '100%'
    },
    genderViewContainer: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        display: 'none',
    },
    firstStepContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },
    inputTextContainer: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        marginTop: 20,
        color: scale.changeFontColor("#000000"),
        justifyContent: 'center',

    },
    text: {
        textAlign: 'right',
        marginTop: 10,
        marginRight: 15,
        // color: scale.changeFontColor("#000000"),
        fontSize: scale.normalize(16),
        fontFamily: fonts.FONT_SFPRO_LIGHT
    },
    genderText: {
        textAlign: 'center',
        marginTop: 10,
        color: scale.changeFontColor("#000000"),
    },
    textSelected: {
        textAlign: 'center',
        marginTop: 10,

    },
    titleContainer: {
        fontSize: scale.normalize(16),
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        // color: scale.changeFontColor("#000000"),
        width: (width * 0.9),
        fontFamily: fonts.FONT_SFPRO_MEDIUM

    },
    borderContainer: {
        borderBottomWidth: 4,
        borderBottomColor: '#8bb2b5',
        width: 40,
        marginTop: 10,
    },
    headerViewContainer: {
        alignItems: 'center',
        //flex: 1,
        //backgroundColor: 'green',
        width: '100%',
        height: '100%',
        marginTop: 20,
        /// marginLeft: -1,
        //paddingLeft: 1

    },
    flatListContainer: {
        width: '100%',
        height: '100%',
        //flex: 1,
        marginTop: 20,
        //marginBottom: 100,
    },
    gridFlatListContainer: {
        width: '100%',
        height: '100%',
        marginTop: 20,

    },
    buttonViewContainer: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    gridItemViewContainer: {
        marginLeft: 10,
        marginTop: 10,
        //marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',

    },
    gridItemContainer: {
        marginTop: 10,
        padding: 5,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalItemContainer: {
        height: 100,
        width: (width * 0.8),
        //flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
        //padding: 20,
        borderRadius: 5
    },
    viewRowContainer: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        //paddingRight: 2,
        // backgroundColor: 'red',
        marginLeft: 1,
        // marginRight: 3
    },
    verticalFlatListTextContainer: {
        textAlign: 'center',
        padding: 10,
        fontFamily: fonts.FONT_SFPRO_REGULAR

    },
    modalContainer: {
        alignContent: 'center',
        height: '100%',
        width: '100%',
        // backgroundColor: scale.changeBackgroundColor("#FFFFFF"),

    },
    modalQuestionText: {
        fontSize: scale.normalize(18),
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        // color: scale.changeFontColor("#000000")
    },
    modalText: {
        padding: 10, marginLeft: 10,
        marginRight: 10,
        textAlign: 'justify',
        // color: scale.changeFontColor("#000000")
    },

    childItemsContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    actionButtonIcon: {
        width: 70,
        height: 70,
        zIndex: 50,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? (height * 0.1) : (height * 0.08),
        right: 15,
        justifyContent: 'center',
    },
    actionButtonImg: {
        //position: 'absolute',
        width: 70,
        height: 70,
        //bottom: '50%',
        resizeMode: 'contain'
    },
    addView: {
        height: 100
    },
    placeHolderContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR, fontWeight: '300'
    },
    textContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },

});
