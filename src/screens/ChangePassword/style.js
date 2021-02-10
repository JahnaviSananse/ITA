import { StyleSheet } from 'react-native';
import * as COLOR from '../../constants/colors';
import * as scale from '../../Utility/util';

export default (styles = StyleSheet.create({
	container: {
		flex: 1,
		// height: '100%',
		justifyContent: 'center',
		backgroundColor: scale.changeBackgroundColor('#FFFFFF')
	},
	buttonContainer: {
		//   backgroundColor: scale.changeButtonColor("#233746"),
		// backgroundColor: "#233746",
		justifyContent: 'center',
		height: 50,
		borderRadius: 5,
		alignItems: 'center',
		marginHorizontal: 35,
		marginTop: 40
	},
	descriptionText: {
		// backgroundColor: scale.changeBackgroundColor("#FFFFFF"),
		marginHorizontal: 15,
		marginTop: '20%',
		paddingBottom: 20,
		flex: 1
		//   color: scale.changeFontColor('#696969')
	}
}));
