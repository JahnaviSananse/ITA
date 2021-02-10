import React, { Component } from 'react';
import { View, Platform, SafeAreaView, Image, Dimensions, Text, AsyncStorage, StatusBar } from 'react-native';
import styles from './style';
import * as images from '../../resources/index';
import Header from '../../components/atoms/Header/index';
import * as ATOMS from '../../components/atoms';
import * as utility from '../../Utility/util';
import FastImage from 'react-native-fast-image';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import { shareData } from '../../store/Auth/actions';
import { addRemoveFavorite, clearData, getFavoriteList } from '../../store/Library/actions';

import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
class YouTubeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video_id: '',
			height: 299,
			isShowStatus: false,
			fullscreen: false
		};
		AsyncStorage.setItem('isVideo', '1')
	}
	handleReady = () => {
		setTimeout(() => this.setState({ height: 300 }), 2000);
	};
	componentDidMount() {
		Orientation.unlockAllOrientations();
		Orientation.addOrientationListener(this._orientationDidChange);
	}
	componentWillMount() {
		// setTimeout(() => {
		// 	this.setState({
		// 		height: 297
		// 	})
		// }, 1500);
		Orientation.getOrientation((err, orientation) => {
			console.log(`Current Device Orientation: ${orientation}`);
		});
		this.setState({
			video_id: this.props.navigation.getParam('video_id')
		});
	}

	componentWillUnmount() {
		AsyncStorage.removeItem('isVideo')
		Orientation.getOrientation((err, orientation) => {
			console.log(`Current Device Orientation: ${orientation}`);
		});
		Orientation.lockToPortrait();
		// Remember to remove listener
		Orientation.removeOrientationListener(this._orientationDidChange);
	}
	_orientationDidChange = (orientation) => {
		if (orientation === 'LANDSCAPE') {
			// do something with landscape layout
			console.log('orientation', orientation);
			this.setState({
				fullscreen: true,
				height: 299
			});
		} else {
			this.setState({
				fullscreen: false,
			});
			setTimeout(() => {
				this.setState({
					height: 300
				})
			}, 2000);
		}
	};

	render() {
		setTimeout(() => {
			this.setState({
				height: 298
			})
		}, 4000);
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#FFFFFF') }}>
					<StatusBar
						backgroundColor={utility.changeHeaderColor('#F3F3F3')}
						barStyle={this.props.userData.night_mode ? 'light-content' : 'dark-content'}
					/>
					<Header
						leftImage={utility.changeCloseButton()}
						backgroundColor={utility.changeHeaderColor('#F3F3F3')}
						redirectLeft={() => this.props.navigation.goBack()}
					/>
					<View
						style={[styles.imageContainer, { justifyContent: 'center', alignItems: 'center' }]}
						onLayout={StatusBar.setHidden(false)}
					>
						{Platform.OS === 'android' ? (
							<YouTube
								ref={(component) => {
									this._youTubeRef = component;
								}}
								apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
								videoId={this.state.video_id}
								play={true}
								controls={1}
								fullscreen={this.state.fullscreen}
								// onReady={this.handleReady}
								// onChangeFullscreen={() => {
								// 	this.setState({
								// 		isShowStatus: !this.state.isShowStatus
								// 	})
								// }}
								style={{
									height: this.state.height,
									width: '100%',
									top: -50
								}}
							/>
						) : (
								// <YouTube
								// 	ref={(component) => {
								// 		this._youTubeRef = component;
								// 	}}
								// 	play={false} // control playback of video with true/false
								// 	hidden={false} // control visibility of the entire view
								// 	playsInline={true} // control whether the video should play inline
								// 	loop={false}
								// 	apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
								// 	videoId={this.state.video_id}
								// 	play={true}
								// 	controls={1}
								// 	onReady={this.handleReady}
								// 	fullscreen={true}
								// 	onChangeFullscreen={() => {
								// 		this.setState({
								// 			isShowStatus: !this.state.isShowStatus
								// 		})
								// 	}}
								// 	style={{
								// 		height: this.state.height,
								// 		alignSelf: 'stretch',
								// 		width: '100%',
								// 		top: -50
								// 	}}
								// />

								<YouTube
									ref={(component) => {
										this._youTubeRef = component;
									}}
									apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
									videoId={this.state.video_id}
									play={true}
									fullscreen={this.state.fullscreen}
									controls={1}
									onError={(e) => {
										alert(e.error);
									}}
									onChangeFullscreen={() => {
										this.setState({
											isShowStatus: !this.state.isShowStatus
										});
									}}
									style={{
										height: this.state.height,
										width: '100%',
										top: -50,
										backgroundColor: 'red'
									}}
								/>
							)}
						{/* <YouTube
							ref={(component) => {
								this._youTubeRef = component;
							}}
							apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
							videoId={this.state.video_id}
							play={true}
							controls={1}
							style={{
								height: 300,
								width: '100%',
								top: -50
							}}
						/> */}
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => {
	const { userData, current_language } = state.user;
	return {
		loadingShare: state.auth.loadingShare,
		current_language,
		userLoading: state.user.loading,
		userData
	};
};
export default connect(mapStateToProps, { addRemoveFavorite, clearData, getFavoriteList, shareData })(YouTubeScreen);