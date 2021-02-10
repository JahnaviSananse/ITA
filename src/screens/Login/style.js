import { Dimensions, StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';
import * as CONSTANT from '../../constants/constant';
import * as FONT from '../../constants/constant';
import * as fonts from '../../constants/fonts/index';
import * as scale from '../../Utility/util';

let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;
export default (styles = StyleSheet.create({
	mainKeyboardView: {
		height: '100%',
		width: '100%',
		backgroundColor: 'red'
	},
	container: {
		flex: 1
		// flexDirection: "row",
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
		flex: 1
	},
	formContainer: {
		// marginHorizontal: 10,
		paddingTop: 15,
		paddingHorizontal: 25,
		marginTop: 8,
		borderRadius: 5,
		// marginTop: ((height * 10) / 100),
		backgroundColor: 'white'
	},
	passwordTextFieldContainer: {
		flexDirection: 'row',
		color: 'yellow'
	},
	remembermeContainer: {
		paddingVertical: 5,
		width: '100%',
		height: 25,
		flexDirection: 'row'
	},
	checkboxImage: {
		height: 15,
		width: 15,
		alignSelf: 'center'
	},
	remembermeText: {
		paddingLeft: 5,
		alignSelf: 'center',
		//fontSize: FONT.FONT_SMALL,
		fontFamily: fonts.FONT_SFPRO_REGULAR,
		fontSize: scale.normalize(12),
		// fontFamily: "SF Pro Text",
		color: COLORS.BLUE
	},
	financeText:{
fontSize: FONT.ITEMS_FONT,
		fontFamily: fonts.FONT_SFPRO_MEDIUM,
		color: COLORS.PRIMARY
	},
	signupOptionContainer: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 30,
		marginVertical: 10,
		marginHorizontal: 0,
		flexDirection: 'row',
		alignSelf: 'center',
		backgroundColor: 'white'
	},
	forgotPasswordText: {
		alignSelf: 'center',
		fontSize: FONT.FONT_SMALL,
		fontFamily: fonts.FONT_SFPRO_BOLD,
		color: COLORS.SECONDARY
	},
	signupText: {
		alignSelf: 'center',
		fontSize: FONT.FONT_SMALL,
		fontFamily: fonts.FONT_SFPRO_BOLD,
		color: COLORS.SECONDARY
	},
	privacyContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 70,
		marginBottom: 10
	},
	privacyText: {
		alignSelf: 'center',
		// textDecorationLine: 'underline',
		paddingBottom: 0,
		paddingTop: 10,
		color: COLORS.BLUE,
		fontSize: FONT.FONT_SMALL,
		fontFamily: fonts.FONT_SFPRO_REGULAR,
		fontSize: scale.normalize(12)
	},
	copyRightText: {
		alignSelf: 'center',
		color: COLORS.BLUE,
		// fontFamily: "SF Pro Text",
		fontSize: FONT.FONT_SMALL,
		fontFamily: fonts.FONT_SFPRO_REGULAR,
		fontWeight: '300',
		paddingHorizontal: 10,
		textAlign: 'center',
		fontSize: scale.normalize(10)
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	LoginContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginFormContainer: {
		// backgroundColor: "red",
		height: '90%',
		width: '90%',
		borderRadius: 2,
		justifyContent: 'center'
	},
	copyRightContainer: {
		position: 'absolute',
		bottom: 30,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginAsGuestContainer: {
		height: 30,
		alignSelf: 'center',
		flexDirection: 'row'
		// backgroundColor: "red"
	},
	loginAsGuestText: {
		alignSelf: 'center',
		// fontFamily: fonts.FONT_SFPRO_REGULAR,
		fontFamily: fonts.FONT_SFPRO_LIGHT,
		color: '#253647'
		// fontSize: scale.normalize(12),
	},
	touchableButtonLeft: {
		paddingVertical: 5,
		paddingRight: 25
	},
	touchableButtonRight: {
		paddingVertical: 5,
		paddingLeft: 25
	},
	privacyContainer: {
		borderBottomColor: '#1D3444',
		marginBottom: 5,
		borderBottomWidth: 0.5
	},
	placeHolderContainer: {
		fontFamily: fonts.FONT_SFPRO_REGULAR,
		fontWeight: '300'
	},
	textContainer: {
		fontFamily: fonts.FONT_SFPRO_REGULAR
	}
}));
