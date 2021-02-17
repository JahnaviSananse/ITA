import React, { Component } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import Header from "../../components/atoms/Header/index";
import language from "../../Localization";
import * as images from "../../resources/index";
import { shareData } from "../../store/Auth/actions";
import {
  addRemoveFavorite,
  clearData,
  getFavoriteList,
} from "../../store/Library/actions";
import * as utility from "../../Utility/util";
import styles from "./style";

class ImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: "",
      visible: true,
      data: {},
      favoriteArray: [],
      current_language: "en",
    };
    setTimeout(() => {
      this.props.getFavoriteList();
    }, 100);
    AsyncStorage.setItem("isSocial", "1");
  }

  componentWillMount() {
    utility.recordScreen("Image Screen");
    this.setState({
      imgURL: this.props.route.params?.image,
      data: this.props.route.params?.data,
    });
  }
  componentWillUnmount() {
    AsyncStorage.removeItem("isSocial");
  }
  fncBookmarkPost(postID) {
    utility.recordEvent("WebViewScreen: fncBookmarkPost");
    let bookmarkRequest = {};
    bookmarkRequest.post_id = postID;
    this.props.addRemoveFavorite(bookmarkRequest);
  }

  sharingOptions() {
    // utility.recordEvent("News : sharingOptions")
    this.props.shareData(this.state.imgURL);
    // Share.share({
    //     // message: this.props.descoverDetail.title,
    //     url: this.state.imgURL,
    //     title: 'Share Post'
    // })
  }
  renderBottomSheet() {
    let isFav = false;
    if (this.props.favorites) {
      this.props.favorites.map((value) => {
        if (value === this.state.data.post_id) {
          isFav = true;
        }
      });
    }
    return (
      <View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={190}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            },
          }}
        >
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
              this.RBSheet.close();
              setTimeout(() => {
                this.sharingOptions();
              }, 600);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={images.SHARE}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ textAlignVertical: "center" }}>
                {language.Share}
              </Text>
            </View>
            <View style={styles.saperator} />
          </TouchableOpacity>

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
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ textAlignVertical: "center" }}>
                {isFav === true ? language.Bookmarked : language.Bookmark}
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
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: utility.changeHeaderColor("#FFFFFF"),
          }}
        >
          <Header
            leftImage={utility.changeCloseButton()}
            rightImage={utility.changeThreeDots()} //{utility.changeUploadButton()}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            redirectLeft={() => this.props.navigation.goBack()}
            redirectRight={() => {
              // this.sharingOptions()
              this.RBSheet.open();
            }}
          />
          <View style={styles.imageContainer}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{ uri: this.state.imgURL }}
              style={styles.imageStyle}
            />
          </View>
          {this.renderBottomSheet()}
        </View>
        <ATOMS.Loader isLoading={this.props.loadingShare} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, isSuccess, librarySearchData, favorites } = state.library;
  const { userId, userData, current_language } = state.user;
  return {
    loadingShare: state.auth.loadingShare,
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
})(ImageScreen);
