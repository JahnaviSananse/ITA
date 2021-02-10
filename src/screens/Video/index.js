/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	Alert,
	SafeAreaView,
	Modal,
	Linking,
	Dimensions,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import * as ATOMS from '../../components/atoms';
import VideoItem from '../../components/atoms/DicoverList/index';
import data from '../Discover/data.json';
import Header from '../../components/atoms/Header/index';
import * as images from '../../resources/index';
import * as TITLE from '../../constants/titles';
import language from '../../Localization';
import * as utility from '../../Utility/util';
import { getAllVideos } from '../../store/Videos/actions';
import { setRecent } from '../../store/User/actions';
import FastImage from 'react-native-fast-image';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
class Video extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			selectedItem: {},
			paged: 1,
			openVideo: false,
			url: ''
		};
		setTimeout(() => {
			this.getVidoes();
		}, 100);
	}

	getVidoes() {
		utility.recordEvent('VideoScreen : getVidoes');
		let request = {};
		request.paged = 1;
		this.props.getAllVideos(request);
	}
	componentWillMount() {
		utility.recordScreen('VideoScreen');
	}
	renderVideoPlayer() {
		let height = Dimensions.get('screen').height;
		let topMargin = height / 2 - 150;
		var video_id = utility.getVideoID(this.state.url);
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.openVideo}
					onRequestClose={() => { }}
				>
					<View
						style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: '#000000B3' }}
					/>

					<ScrollView
						style={{ backgroundColor: 'transparent' }}
						onLayout={({ nativeEvent: { layout: { width } } }) => {
							if (!this.state.containerMounted) this.setState({ containerMounted: true });
							if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
						}}
					>
						<TouchableOpacity
							onPress={() => {
								this.setState({ openVideo: false });
							}}
							style={{
								height: 40,
								width: 40,
								position: 'absolute',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'transparent',
								borderRadius: 20,
								right: 0,
								marginTop: topMargin - 45
							}}
						>
							<FastImage style={{ height: 15, width: 15 }} source={images.VIDEO_CLOSE} />
						</TouchableOpacity>
						<YouTube
							ref={(component) => {
								this._youTubeRef = component;
							}}
							apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
							videoId={video_id}
							play={true}
							controls={1}
							style={{ marginTop: topMargin, height: 300, width: '100%', backgroundColor: 'transparent' }}
						/>
					</ScrollView>
					{/* </TouchableOpacity> */}
				</Modal>
			</View>
		);
	}
	// renderVideoPlayer() {
	//     return (
	//         <View>
	//             <Modal
	//                 animationType="slide"
	//                 transparent={true}
	//                 visible={this.state.openVideo}
	//                 onRequestClose={() => {
	//                     // Alert.alert('Modal has been closed.');
	//                 }}>
	//                 <View style={{ height: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
	//                     <TouchableOpacity onPress={() => this.setState({ openVideo: false })} style={{ height: 40, width: 40, alignSelf: 'flex-end', justifyContent: "center" }}>
	// <FastImage
	//     style={{ height: 30, width: 30 }}
	//     source={images.VIDEO_CLOSE}
	// />
	//                     </TouchableOpacity>
	//                     <VideoPlayer source={{ uri: this.state.url }}   // Can be a URL or a local file.
	//                         ref={ref =>
	//                             this.player = ref
	//                         }
	//                         style={{
	//                             height: 210,
	//                             width: '100%'
	//                         }}
	//                         controls={true}
	//                         paused={false}
	//                         fullscreen={false}
	//                         playInBackground={true}
	//                     />
	//                 </View>
	//             </Modal>
	//         </View>
	//     )
	// }
	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={{ flex: 1 }}>
					<Header
						title={language.Vidoes}
						leftImage={utility.changeBackButton()}
						backgroundColor={utility.changeHeaderColor('#F3F3F3')}
						redirectLeft={() => this.props.navigation.goBack()}
					/>
					{this.state.openVideo == true && this.renderVideoPlayer()}
					<View style={{ backgroundColor: utility.changeHeaderColor('#FFFFFF') }}>
						<FlatList
							data={this.props.video}
							style={{ width: '100%', height: '100%' }}
							contentContainerStyle={{ paddingBottom: 20 }}
							renderItem={(video) => (
								<VideoItem
									video={video.item}
									type={'video'}
									onPress={() => {
										// this.setState({ url: video.item.video_link, openVideo: true });
										let video_id = utility.getVideoID(video.item.video_link);
										this.props.navigation.navigate('YouTubeScreen', { video_id: video_id });
										// if (video.item.video_link.indexOf('youtu') > -1) {
										//     Linking.openURL(video.item.video_link)
										// } else {
										//     this.setState({ url: video.item.video_link, openVideo: true })
										// }
									}}
								/>
							)}
							keyExtractor={(item) => item.id}
							ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#E5E5E5' }} />}
						/>
					</View>
					<ATOMS.Loader isLoading={this.props.loading} />
				</View>
				<ATOMS.OfflineBar />
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => {
	const { configData } = state.auth;
	let { video, loading } = state.video;
	video.map((item, index) => {
		item.type = 'video';
	});
	return {
		configData,
		video,
		loading
	};
};

export default connect(mapStateToProps, {
	getAllVideos,
	setRecent
})(Video);
