import React, { Component } from 'react';
import {
	View,
	Platform,
	Text,
	TouchableOpacity,
	SafeAreaView,
	ImageBackground,
	Image,
	Dimensions,
	StatusBar,
	ScrollView
} from 'react-native';
import { Header } from '../../components/atoms';
import * as images from '../../resources/index';
import * as fonts from '../../constants/fonts/index';
import styles from './style';
import * as utility from '../../Utility/util';
import { updateUserInfo } from '../../store/User/actions';
import { clearRecentData } from '../../store/RecentFav/actions';
import { connect } from 'react-redux';
import language from '../../Localization';
let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

class NotSignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true
		};
	}
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	componentWillMount() {
		utility.recordScreen('NotSignIn Screen');
	}

	updateRedux() {
		this.props.updateUserInfo();
		this.props.clearRecentData();
	}

	render() {
		let height = Dimensions.get('screen').height;
		let width = Dimensions.get('screen').width;
		return (

			<View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

				<ImageBackground style={{ height: '100%', width: '100%' }} source={images.BACKGROUND_IMAGE}>
					<View style={{ height: '100%', width: '100%', justifyContent: 'center', }}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.push('GuestTabbarScreen')
							}}
							style={{
								position: 'absolute',
								top: 10, right: 0,
								marginTop: Platform.OS == 'ios' ? 30 : 10,
								width: 50,
								height: 50,
								alignSelf: 'flex-end',
								justifyContent: 'center'
							}}
						>
							<Image source={images.CLOSE} style={{ height: 20, width: 20 }} />
						</TouchableOpacity>

						<View style={{
							// flex: 2,
							justifyContent: 'center', alignItems: 'center'
						}}>
							<View style={{ width: '100%', marginBottom: 30 }}>
								<Text
									style={{
										paddingLeft: '10%',
										paddingRight: '20%',
										fontSize: utility.normalize(30),
										color: '#89B4B6',
										fontWeight: 'bold'
									}}
								>
									{language.WhySignIn}
								</Text>
							</View>
							<View style={{ width: '100%', marginTop: 20, marginBottom: 30 }}>
								<Text
									style={{
										paddingLeft: '10%',
										paddingRight: '10%',
										fontSize: utility.normalize(20),
										color: '#283D4C'
									}}
								>
									{language.NotSignInContent}
								</Text>
							</View>
						</View>

						<View
							style={{
								// flex: 1.5,
								justifyContent: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 30
							}}
						>
							<View style={{ width: '80%', justifyContent: 'space-around' }}>
								<TouchableOpacity
									onPress={() => {
										this.updateRedux();
										setTimeout(() => {
											this.props.navigation.navigate('Login');
										}, 50);
									}}
									style={{
										borderRadius: 5,
										backgroundColor: '#283D4C',
										height: 50,
										justifyContent: 'center',
										alignItems: 'center',
										marginTop: 15,
									}}
								>
									<Text style={{ color: 'white', fontSize: utility.normalize(13) }}>{language.SignIn}</Text>
								</TouchableOpacity>

								<View style={{ height: 20 }} />

								<TouchableOpacity
									onPress={() => {
										this.updateRedux();
										setTimeout(() => {
											this.props.navigation.navigate('SignUp');
										}, 50);
									}}
									style={{
										borderRadius: 5,
										borderColor: '#283D4C',
										borderWidth: 0.5,
										backgroundColor: 'white',
										height: 50,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<Text style={{ color: '#283D4C', fontSize: utility.normalize(13) }}>{language.Signup}</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{
							// flex: 2, 
							justifyContent: 'center', alignItems: 'center'
						}}>
							<View style={styles.logoContainer}>
								<Image
									style={{ width: width - 80, height: 60 }}
									resizeMode={'contain'}
									source={images.LOGO}
								/>
								<Text style={[styles.logoText, { fontSize: utility.normalize(30) }]}>
									ITA CONNECT
								</Text>
							</View>
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

export default connect(null, { updateUserInfo, clearRecentData })(NotSignIn);
