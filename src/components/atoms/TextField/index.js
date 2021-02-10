import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { IC_FINGERPRINT, IC_FACEID } from '../../../assets';
import styles from './style';
import { connect } from 'react-redux';
import * as utility from '../../../Utility/util';

class TextField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			night_mode: false,
			current_language: 'en'
		};
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.userData !== this.props.userData) {
			if (this.props.userLoading !== true) {
				this.setState({
					night_mode: this.props.userData.night_mode === 1 ? true : false,
					current_language: this.props.userData.current_language
				});
			}
		}
	}
	render() {
		const { value, label, onChangeText, style, maxLength, fontSize, fontcolor } = this.props;

		let isBio = false;
		if (this.props.isBio) {
			isBio = this.props.isBio;

		}
		let isFaceID = false;
		if (this.props.isFaceID) {
			console.log(this.props.isFaceID ? 'true' : 'false')
			isFaceID = this.props.isFaceID;
		}
		let keyboardType = this.props.keyboardType ? this.props.keyboardType : 'default';
		let length = maxLength ? maxLength : 60;
		return (
			<View>
				<View style={[style, styles.extraPadding, { borderBottomColor: utility.changeFontColor('#293645') }]}>
					<Text style={[styles.placeHolder, { color: utility.changeFontColor('#696969') }]}>{label}</Text>
					<TextInput
						maxLength={length}
						keyboardType={keyboardType}
						secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
						style={[
							{
								height: 50,
								color: utility.changeFontColor('#293645'),
								fontWeight: '300',
								fontSize: fontSize,
								paddingTop: 5
							}
						]}
						onChangeText={(text) => {
							onChangeText(text);
						}}
						fontSize={fontSize}
						value={value}
						// placeholder={placeholder}
						// placeholderTextColor={'gray'}
						underlineColorAndroid={'rgba(0,0,0,0)'}
					/>
				</View>
				{isBio && (
					<View style={{ position: 'absolute', height: 50, width: 40, right: 20 }}>
						<TouchableOpacity
							onPress={() => {
								this.props.onBioPress();
							}}
							style={{
								width: '100%',
								height: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}

						>
							<Image
								source={this.props.isFaceID === true ? IC_FACEID : IC_FINGERPRINT}
								//source={IC_FACEID}
								style={{ width: '60%', height: '60%', resizeMode: 'contain', }}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}
// export default TextField;

const mapStateToProps = (state) => {
	const { userData, current_language } = state.user;
	return {
		userData,
		current_language
	};
};

export default connect(mapStateToProps, null)(TextField);
