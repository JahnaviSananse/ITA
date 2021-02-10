import { Dimensions, StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';
import * as CONSTANT from '../../constants/constant';
import * as FONT from '../../constants/constant';
import * as fonts from '../../constants/fonts/index';

let height = Dimensions.get("screen").height
let width = Dimensions.get("screen").width
export default styles = StyleSheet.create({
    mainKeyboardView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "red"
    },
    keyboardView: {
        width: CONSTANT.SCREEN_WIDTH,
        height: CONSTANT.SCREEN_HEIGHT,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainSignup: {
        marginTop: 10,
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    signClick: {
        backgroundColor: 'transparent',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    formContainer: {
        width: '100%',
        // height: '100%',
        paddingTop: 10,
        paddingBottom: 20,
        // paddingBottom: 20,
        borderRadius: 2,
        paddingHorizontal: 25,
        backgroundColor: "white"
    },
    passwordTextFieldContainer: {
        backgroundColor: "transparent",
        flexDirection: "row"
    }, returnToSignInButton: {
        alignSelf: "center",
        height: 30,
        flexDirection: "row",
    },
    returnToSignInText: {
        alignSelf: "center",
        color: COLORS.BLUE,
        fontSize: 13,
        fontFamily: fonts.FONT_SFPRO_REGULAR,
    },
    placeHolderContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR, fontWeight: '300'
    },
    textContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
    financeText:{
        fontSize: FONT.ITEMS_FONT,
		fontFamily: fonts.FONT_SFPRO_MEDIUM,
		color: COLORS.PRIMARY
    },
    loginFormContainer: {
		// backgroundColor: "red",
		height: '90%',
		width: '90%',
		borderRadius: 2,
		justifyContent: 'center'
	},
});
