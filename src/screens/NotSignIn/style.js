import { StyleSheet, Dimensions } from 'react-native';
import * as CONSTANT from '../../constants/constant';
import * as FONT from '../../constants/constant'
import * as COLORS from '../../constants/colors'

let height = Dimensions.get("screen").height
let width = Dimensions.get("screen").width
export default styles = StyleSheet.create({
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
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: "white",
        borderRadius: 5
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
        width: "80%",
        justifyContent: "center",
        alignContent: "center",
        bottom: 0
    },
    mainFormContainer: {
        flex: 3,
        // backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },
    signFormContainer: {
        width: '90%',
        height: '90%',
        justifyContent: "center",
        alignItems: "center"
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
        fontWeight: '300'
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
    logoText: {
        color: "#1D3444",
        fontWeight: "bold",
        alignSelf: "center",
        width: (width * 0.8),
        textAlign: "center"

    },
    titleContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    closeContainer: {
        position: "absolute",
        height: 50,
        width: 50,
        right: 5,
        top: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    closeIcon: {
        height: 20,
        width: 20
    },
    descContainer: {
        width: "100%",
        marginTop: 30
    },
    descTitle: {
        paddingLeft: '10%',
        paddingRight: '20%',
        fontSize: 30,
        color: "#89B4B6",
        fontWeight: "bold"
    },
    descriptionContainer: {
        width: "100%",
        marginTop: 20
    },
    descriptionText: {
        paddingLeft: '10%',
        paddingRight: '10%',
        fontSize: 17,
        color: "#283D4C",
    },
    ButtonContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonView: {
        width: '80%',
        justifyContent: "space-around"
    },
    signinButton: {
        borderRadius: 5,
        backgroundColor: "#283D4C",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    signupButton: {
        borderRadius: 5,
        borderColor: "#283D4C",
        borderWidth: 0.5,
        backgroundColor: "white",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    logoContainer: {
        // flex: 2,
        justifyContent: "center",
        alignItems: "center"
    }
});
