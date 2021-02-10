import { StyleSheet, Dimensions } from 'react-native';
import * as CONSTANT from '../../constants/constant';
import * as FONT from '../../constants/constant'
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
        marginHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 25,
        backgroundColor: "white",
        width: '90%',
        borderRadius: 2,
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
    codeInputContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        height: 50,
    },
    codeInputStyle: {
        fontWeight: '800',
        fontSize: 25,
        backgroundColor: "#EBEBEB",
        fontWeight: "normal",
        height: 50,
        flex: 1,
        marginRight: 5,
        textAlign: "center",
        // backgroundColor: "red"
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 10,
        // paddingHorizontal: 15,
        width: '100%'
    },
    titleText: {
        color: "#293C4B",
        fontSize: 20,
        fontWeight: "bold"
    },
    titleDesc: {
        color: "#293C4B",
        fontSize: 20
    },
    requestNewText: {
        width: '100%',
        marginTop: 20,
        color: "#8BB4B7",
        fontSize: 12
    },
    returnToSignInButton: {
        marginTop: 30,
        alignSelf: "center",
        height: 30,
        flexDirection: "row"
    },
    returnToSignInText: {
        alignSelf: "center",
        color: COLORS.BLUE,
        fontSize: 13
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainFormContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    }
});
