import { StyleSheet } from 'react-native';
import * as scale from '../../Utility/util';

export default (styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	},
	viewContainer: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: 'black',
		fontWeight: '500',
		fontSize: 20,
		marginTop: 5
	},
	borderContainer: {
		borderBottomWidth: 3,
		borderBottomColor: 'black',
		width: 35,
		marginTop: 5
	},
	moderateText: {
		color: '#8bb2b5',
		fontSize: 30,
		fontWeight: '600',
		marginTop: 5
	},
	normalText: {
		// color: scale.changeFontColor("#000000"),
		fontSize: 14,
		fontWeight: 'normal',
		marginLeft: 10
	},
	modalQuestionText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 10,
		marginLeft: 10
	},
	modalText: {
		paddingTop: 5,
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'justify'
	},
	nodataImgContainer: {
		width: 100,
		height: 100
	},
	noDataText: {
		textAlign: 'center',
		margin: 10,
		// color: scale.changeFontColor("#000000"),
		fontWeight: 'normal',
		fontSize: 16
	},
	headerContainer: {
		flexDirection: 'row'
	}
}));
