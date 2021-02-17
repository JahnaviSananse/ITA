import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Linking,
  Platform,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import RNPrint from "react-native-print";
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import Header from "../../components/atoms/Header/index";
import language from "../../Localization";
import * as images from "../../resources/index";
import { clearShareData, shareData } from "../../store/Auth/actions";
import {
  addRemoveFavorite,
  clearData,
  getFavoriteList,
} from "../../store/Library/actions";
import * as utility from "../../Utility/util";
import Loaderview from "./Loaderview";
import styles from "./style";

class WebViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      visible: true,
      data: {},
      favoriteArray: [],
      isFav: false,
      isloader: false,
      night_mode: false,
      current_language: "en",
      selectedPrinter: null,
      update: false,
      //showBookMark: false
    };
    AsyncStorage.setItem("isLibraryItem", "1");
    setTimeout(() => {
      this.props.getFavoriteList();
    }, 100);
    console.log("constructer");

    setTimeout(() => {
      this.setState({
        update: true,
      });
    }, 500);
  }
  hideSpinner() {
    this.setState({ visible: false });
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  componentWillMount() {
    this.setState({
      data: this.props.route.params?.data,
    });
    console.log("willmount");
    this.props.clearShareData();
    utility.recordScreen("Search in " + this.getTitle());
  }
  componentDidMount() {
    console.log("didmount");
    let showBookMark = false;
    AsyncStorage.getItem("isDiscover").then((isDiscover) => {
      if (isDiscover) {
        showBookMark = true;
        //alert(showBookMark)
      } else {
        showBookMark = false;
      }
    });
  }
  componentWillUnmount() {
    AsyncStorage.removeItem("isLibraryItem");
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData && this.props.userData) {
      if (this.props.userLoading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }
  sharingOptions() {
    let newUrl = this.state.data.file_url.replace(" ", "");
    console.log("coming....", newUrl);
    this.props.shareData(newUrl);
  }

  loadInBrowser = () => {
    let newUrl = this.state.data.file_url.replace(" ", "");
    Linking.openURL(newUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  shareLink() {
    utility.recordEvent("WebViewScreen : share web url");
    Share.share({
      message: this.state.data.file_url,
      url: this.state.data.file_url, //add link here to share
      title: this.state.data.title,
    });
  }
  async printRemotePDF() {
    await RNPrint.print({ filePath: this.state.data.file_url });
  }
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 });
    this.setState({ selectedPrinter });
  };
  renderBottomSheet() {
    let isFav = false;
    if (this.props.favorites) {
      this.props.favorites.map((value) => {
        if (value === parseInt(this.state.data.post_id)) {
          // if (value === 3421) {
          isFav = true;
        }
      });
    }
    let isFund = this.props.route.params?.isFund;
    return (
      <View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={isFund === true ? 240 : 300}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
              this.RBSheet.close();
              setTimeout(() => {
                this.loadInBrowser();
                // this.sharingOptions()
              }, 1000);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={images.SHARE}
              ></FastImage>
            </View>
            <View style={styles.textContainer}>
              <Text style={{ textAlignVertical: "center" }}>
                {Platform.OS === "ios" ? language.BrowserIOS : language.Browser}
              </Text>
            </View>
            <View style={styles.saperator} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
              this.RBSheet.close();
              setTimeout(() => {
                this.sharingOptions();
              }, 1000);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={images.SHARE}
              ></FastImage>
            </View>
            <View style={styles.textContainer}>
              <Text style={{ textAlignVertical: "center" }}>
                {language.Share}
              </Text>
            </View>
            <View style={styles.saperator} />
          </TouchableOpacity>

          {isFund !== true ? (
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => this.fncBookmarkPost(this.state.data.post_id)}
            >
              <View style={{ flexDirection: "row" }}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.icon}
                  source={
                    isFav === true
                      ? images.BOOKMARK_SELECTED
                      : images.BOOKMARK_UNSELECTED
                  }
                ></FastImage>
              </View>
              <View style={styles.textContainer}>
                <Text style={{ textAlignVertical: "center" }}>
                  {isFav === true ? language.Bookmarked : language.Bookmark}
                </Text>
              </View>
              <View style={styles.saperator} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
              this.RBSheet.close();
              setTimeout(() => {
                this.printRemotePDF();
              }, 500);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={images.PRINTER}
              ></FastImage>
            </View>
            <View style={styles.textContainer}>
              <Text style={{ textAlignVertical: "center" }}>
                {language.Print}
              </Text>
            </View>
            <View style={styles.saperator} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.RBSheet.close()}
          >
            <Text>{language.Cancel}</Text>
          </TouchableOpacity>
        </RBSheet>
      </View>
    );
  }
  fncBookmarkPost(postID) {
    utility.recordEvent("WebViewScreen: fncBookmarkPost");
    let bookmarkRequest = {};
    bookmarkRequest.post_id = postID;
    this.props.addRemoveFavorite(bookmarkRequest);
  }
  getTitle() {
    let title = "";
    let daata = this.state.data;
    if (daata !== undefined) {
      if (daata.title !== undefined) {
        title = daata.title;
      }
    }
    return title;
  }
  render() {
    this.props.navigation.addListener("didFocus", (payload) => {
      console.log("Payload is called .....................");
    });
    let height = Dimensions.get("screen").height - 50;
    let width = Dimensions.get("screen").width;
    let isDisable = true;
    let title = this.getTitle();
    let url = this.state.data.file_url;
    let isShowRight = true;
    if (url.indexOf("&") > -1 && Platform.OS === "android") {
      url = encodeURIComponent(this.state.data.file_url);
    }
    let uri = url;
    if (url.indexOf(".pdf") > -1 && Platform.OS === "android") {
      isShowRight = true;
      uri = `https://drive.google.com/viewerng/viewer?embedded=true&url=${url}`;
    } else if (url.indexOf(".pdf") > -1 && Platform.OS === "ios") {
      isShowRight = true;
      uri = url;
    } else {
      isShowRight = false;
      uri = url;
    }
    // alert(JSON.stringify(uri))
    let rightImage = utility.changeThreeDots();
    //let isShowRight = true
    // if (this.state.data) {
    //     if (url.indexOf('.pdf') > -1) {
    //     } else {
    //         isShowRight = false
    //     }

    //     if (this.state.data.fund_code) {
    //         isShowRight = false
    //     }
    // }
    return (
      <SafeAreaView
        style={{ backgroundColor: utility.changeHeaderColor("#F3F3F3") }}
      >
        <View style={{ height: "100%", width: "100%" }}>
          {/* {Platform.OS === 'ios' && this.customOptions()} */}

          <WebView
            ref={(webView) => (this.webView = webView)}
            onLoad={() => this.hideSpinner()}
            style={{
              height: "100%",
              width: "100%",
              marginBottom: isShowRight ? 0 : 50,
              marginTop: 50,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: uri }}
            incognito={true}
          />

          {this.state.visible && (
            <ActivityIndicator
              style={{
                position: "absolute",
                bottom: height * 0.5,
                width: width,
              }}
              size="large"
            />
          )}
          {this.renderBottomSheet()}

          <Loaderview isLoading={this.props.loadingShare} />

          {isShowRight === false && (
            <View
              style={[
                styles.navigationContainer,
                { backgroundColor: utility.changeHeaderColor("#F3F3F3") },
              ]}
            >
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.webView.goBack()}
              >
                <FastImage
                  style={{ height: 25, width: 25 }}
                  resizeMode={"contain"}
                  source={utility.changeBackButton()}
                ></FastImage>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forward}
                onPress={() => this.webView.goForward()}
              >
                <FastImage
                  style={{ height: 25, width: 25 }}
                  resizeMode={"contain"}
                  source={utility.changeForwardButton()}
                ></FastImage>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.share}
                onPress={() => this.shareLink()}
              >
                <FastImage
                  style={{ height: 25, width: 25 }}
                  resizeMode={"contain"}
                  source={utility.changeShareButton()}
                ></FastImage>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ width: "100%", position: "absolute", top: 0 }}>
            <Header
              title={title}
              leftImage={
                isShowRight
                  ? utility.changeBackButton()
                  : utility.changeCloseButton()
              }
              rightImage={isShowRight ? rightImage : null}
              backgroundColor={utility.changeHeaderColor("#F3F3F3")}
              redirectLeft={() => this.props.navigation.goBack()}
              redirectRight={() => {
                if (isShowRight) {
                  this.RBSheet.open();
                }
              }}
            />
          </View>
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, isSuccess, librarySearchData, favorites } = state.library;
  const { userId, userData, current_language } = state.user;
  const { loadingShare } = state.auth;

  return {
    loadingShare: loadingShare,
    current_language,
    userLoading: state.user.loading,
    userData,
    data: librarySearchData,
    isSuccess,
    loading,
    favorites,
  };
};

export default connect(mapStateToProps, {
  addRemoveFavorite,
  clearData,
  getFavoriteList,
  shareData,
  clearShareData,
})(WebViewScreen);
