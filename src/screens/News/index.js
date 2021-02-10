import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Linking, Platform, SafeAreaView, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import RBSheet from "react-native-raw-bottom-sheet";
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import * as ATOMS from '../../components/atoms';
import Header from '../../components/atoms/Header/index';
import language from '../../Localization';
import * as images from '../../resources/index';
import { discoverDetail } from '../../store/Discover/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post_id: 0,
			night_mode: false,
			current_language: 'en'
		};
		AsyncStorage.setItem('isDiscover', '1')
	}
	componentWillMount() {
		utility.recordScreen('News Screen');
		// const { navigate } = this.props.navigation;
		// const item = this.props.navigation.getParam('post_id');
		this.setState({ post_id: this.props.navigation.getParam('post_id') });
	}
	componentDidMount() {
		let discoverData = {};
		discoverData.post_id = this.state.post_id;
		this.props.discoverDetail(discoverData);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.userData !== this.props.userData && this.props.userData) {
			if (this.props.userLoading !== true) {
				this.setState({
					current_language: this.props.userData.current_language
				});
			}
		}
	}
	componentWillUnmount() {
		AsyncStorage.removeItem('isDiscover')
	}
	sharingOptions() {
		utility.recordEvent('News : sharingOptions');
		let video = this.props.descoverDetail;

		let url = '';

		if (video.file_url) {
			url = video.file_url;
		} else if (video.shareable_link) {
			url = video.shareable_link;
		} else if (video.image) {
			url = video.image;
		}

		Share.share({
			message: url,
			// url: url,
			// title: url
		});
	}
	 renderBottomSheet() {
        return (
            <View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={ 200}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}>
                        <TouchableOpacity style={styles.rowContainer}
                        onPress={() => {
                            this.RBSheet.close()
                            setTimeout(() => {
                                this.loadInBrowser()
                                // this.sharingOptions()
                            }, 1000);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.icon} source={images.SHARE}></FastImage>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ textAlignVertical: 'center' }}>{Platform.OS === 'ios' ? language.BrowserIOS: language.Browser}</Text>
                        </View>
                        <View style={styles.saperator} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer}
                        onPress={() => {
                            this.RBSheet.close()
                            setTimeout(() => {
                                this.sharingOptions()
                            }, 1000);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.icon} source={images.SHARE}></FastImage>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ textAlignVertical: 'center' }}>{language.Share}</Text>
                        </View>
                        <View style={styles.saperator} />
                    </TouchableOpacity>

                    
                       
                        

                   
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.RBSheet.close()}>
                        <Text>{language.Cancel}</Text>
                    </TouchableOpacity>
                </RBSheet>
            </View >
        )
    }
 loadInBrowser = () => {
    let video = this.props.descoverDetail;

		let url = '';

		if (video.file_url) {
			url = video.file_url;
		} else if (video.shareable_link) {
			url = video.shareable_link;
		} else if (video.image) {
			url = video.image;
		}
    //   let newUrl = this.state.data.file_url.replace(" ", '');
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

	render() {
		fncBackPressed = () => {
			utility.recordEvent('News : On Back Button Pressed');
			this.props.navigation.goBack();
		};
		let descoverDetail = {};
		let textHTML = '';
		if (!this.props.loading) {
			descoverDetail = this.props.descoverDetail;
			if (this.props.userData.night_mode === 1) {
				textHTML = descoverDetail.long_description_nightmode;
			} else {
				textHTML = descoverDetail.long_description;
			}
		}
		let array = [];
		
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={{ flex: 1, backgroundColor: utility.changeBackgroundColor('#FFFFFF') }}>
					<Header
						leftImage={utility.changeDownButton()}
						rightImage={utility.changeUploadButton()}
						backgroundColor={utility.changeBackgroundColor('#F3F3F3')}
						redirectLeft={() => this.props.navigation.goBack()}
						redirectRight={() => this.RBSheet.open()}
					/>
					{this.renderBottomSheet()}
					{!this.props.loading && (
						<ScrollView style={{ height: '100%' }} contentContainerStyle={{ paddingBottom: 100 }}>
							<FastImage
								resizeMode={'cover'}
								source={{ uri: this.props.descoverDetail.image }}
								style={{ height: 200, width: '100%' }}
							/>
							<View>
								<View style={styles.videoDetails}>
									<Text
										// numberOfLines={2}
										style={[styles.title, { color: utility.changeFontColor('#000000') }]}
									>
										{this.props.descoverDetail.title}
									</Text>
									<Text style={[styles.description, { color: utility.changeFontColor('#000000') }]}>
										{this.props.descoverDetail.short_description}
									</Text>
									<Text
										style={[
											styles.updateTitle,
											{
												color: utility.changeFontColor('#757575')
											}
										]}
									>
										{this.props.descoverDetail.last_updated_date}
									</Text>
									<FastImage
										style={styles.underLineImage}
										source={require('../../resources/bottomLine.png')}
									/>
									<HTML
										ignoredTags={array}
										html={textHTML}
										onLinkPress={(event, href) => {
											let finalData = {};
											finalData.file_url = href;
											this.props.navigation.navigate('WebViewScreen', { data: finalData, "isFund": true });
										}}
										imagesMaxWidth={Dimensions.get('window').width}
									/>
								</View>
							</View>
						</ScrollView>
					)}
					<ATOMS.Loader isLoading={this.props.loading} />
				</View>
				<ATOMS.OfflineBar />
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => {
	const { loading, isSuccess, descoverDetail } = state.discover;
	const { userId, userData, current_language } = state.user;
	return {
		current_language,
		userLoading: state.user.loading,
		userData,
		loading,
		descoverDetail,
		isSuccess
	};
};

export default connect(mapStateToProps, { discoverDetail })(News);
