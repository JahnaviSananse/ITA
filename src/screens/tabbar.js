import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, AsyncStorage, Platform } from 'react-native';
// import Tabbar from 'react-native-tabbar-bottom'
import { Tabbar } from '../components/atoms';
import Resources from './Resources';
import Discover from './Discover';
import Library from './Library';
import Profile from './Profile';
import { connect } from 'react-redux';
import * as utility from '../Utility/util';
import * as ICONS from '../resources';
import firebase, { Notification, NotificationOpen } from 'react-native-firebase';
import { discoverList, discoverListLoadMore, discoverListPull, setDiscoverPostId } from '../store/Discover/actions';
import { setPostId, setRedirection, setReportScreen } from '../store/Report/actions';
import { updateDeviceToken, setRecent } from '../store/User/actions';
import { setLibraryPostId } from '../store/Library/actions';

// import * as COLOR from '../constants/colors'
// import FastImage from 'react-native-fast-image'

class tabbar extends Component {
	constructor() {
		super();
		this.state = {
			page: 'Discover'
		};
		this.setupNotification()
	}
	async componentDidMount() {
		this.checkPermission();
		this.notificationAndroid();

	}

	notificationAndroid() {
		this.messageListener = firebase.messaging().onMessage((message) => {

			// this.messageListener = firebase.notifications().onNotification((notification) => {
			console.log("notification dataa=>", message);

			// Process your message as required
			//this.notificationListener = firebase.notifications().onNotification((notification) => {
			if (Platform.OS === 'android') {
				// alert('notificationAndroid', notification)
				const localNotification = new firebase.notifications.Notification({
					sound: 'default',
					show_in_foreground: true,
				})
					.setNotificationId(message._messageId)
					.setTitle(message.data.title)
					.setSubtitle(message.data.title)
					.setBody(message.data.body)
					.setData(message.data)
					// .setNotificationId(notification.notificationId)
					// .setTitle(notification.title)
					// .setSubtitle(notification.subtitle)
					// .setBody(notification.body)
					// .setData(notification.data)
					.setSound('default')
					.android.setChannelId('channelId')
					// e.g. the id you chose above
					.android.setColor('#000000') // you can set a color here
					.android.setPriority(firebase.notifications.Android.Priority.High)
					.android.setVisibility(firebase.notifications.Android.Visibility.Public)
					;
				firebase.notifications().displayNotification(localNotification);


			}
		});
	}
	getToken() {
		firebase.messaging().getToken().then(fcmToken => {
			console.log("TOKEN ==> ", fcmToken)
			if (fcmToken) {
				this.props.updateDeviceToken({ device_token: fcmToken })
			}
		});
	}
	async requestPermission() {
		firebase.messaging().requestPermission()
			.then(() => {
				this.getToken();
			})
			.catch(error => {
			});
	}
	async checkPermission() {

		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			console.log('checkPermission call')
			this.getToken();
		} else {
			this.requestPermission();
		}
	}

	async setupNotification() {

		firebase.notifications().getInitialNotification()
			.then((notificationOpen) => {
				if (notificationOpen) {
					// App was opened by a notification
					// Get the action triggered by the notification being opened
					const action = notificationOpen.action;
					// Get information about the notification that was opened
					const notification = notificationOpen.notification;
				}
			});

		const channel = new firebase.notifications.Android.Channel(
			'channelId',
			'ChannelName',
			firebase.notifications.Android.Importance.Max
		).setDescription('A natural description of the channel');
		firebase.notifications().android.createChannel(channel);

		// the listener returns a function you can use to unsubscribe
		this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {

			try {
				if (Platform.OS === 'ios') {
					const localNotification = new firebase.notifications.Notification()
						.setNotificationId(notification.notificationId)
						.setTitle(notification.title)
						.setSound('default')
						.setSubtitle(notification.subtitle)
						.setBody(notification.body)
						.setData(notification.data)
						.ios.setBadge(notification.ios.badge);
					firebase.notifications()
						.displayNotification(localNotification)
						.catch(err => console.error(err));
					// alert('Local notification')
				}
				if (Platform.OS === 'android') {
					// alert('unsubscribeFromNotificationListener - android1s
					console.log('local notifciation ', notification)
					console.log('local notifciation data==> ', notification.data)
					const localNotification = new firebase.notifications.Notification({
						sound: 'default',
						show_in_foreground: true,
					})
						.setNotificationId(notification.notificationId)
						.setTitle(notification.title)
						.setSubtitle(notification.subtitle)
						.setBody(notification.body)
						.setData(notification.data)
						.setSound('default')
						.android.setChannelId('channelId')
						// e.g. the id you chose above
						.android.setColor('#000000') // you can set a color here
						.android.setPriority(firebase.notifications.Android.Priority.High)
						.android.setVisibility(firebase.notifications.Android.Visibility.Public)
						;
					firebase.notifications().displayNotification(localNotification)
						.catch(err => console.log("Error android ==>", err));


				}
			} catch (error) {
				alert(error)
			}

		});


		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			// alert('Remote notification from killed state to foreground state')
			// App was opened by a notification
			// Get the action triggered by the notification being opened from killed state to foreground
			// alert('coming')
			const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification = notificationOpen.notification;
			if (notification.data) { // && Platform.OS !== 'ios'
				setTimeout(() => {
					// alert('getInitialNotification: ', JSON.stringify(notification.data))
					// if (!this.props.isRedirected) {
					this.handleNavigation(notification.data);
					// }
				}, 100);
			}

			//firebase.notifications().cancelAllNotifications()
			firebase.notifications().removeAllDeliveredNotifications();
			// alert(JSON.stringify(notification.data))
		}

		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			// Get the action triggered by the notification being opened from background state to foreground
			// alert('Remote notification from background state to foreground state')
			const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification = notificationOpen.notification;

			if (notification.data) { // && Platform.OS !== 'ios'
				setTimeout(() => {
					// alert('getInitialNotification: ' + notification.type);
					// this.handleNavigation(notification.data);
					// alert(JSON.stringify(notification.data.post_id))
					// this.props.setPostId(notification.data.post_id)
					// (if (this.props.isReportScreen === false) {
					//     this.handleNavigation(notification.data);
					// }
					//alert(notification.data.post_id)
					//this.handleNavigation(notification.data);
					if (!this.props.isRedirected) {
						// alert('getInitialNotification11: ', JSON.stringify(notification.data))

						this.handleNavigation(notification.data);
					}


				}, 100);
			}
			// else {
			// 	alert("Elseee")
			// }
			//firebase.notifications().cancelAllNotifications()
			firebase.notifications().removeAllDeliveredNotifications();
		});
	}
	handleNavigation(notif) {

		let type = notif.type ? notif.type : ''
		let post_id = notif.post_id ? notif.post_id : ''
		if (type === 'library') {
			console.log("library==>", notif);
			let post = JSON.parse(notif.post)
			// alert('Library' + 'post_id: '+post_id+' notif.type: '+post.type +' ')
			// Here we need to check for social post
			let innerType = post.type ? post.type : ''

			if (innerType === 'video') {
				let video_id = utility.getVideoID(post.video_link)
				AsyncStorage.getItem('isVideo').then((isVideo) => {
					if (isVideo) {

					} else {
						this.props.setLibraryPostId(post_id)
						this.props.navigation.navigate("YouTubeScreen", { "video_id": video_id })
					}
				})
				// if (this.props.library_post_id === '') {
				//     this.props.setLibraryPostId(post_id)
				//     this.props.navigation.navigate("YouTubeScreen", { "video_id": video_id })
				// }

				// this.setState({ url: post.video_link, openVideo: true })
				// if (post.video_link.indexOf('youtu') > -1) {
				//     Linking.openURL(post.video_link)
				// } else {
				//     this.setState({ url: post.video_link, openVideo: true })
				// }
			} else if (innerType === 'socialpost') {

				AsyncStorage.getItem('isSocial').then((isSocial) => {
					if (isSocial) {

					} else {
						this.props.setLibraryPostId(post_id)
						this.props.navigation.navigate("ImageScreen", { 'image': post.image, 'data': post })
					}
				})
				// if (this.props.library_post_id === '') {
				//     this.props.setLibraryPostId(post_id)
				//     this.props.navigation.navigate("ImageScreen", { 'image': post.image, 'data': post })
				// } else {
				//     firebase.notifications().removeAllDeliveredNotifications();
				// }
				// Need to imageScreen

			} else {
				AsyncStorage.getItem('isLibraryItem').then((isLibraryItem) => {
					if (isLibraryItem) {

					} else {
						this.props.setLibraryPostId(post_id)
						this.props.navigation.navigate("WebViewScreen", { "data": post })
					}
				})

				// if (this.props.library_post_id === '') {
				//     this.props.setLibraryPostId(post_id)
				//     this.props.navigation.navigate("WebViewScreen", { "data": post })
				// }
			}
		} else if (type === 'discover') {
			// alert('discover', JSON.stringify(notif))
			console.log("discover==>", notif);
			let post = JSON.parse(notif.post)
			console.log("post==>", post.type);
			let innerType = post.type ? post.type : ''
			if (innerType === 'video') {
				let video_id = utility.getVideoID(post.video_link)
				AsyncStorage.getItem('isVideo').then((isVideo) => {
					if (isVideo) {

					} else {
						this.props.setLibraryPostId(post_id)
						this.props.navigation.navigate("YouTubeScreen", { "video_id": video_id })
					}
				})
			} else if (innerType === 'flyer' || innerType === 'flyers') {
				console.log("flyer==>", notif);
				// let data = {}
				// data.title = ''
				// data.file_url = notif.url
				// if (data.file_url !== '' || data.file_url !== null) {
				// 	this.props.navigation.navigate("WebViewScreen", { data })
				// }
				this.props.navigation.navigate("WebViewScreen", { "data": post })
			}
			else {
				// Here we are getting a notification for news. 
				AsyncStorage.getItem('isDiscover').then((isDiscover) => {
					if (isDiscover) {

					} else {
						this.props.setDiscoverPostId(post_id)
						this.props.navigation.navigate("News", { "post_id": post_id })
					}
				})
			}


			// if (this.props.dicover_post_id === '') {
			//     this.props.setDiscoverPostId(post_id)
			//     this.props.navigation.navigate("News", { "post_id": post_id })
			// }

		} else if (type === 'report') {

			AsyncStorage.getItem('isChat').then((isChat) => {
				if (isChat) {
					//alert('Already on Chat Screen')
				} else {
					this.props.setPostId(post_id)
					this.props.navigation.navigate('Chat')
				}
			})
			// this.props.setRedirection(true)
			// if (this.props.isReportScreen === false && this.props.p`ost_id === '') {
			//     this.props.setPostId(post_id)
			//     this.props.navigation.navigate('Chat')
			// }

		}
		else if (type.toLowerCase() === 'admin') {
			console.log("admin==>", notif);
			let data = {}
			data.title = ''
			data.file_url = notif.url
			if (data.file_url !== '' || data.file_url !== null) {
				this.props.navigation.navigate("WebViewScreen", { data })
			}
		}
		else if (type.toLowerCase() === 'no_link') {
			console.log("no_link==>", notif);
			// this.props.navigation.navigate("Disc", { data })
		} else if (type.toLowerCase() === 'resource') {
			// this.props.navigation.navigate("Disc", { data })
			console.log("resource==>", notif.url);

			if (notif.url === "") {

			} else {
				let data = {}
				data.title = ''
				data.file_url = notif.url
				this.props.navigation.navigate("WebViewScreen", { data, "isFund": true })
			}
			// if (data.file_url !== "" || data.file_url !== null) {
			// 	this.props.navigation.navigate("WebViewScreen", { data, "isFund": true })
			// }
		}

	}
	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={styles.container}>
					{this.state.page === 'Discover' && <Discover navigation={this.props.navigation} />}
					{this.state.page === 'Library' && <Library navigation={this.props.navigation} />}
					{this.state.page === 'Resources' && <Resources navigation={this.props.navigation} />}
					{this.state.page === 'Profile' && <Profile navigation={this.props.navigation} />}
					<Tabbar
						// type="ripple"
						// rippleColor="#F3F3F3"
						tabbarBgColor={utility.changeHeaderColor('#F3F3F3')}
						// iconColor="#444"
						// selectedIconColor="#462E74"
						// labelColor="#444"
						// selectedLabelColor="#462E74"
						stateFunc={(tab) => {
							this.setState({ page: tab.page });
							//this.props.navigation.setParams({tabTitle: tab.title})
						}}
						activePage={this.state.page}
						tabs={[
							{
								page: 'Discover',
								tabIcon: (
									<Image
										source={
											this.state.page === 'Discover' ? this.props.userData.night_mode ? (
												ICONS.TB_IC_DISCOVER_NIGHT_MODE_SELECTED
											) : (
													ICONS.TB_IC_DISCOVER_SELECTED
												) : (
													ICONS.TB_IC_DISCOVER
												)
										}
										style={{ height: 20, width: 20 }}
										resizeMode={'contain'}
									/>
								)
							},
							{
								page: 'Library',
								tabIcon: (
									<Image
										source={
											this.state.page === 'Library' ? this.props.userData.night_mode ? (
												ICONS.TB_IC_LIBRARY_NIGHT_MODE_SELECTED
											) : (
													ICONS.TB_IC_LIBRARY_SELECTED
												) : (
													ICONS.TB_IC_LIBRARY
												)
										}
										style={{ height: 20, width: 20 }}
										resizeMode={'contain'}
									/>
								)
							},
							{
								page: 'Resources',
								tabIcon: (
									<Image
										source={
											this.state.page === 'Resources' ? this.props.userData.night_mode ? (
												ICONS.TB_IC_RESOURCES_NIGHT_MODE_SELECTED
											) : (
													ICONS.TB_IC_RESOURCES_SELECTED
												) : (
													ICONS.TB_IC_RESOURCES
												)
										}
										style={{ height: 20, width: 20 }}
										resizeMode={'contain'}
									/>
								)
							},
							{
								page: 'Profile',
								tabIcon: (
									<Image
										source={
											this.state.page === 'Profile' ? this.props.userData.night_mode ? (
												ICONS.TB_IC_PROFILE_NIGHT_MODE_SELECTED
											) : (
													ICONS.TB_IC_PROFILE_SELECTED
												) : (
													ICONS.TB_IC_PROFILE
												)
										}
										style={{ height: 20, width: 20 }}
										resizeMode={'contain'}
									/>
								)
							}
						]}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	wrapper: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const mapStateToProps = (state) => {
	const { userId, userData, userLoading } = state.user;
	return {
		userId,
		userData,
		userLoading
	};
};
export default connect(mapStateToProps, {
	setLibraryPostId,
	setDiscoverPostId,
	setPostId
})(tabbar);
