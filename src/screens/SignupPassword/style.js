import { StyleSheet, Dimensions } from 'react-native';
import * as CONSTANT from '../../constants/constant';
import * as FONT from '../../constants/constant'
import * as fonts from '../../constants/fonts/index'
import * as COLORS from '../../constants/colors'

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
        paddingBottom: 20,
        paddingHorizontal: 25,
        paddingTop: 10,
        backgroundColor: "white",
        borderRadius: 2,
        width: '90%'
    },
    passwordTextFieldContainer: {
        backgroundColor: "transparent",
        flexDirection: "row"
    },
    linkButton: {
        padding: 5,
        fontSize: 12,
        color: "#233746"
    },
    clickableText: {
        textDecorationLine: 'underline'
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "baseline",
        alignSelf: "center"
    },
    mainFormContainer: {
        flex: 3,
        // backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },
    signFormContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '90%'
    },
    signupButton: {
        borderRadius: 5,
        backgroundColor: "#293645",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 10
    },
    signupText: {
        color: "white",
        fontWeight: '300',
        width: 200,
        textAlign: "center",
        paddingVertical: 5,
    },
    backToLoginContainer: {
        flex: 1,
        // backgroundColor: "purple",
        // justifyContent: "center",
        // alignItems: "center"
    },
    backToLoginBtn: {
        alignSelf: "center",
        height: 30,
        flexDirection: "row"
    },
    placeHolderContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR, fontWeight: '300'
    },
    textContainer: {
        fontFamily: fonts.FONT_SFPRO_REGULAR
    },
});
