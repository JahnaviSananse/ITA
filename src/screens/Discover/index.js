/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import TouchID from "react-native-touch-id";
import YouTube, { YouTubeStandaloneAndroid } from "react-native-youtube";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import VideoItem from "../../components/atoms/DicoverList/index";
import TabHeader from "../../components/atoms/TabHeader";
import language from "../../Localization";
import * as IMG from "../../resources/index";
import {
  discoverList,
  discoverListLoadMore,
  discoverListPull,
  setDiscoverPostId,
} from "../../store/Discover/actions";
import { setLibraryPostId } from "../../store/Library/actions";
import {
  setPostId,
  setRedirection,
  setReportScreen,
} from "../../store/Report/actions";
import { setRecent, updateDeviceToken } from "../../store/User/actions";
import * as utility from "../../Utility/util";

class Discover extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      // page: 1,
      openVideo: false,
      url: "",
      //loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      modalVisible: false,
      selectedItem: {},
      night_mode: false,
      current_language: "en",
      appState: AppState.currentState,
      isRedirected: false,
    };

    setTimeout(() => {
      if (this.props.userId) {
        this.checkSupport();
      }
    }, 2000);
  }
  openModel = (data) => {
    this.setRecent(data.post_id);
    if (data.type == "news") {
      utility.recordEvent("Discover: Redirect to News");
      this.props.navigation.navigate("News", { post_id: data.post_id });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData && this.props.userData) {
      if (this.props.loading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }

  componentWillMount() {
    //this.setupNotification()
    utility.recordScreen("Discover Screen");
  }
  allowedSupport(message, type) {
    let bioType = type;
    AsyncStorage.setItem("allowed", "2");
    const ConfigObject = {
      title: "Fingerprint Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate(message, ConfigObject)
      .then((success) => {
        AsyncStorage.setItem("biometryType", type);
        Alert.alert(
          "",
          bioType === "1"
            ? "FaceID has been activated"
            : "TouchID has been activated",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      })
      .catch((error) => {});

    // Alert.alert(
    //     '',
    //     message, [{
    //         text: 'Cancel',
    //         onPress: () => {

    //         },
    //         style: 'cancel'
    //     }, {
    //         text: 'OK',
    //         onPress: () => {
    //             AsyncStorage.setItem('biometryType', type)
    //         }
    //     },], {
    //         cancelable: false
    //     }
    // )
  }
  checkSupport() {
    AsyncStorage.getItem("allowed").then((allwedBio) => {
      if (allwedBio) {
      } else {
        AsyncStorage.getItem("biometryType").then((response) => {
          // if (response) {

          // }
          // else {
          const optionalConfigObject = {
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
          };
          TouchID.isSupported(optionalConfigObject)
            .then((biometryType) => {
              // Success code
              if (biometryType === "FaceID") {
                this.allowedSupport("Do you want to activate FaceId?", "1");
              } else if (biometryType === "TouchID") {
                this.allowedSupport(language.ActivateTouchIDAlert, "2");
              } else if (biometryType === true) {
                this.allowedSupport(language.ActivateTouchIDAlert, "2");
              }
            })
            .catch((error) => {
              // Failure code
              console.log("catch==>" + error);
            });
          // }
        });
      }
    });
  }
  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.checkPermission();
    // this.notificationAndroid();

    //});

    this.props.discoverList();
    this.page = this.page + 1;
    setTimeout(() => {
      this.getToken();
      utility.recordEvent("Discover: get device token");
    }, 500);
    console.disableYellowBox = true;
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    // this.messageListener();
    // // this is where you unsubscribe
    // // if (Platform.OS === 'ios') {
    // this.unsubscribeFromNotificationListener();
    // this.notificationOpenedListener();
    // // }
  }
  notificationAndroid() {
    // this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
    //     // Process your message as required
    //     //this.notificationListener = firebase.notifications().onNotification((notification) => {
    //     if (Platform.OS === 'android') {
    //         // alert('unsubscribeFromNotificationListener - android1s')
    //         const localNotification = new firebase.notifications.Notification({
    //             sound: 'default',
    //             show_in_foreground: true,
    //         })
    //             .setNotificationId(message._messageId)
    //             .setTitle(message.data.title)
    //             .setSubtitle(message.data.title)
    //             .setBody(message.data.body)
    //             .setData(message.data)
    //             .setSound('default')
    //             .android.setChannelId('channelId')
    //             // e.g. the id you chose above
    //             .android.setColor('#000000') // you can set a color here
    //             .android.setPriority(firebase.notifications.Android.Priority.High)
    //             //.android.setVisibility(firebase.notifications.Android.Visibility.Public)
    //             ;
    //         firebase.notifications()
    //             .displayNotification(localNotification)
    //             .catch(err => console.error(err));
    //     }
    // });
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      //alert('App has come to the foreground!');
    }
    this.setState({ appState: nextAppState });
  };
  async setupNotification() {
    // firebase.notifications().getInitialNotification()
    //     .then((notificationOpen) => {
    //         if (notificationOpen) {
    //             // App was opened by a notification
    //             // Get the action triggered by the notification being opened
    //             const action = notificationOpen.action;
    //             // Get information about the notification that was opened
    //             const notification = notificationOpen.notification;
    //         }
    //     });
    // const channel = new firebase.notifications.Android.Channel(
    //     'channelId',
    //     'ChannelName',
    //     firebase.notifications.Android.Importance.Max
    // ).setDescription('A natural description of the channel');
    // firebase.notifications().android.createChannel(channel);
    // the listener returns a function you can use to unsubscribe
    // this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
    //     console.log('local notifciation ' + JSON.stringify(notification.data))
    //     try {
    //         if (Platform.OS === 'ios') {
    //             const localNotification = new firebase.notifications.Notification()
    //                 .setNotificationId(notification.notificationId)
    //                 .setTitle(notification.title)
    //                 .setSound('default')
    //                 .setSubtitle(notification.subtitle)
    //                 .setBody(notification.body)
    //                 .setData(notification.data)
    //                 .ios.setBadge(notification.ios.badge);
    //             firebase.notifications()
    //                 .displayNotification(localNotification)
    //                 .catch(err => console.error(err));
    //             // alert('Local notification')
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }
    // });
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //     // alert('Remote notification from killed state to foreground state')
    //     // App was opened by a notification
    //     // Get the action triggered by the notification being opened from killed state to foreground
    //     // alert('coming')
    //     const action = notificationOpen.action;
    //     // Get information about the notification that was opened
    //     const notification = notificationOpen.notification;
    //     if (notification.data) { // && Platform.OS !== 'ios'
    //         setTimeout(() => {
    //             if (!this.props.isRedirected) {
    //                 this.handleNavigation(notification.data);
    //             }
    //         }, 100);
    //     }
    //     //firebase.notifications().cancelAllNotifications()
    //     firebase.notifications().removeAllDeliveredNotifications();
    //     // alert(JSON.stringify(notification.data))
    // }
    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //     // Get the action triggered by the notification being opened from background state to foreground
    //     // alert('Remote notification from background state to foreground state')
    //     const action = notificationOpen.action;
    //     // Get information about the notification that was opened
    //     const notification = notificationOpen.notification;
    //     if (notification.data) { // && Platform.OS !== 'ios'
    //         setTimeout(() => {
    //             // alert('getInitialNotification: ' + notification.type);
    //             // this.handleNavigation(notification.data);
    //             // alert(JSON.stringify(notification.data.post_id))
    //             // this.props.setPostId(notification.data.post_id)
    //             // (if (this.props.isReportScreen === false) {
    //             //     this.handleNavigation(notification.data);
    //             // }
    //             //alert(notification.data.post_id)
    //             this.handleNavigation(notification.data);
    //         }, 100);
    //     }
    //     //firebase.notifications().cancelAllNotifications()
    //     firebase.notifications().removeAllDeliveredNotifications();
    // });
  }
  // async setupNotification() {
  //     firebase.notifications().getInitialNotification()
  //         .then((notificationOpen) => {
  //             if (notificationOpen) {
  //                 // App was opened by a notification

  //                 // Get the action triggered by the notification being opened
  //                 const action = notificationOpen.action;
  //                 // Get information about the notification that was opened
  //                 const notification = notificationOpen.notification;
  //             }
  //         });

  //     const channel = new firebase.notifications.Android.Channel(
  //         'channelId',
  //         'channelId',
  //         firebase.notifications.Android.Importance.Max
  //     ).setDescription('A natural description of the channel');
  //     firebase.notifications().android.createChannel(channel);

  //     // the listener returns a function you can use to unsubscribe
  //     this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
  //         if (Platform.OS === 'android') {
  //             // alert('unsubscribeFromNotificationListener - android1s')
  //             const localNotification = new firebase.notifications.Notification({
  //                 sound: 'default',
  //                 show_in_foreground: true,
  //             })
  //                 .setNotificationId(notification.notificationId)
  //                 .setTitle(notification.title)
  //                 .setSubtitle(notification.subtitle)
  //                 .setBody(notification.body)
  //                 .setData(notification.data)
  //                 .android.setChannelId('channelId') // e.g. the id you chose above
  //                 .android.setColor('#000000') // you can set a color here
  //                 .android.setGroup(notification.notificationId)
  //                 .android.setPriority(firebase.notifications.Android.Priority.Max)
  //                 .android.setVisibility(firebase.notifications.Android.Visibility.Public)
  //                 ;

  //             firebase.notifications()
  //                 .displayNotification(localNotification)
  //                 .catch(err => console.error(err));

  //         } else if (Platform.OS === 'ios') {
  //             const localNotification = new firebase.notifications.Notification()
  //                 .setNotificationId(notification.notificationId)
  //                 .setTitle(notification.title)
  //                 .setSound('default')
  //                 .setSubtitle(notification.subtitle)
  //                 .setBody(notification.body)
  //                 .setData(notification.data)
  //                 .ios.setBadge(notification.ios.badge);
  //             firebase.notifications()
  //                 .displayNotification(localNotification)
  //                 .catch(err => console.error(err));
  //         }

  //     });

  //     const notificationOpen = await firebase.notifications().getInitialNotification();
  //     if (notificationOpen) {
  //         // alert('Remote notification from killed state to foreground state')
  //         // App was opened by a notification
  //         // Get the action triggered by the notification being opened from killed state to foreground
  //         // alert('coming')
  //         const action = notificationOpen.action;
  //         // Get information about the notification that was opened
  //         const notification = notificationOpen.notification;
  //         if (notification.data) { // && Platform.OS !== 'ios'
  //             setTimeout(() => {
  //                 // alert('getInitialNotification: ' + notification.type);
  //                 this.handleNavigation(notification.data);
  //             }, 100);
  //         }

  //         firebase.notifications().removeAllDeliveredNotifications()
  //         // alert(JSON.stringify(notification.data))
  //     }

  //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //         // Get the action triggered by the notification being opened from background state to foreground
  //         // alert('Remote notification from background state to foreground state')
  //         const action = notificationOpen.action;
  //         // Get information about the notification that was opened
  //         const notification = notificationOpen.notification;

  //         if (notification.data) { // && Platform.OS !== 'ios'
  //             setTimeout(() => {

  //                 this.handleNavigation(notification.data);
  //             }, 100);
  //         }
  //         firebase.notifications().removeAllDeliveredNotifications()
  //     });
  // }

  handleNavigation(notif) {
    let type = notif.type ? notif.type : "";
    let post_id = notif.post_id ? notif.post_id : "";
    if (type === "library") {
      let post = JSON.parse(notif.post);
      // alert('Library' + 'post_id: '+post_id+' notif.type: '+post.type +' ')
      // Here we need to check for social post
      let innerType = post.type ? post.type : "";

      if (innerType === "video") {
        let video_id = utility.getVideoID(post.video_link);
        AsyncStorage.getItem("isVideo").then((isVideo) => {
          if (isVideo) {
          } else {
            this.props.setLibraryPostId(post_id);
            this.props.navigation.navigate("YouTubeScreen", {
              video_id: video_id,
            });
          }
        });
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
      } else if (innerType === "socialpost") {
        AsyncStorage.getItem("isSocial").then((isSocial) => {
          if (isSocial) {
          } else {
            this.props.setLibraryPostId(post_id);
            this.props.navigation.navigate("ImageScreen", {
              image: post.image,
              data: post,
            });
          }
        });
        // if (this.props.library_post_id === '') {
        //     this.props.setLibraryPostId(post_id)
        //     this.props.navigation.navigate("ImageScreen", { 'image': post.image, 'data': post })
        // } else {
        //     firebase.notifications().removeAllDeliveredNotifications();
        // }
        // Need to imageScreen
      } else {
        AsyncStorage.getItem("isLibraryItem").then((isLibraryItem) => {
          if (isLibraryItem) {
          } else {
            this.props.setLibraryPostId(post_id);
            this.props.navigation.navigate("WebViewScreen", { data: post });
          }
        });

        // if (this.props.library_post_id === '') {
        //     this.props.setLibraryPostId(post_id)
        //     this.props.navigation.navigate("WebViewScreen", { "data": post })
        // }
      }
    } else if (type === "discover") {
      // alert('discover' + 'post_id: '+post_id)
      // Here we are getting a notification for news.
      AsyncStorage.getItem("isDiscover").then((isDiscover) => {
        if (isDiscover) {
        } else {
          console.log("sdfs", this.props);
          this.props.setDiscoverPostId(post_id);
          this.props.navigation.navigate("News", { post_id: post_id });
        }
      });
      // if (this.props.dicover_post_id === '') {
      //     this.props.setDiscoverPostId(post_id)
      //     this.props.navigation.navigate("News", { "post_id": post_id })
      // }
    } else if (type === "report") {
      AsyncStorage.getItem("isChat").then((isChat) => {
        if (isChat) {
          //alert('Already on Chat Screen')
        } else {
          this.props.setPostId(post_id);
          this.props.navigation.navigate("Chat");
        }
      });
      // this.props.setRedirection(true)
      // if (this.props.isReportScreen === false && this.props.p`ost_id === '') {
      //     this.props.setPostId(post_id)
      //     this.props.navigation.navigate('Chat')
      // }
    } else if (type === "admin") {
      alert("type ==> ", JSON.stringify(type));
      let data = {};
      data.title = "";
      data.file_url = notif.url;
      this.props.navigation.navigate("WebViewScreen", { data });
    }
  }
  getToken() {
    // firebase.messaging().getToken().then(fcmToken => {
    //     console.log("TOKEN ==> ", fcmToken)
    //     if (fcmToken) {
    //         this.props.updateDeviceToken({ device_token: fcmToken })
    //     }
    // });
  }
  async requestPermission() {
    // firebase
    //   .messaging()
    //   .requestPermission()
    //   .then(() => {
    //     this.getToken();
    //   })
    //   .catch((error) => {});
  }
  async checkPermission() {
    // const enabled = await firebase.messaging().hasPermission();
    // if (enabled) {
    //   console.log('checkPermission call');
    //   this.getToken();
    // } else {
    //   this.requestPermission();
    // }
  }
  // getToken() {
  //     firebase.messaging().getToken().then(fcmToken => {
  //         if (fcmToken) {
  //             this.props.updateDeviceToken({ device_token: fcmToken })
  //         }
  //     });
  // }
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isLoadMore) return null;
    return (
      <View
        style={{
          height: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          style={{
            color: "#696969",
          }}
        />
      </View>
    );
  };
  handleLoadMore = () => {
    if (!this.state.loading && !this.props.loadingPull) {
      utility.recordEvent("Dicover: handle loadmore");
      let discoverData = {};
      discoverData.paged = this.page;
      this.props.discoverListLoadMore(discoverData);
      this.page = this.page + 1;
    }
  };

  setRecent(post_id) {
    this.props.setRecent({ post_id: post_id });
    utility.recordEvent("Discover: add to recent");
  }
  renderAndroidVideoPlayer() {
    if (this.state.url === "") return;

    var video_id = utility.getVideoID(this.state.url);
    let height = Dimensions.get("screen").height;
    let topMargin = height / 2 - 150;
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <ScrollView
          style={{ backgroundColor: "transparent" }}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            if (!this.state.containerMounted)
              this.setState({ containerMounted: true });
            if (this.state.containerWidth !== width)
              this.setState({ containerWidth: width });
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ openVideo: false });
            }}
            style={{
              height: 40,
              width: 40,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              borderRadius: 20,
              right: 0,
              marginTop: topMargin - 45,
            }}
          >
            <FastImage
              style={{ height: 15, width: 15 }}
              source={IMG.VIDEO_CLOSE}
            />
          </TouchableOpacity>
          <YouTube
            ref={(component) => {
              this._youTubeRef = component;
            }}
            apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
            videoId={video_id}
            play={false}
            controls={1}
            playsInline={true}
            style={{
              marginTop: topMargin,
              height: 300,
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "center",
            }}
          />
        </ScrollView>
      </View>
    );
  }
  renderVideoPlayer() {
    if (this.state.url === "") return;

    var video_id = utility.getVideoID(this.state.url);
    let height = Dimensions.get("screen").height;
    let topMargin = height / 2 - 150;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openVideo}
          onRequestClose={() => {}}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "#000000B3",
            }}
          />

          <ScrollView
            style={{ backgroundColor: "transparent" }}
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => {
              if (!this.state.containerMounted)
                this.setState({ containerMounted: true });
              if (this.state.containerWidth !== width)
                this.setState({ containerWidth: width });
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ openVideo: false });
              }}
              style={{
                height: 40,
                width: 40,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                borderRadius: 20,
                right: 0,
                marginTop: topMargin - 45,
              }}
            >
              <FastImage
                style={{ height: 15, width: 15 }}
                source={IMG.VIDEO_CLOSE}
              />
            </TouchableOpacity>
            {Platform.OS === "android" ? (
              YouTubeStandaloneAndroid.playVideo({
                apiKey: "AIzaSyDmq9YIU3vOEuBBp3qdfa1mNYieuqnQFXQ", // Your YouTube Developer API Key
                videoId: video_id, // YouTube video ID
                autoplay: true, // Autoplay the video
                startTime: 0,
                lightboxMode: true, // Starting point of video (in seconds) })
              })
                .then(() => console.log("Standalone Player Exited"))
                .catch((errorMessage) => console.error(errorMessage))
            ) : (
              <YouTube
                ref={(component) => {
                  this._youTubeRef = component;
                }}
                apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
                videoId={video_id}
                play={true}
                controls={1}
                style={{
                  marginTop: topMargin,
                  height: 300,
                  width: "100%",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </ScrollView>
        </Modal>
      </View>
    );
  }

  renderVideoPlayer1() {
    if (this.state.url === "") return;

    var video_id = utility.getVideoID(this.state.url);
    let height = Dimensions.get("screen").height;
    let topMargin = height / 2 - 150;
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ openVideo: false });
          }}
          style={{
            height: 40,
            width: 40,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 20,
            right: 0,
            marginTop: topMargin - 45,
          }}
        >
          <FastImage
            style={{ height: 15, width: 15 }}
            source={IMG.VIDEO_CLOSE}
          />
        </TouchableOpacity>
        <YouTube
          ref={(component) => {
            this._youTubeRef = component;
          }}
          apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
          videoId={video_id}
          play={true}
          controls={1}
          style={{
            marginTop: topMargin,
            height: 300,
            width: "100%",
            backgroundColor: "transparent",
          }}
        />
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
  //                     Alert.alert('Modal has been closed.');
  //                 }}>
  //                 <View style={{ height: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
  //                     <TouchableOpacity onPress={() => this.setState({ openVideo: false })}
  //                         style={{ height: 40, width: 40, alignSelf: 'flex-end', justifyContent: "center" }}>
  //                         <FastImage
  //                             style={{ height: 30, width: 30 }}
  //                             source={IMG.VIDEO_CLOSE}
  //                         />
  //                     </TouchableOpacity>
  //                     <Video source={{ uri: this.state.url }}   // Can be a URL or a local file.
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

  renderItems = (video, index) => {
    return (
      <VideoItem
        video={video.item}
        list={"discover"}
        // type={video.type}
        userId={this.props.userId}
        onPress={() => {
          let type = video.item.type;
          console.log("Typee==>", type);

          if (type === "flyer" || type === "flyers") {
            this.props.navigation.navigate("WebViewScreen", {
              data: video.item,
            });
          } else if (type !== "video") {
            this.openModel(video.item);
          } else {
            let video_id = utility.getVideoID(video.item.video_link);
            this.props.navigation.navigate("YouTubeScreen", {
              video_id: video_id,
            });

            // this.setState({ url: video.item.video_link, openVideo: true })
            utility.recordEvent("Discover: Open video in modal");

            // if (video.item.video_link.indexOf('youtu') > -1 && Platform.OS !== 'ios') {
            //     Linking.openURL(video.item.video_link)
            //     utility.recordEvent("Discover: Open video in youtube")
            // } else {
            //     this.setState({ url: video.item.video_link, openVideo: true })
            //     utility.recordEvent("Discover: Open video in modal")
            // }
          }
          this.setRecent(video.item.post_id);
          utility.recordEvent("Discover: add to recent post");
        }}
      />
    );
  };
  onRefresh() {
    this.page = 1;
    let discoverData = {};
    discoverData.paged = this.page;
    this.props.discoverListPull(discoverData);
    setTimeout(() => {
      this.page = this.page + 1;
    }, 100);
  }
  render() {
    if (this.props.loading && this.state.page === 1) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <ActivityIndicator style={{ color: "#000" }} />
        </View>
      );
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        {/* <View
          style={{
            flex: 1,
            backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
            paddingBottom: 50,
          }}
        > */}
        <View
          style={{
            backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
            paddingBottom: 1,
          }}
        >
          <TabHeader
            title={language.Discover}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
          />
          <FlatList
            data={this.props.data.posts}
            renderItem={this.renderItems}
            refreshControl={
              <RefreshControl
                refreshing={this.props.loadingPull}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.5, backgroundColor: "#E5E5E5" }} />
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
          {/* </View> */}
          <ATOMS.Loader
            isLoading={this.props.loading || this.props.loadingShare}
          />
          {this.state.openVideo == true && this.renderAndroidVideoPlayer()}
          <ATOMS.OfflineBar />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isLoadMore,
    loading,
    isSuccess,
    discoverListData,
    loadingPull,
    dicover_post_id,
  } = state.discover;
  const { isConnected } = state.auth;
  const { post_id, isRedirected, isReportScreen } = state.report;
  const { library_post_id } = state.library;
  const { userId, userData, current_language } = state.user;
  return {
    isConnected,
    post_id,
    isReportScreen,
    loadingShare: state.auth.loadingShare,
    userLoading: state.user.loading,
    userData,
    loading,
    data: discoverListData,
    isSuccess,
    isLoadMore,
    userId,
    loadingPull,
    current_language,
    newPostId: state.report.post_id,
    isRedirected,
    dicover_post_id,
    library_post_id,
  };
};

export default connect(mapStateToProps, {
  setPostId,
  setReportScreen,
  setRedirection,
  discoverList,
  setDiscoverPostId,
  setLibraryPostId,
  discoverListPull,
  discoverListLoadMore,
  updateDeviceToken,
  setRecent,
})(Discover);
