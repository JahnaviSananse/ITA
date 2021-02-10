import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';
import * as fonts from '../../constants/fonts/index';
import * as scale from '../../Utility/util';

export default (styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bannerContainer: {
		flexDirection: 'column',
		marginBottom: 0,
		// backgroundColor: scale.changeBackgroundColor("#F2F2F2"),
		width: '100%',
		alignItems: 'flex-start'
		// borderBottomColor: "black",
		// borderBottomWidth: StyleSheet.hairlineWidth
	},
	TextBannerTop: {
		paddingTop: 15,
		paddingLeft: 15,
		//fontWeight: "bold",
		fontSize: scale.normalize(16),
		fontFamily: fonts.FONT_SFPRO_MEDIUM
	},
	TextBannerBottom: {
		paddingTop: 2,
		paddingBottom: 15,
		paddingLeft: 15,
		fontSize: scale.normalize(13),
		fontFamily: fonts.FONT_SFPRO_LIGHT
		// color: scale.changeFontColor("#757575"),
		//fontSize: scale.normalize(14)
	},
	textSeeAllVideo: {
		paddingVertical: 10,
		paddingLeft: 15,
		color: '#43AAB0',
		fontSize: scale.normalize(12),
		fontFamily: fonts.FONT_SFPRO_SEMI_BOLD
	},
	playButton: {
		height: 60,
		width: 60,
		position: 'absolute'
	},
	videoContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},

	bannerTitle: {
		paddingTop: 10,
		paddingLeft: 15,
		fontSize: scale.normalize(15),
		fontFamily: fonts.FONT_SFPRO_MEDIUM
	},
	bannerDesc: {
		paddingTop: 5,
		paddingBottom: 15,
		paddingLeft: 15,
		fontFamily: fonts.FONT_SFPRO_LIGHT,
		// color: scale.changeFontColor("#757575"),
		fontSize: scale.normalize(14)
	}
}));
