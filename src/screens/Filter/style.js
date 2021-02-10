import { StyleSheet, Dimensions } from 'react-native';
import * as scale from '../../Utility/util';
import * as fonts from '../../constants/fonts/index';

const width = Dimensions.get('screen').width;
export default (styles = StyleSheet.create({
	container: {
		flex: 1
		// backgroundColor: "#FFFFFF",
	},
	headerContainer: {
		flexDirection: 'row',
		width: '100%',
		// backgroundColor: color.INDICATOR,
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50
	},
	text: {
		fontSize: scale.normalize(18),
		paddingVertical: 10,
		fontFamily: fonts.FONT_SFPRO_MEDIUM
	},
	iconStyle: {
		height: 24,
		width: 24
	},
	ButtonTouch: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		resizeMode: 'contain'
	},
	navBar: {
		height: 100,
		backgroundColor: 'white',
		elevation: 3
	},
	countrySelection: {
		width: width * 0.43,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#FFFFFF',
		margin: 8,
		borderColor: '#8cb4b6',
		borderWidth: 1,
		borderRadius: 5
	},
	iconStyle: {
		height: 15,
		width: 15
	},
	accordianHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 56,
		paddingLeft: 15,
		paddingRight: 25,
		alignItems: 'center'
	},
	accordianHeaderTitle: {
		width: width - 90,
		fontSize: scale.normalize(17),
		fontWeight: 'bold'
		// color: '#000000'
	},
	countryContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));
