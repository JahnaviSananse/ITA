import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Keyboard,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Share,
} from "react-native";
import styles from "./style";
import Searchbar from "../../components/atoms/Searchbar";
import language from "../../Localization";
import * as utility from "../../Utility/util";
import {
  getLibrarySearchData,
  addRemoveFavorite,
  clearData,
} from "../../store/Library/actions";
import { setRecent } from "../../store/User/actions";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import * as IMG from "../../resources/index";
import FastImage from "react-native-fast-image";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      favoriteArray: [],
      night_mode: false,
      current_language: "en",
    };
    this.props.clearData();
    setTimeout(() => {
      this.renderSearchResult();
    }, 50);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.favorites !== this.props.favorites) {
      this.state.favoriteArray = JSON.parse(
        JSON.stringify(this.props.favorites)
      );
      setTimeout(() => {
        this.setState({
          favoriteArray: JSON.parse(JSON.stringify(this.props.favorites)),
        });
      }, 300);
    }
    if (prevProps.resourceData !== this.props.resourceData) {
      if (this.props.userLoading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }
  componentWillMount() {
    utility.recordScreen("Search Screen");
  }
  renderSearchResult() {
    utility.recordEvent("SearchSCreen: renderSearchResult");
    let searchRequest = {};
    searchRequest.search_string = this.state.search;
    this.props.getLibrarySearchData(searchRequest);
  }
  fncBookmarkPost(postID) {
    utility.recordEvent("SearchSCreen: fncBookmarkPost");
    let bookmarkRequest = {};
    bookmarkRequest.post_id = postID;
    this.props.addRemoveFavorite(bookmarkRequest);
  }

  sharingOptions(item) {
    utility.recordEvent("News : sharingOptions");
    Share.share({
      message: item.title,
      url: item.file_url ? item.file_url : item.image,
      title: item.title,
    });
  }
  renderSearchbar() {
    return (
      //ListView to show with textinput used as search bar
      <View
        style={[
          styles.viewStyle,
          { backgroundColor: utility.changeHeaderColor("#E7E8E9") },
        ]}
      >
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: utility.changeBackgroundColor("#FFFFFF") },
          ]}
        >
          <View style={styles.searchbarContainer}>
            <View style={styles.iconContainer}>
              <FastImage source={IMG.SEARCH} style={styles.icon} />
            </View>
            <TextInput
              placeholder={'Search in "Library"'}
              style={styles.textFieldContainer}
              onChangeText={(search) => this.setState({ search })}
              value={this.state.search}
              returnKeyType="search"
              onSubmitEditing={() => this.renderSearchResult()}
              // onSubmitEditing={() => alert(JSON.stringify(this.props.favorites))}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.cancelButtonContainer}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderItems = ({ item, index }) => {
    let isFav = false;
    if (this.state.favoriteArray) {
      this.state.favoriteArray.map((value) => {
        if (value === item.post_id) {
          isFav = true;
        }
      });
    }
    const navigate = this.props.navigation.navigate;
    return (
      <TouchableOpacity
        style={styles.containerSearchResult}
        onPress={() => {
          this.setRecentFun(item.post_id);
          item.type === "socialpost"
            ? navigate("ImageScreen", { image: item.image })
            : navigate("WebViewScreen", { data: item });
        }}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.searchLogo}
          source={{ uri: item.image }}
        />
        <View style={styles.containerDetail}>
          <Text
            numberOfLines={1}
            style={[
              styles.searchTitle,
              { color: utility.changeFontColor("#000000") },
            ]}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text
              style={[
                styles.type,
                { color: utility.changeFontColor("#000000") },
              ]}
            >
              {item.file_type}
            </Text>
            {item.file_size !== 0 && <View style={styles.grayDot} />}
            {item.file_size !== 0 && (
              <Text
                style={[
                  styles.fileSize,
                  { color: utility.changeFontColor("#000000") },
                ]}
              >
                {item.file_size}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity
            onPress={() => {
              if (item.type !== "presentation" && item.type !== "socialpost") {
                this.fncBookmarkPost(item.post_id);
              }
            }}
          >
            {item.type !== "presentation" && item.type !== "socialpost" && (
              <FastImage
                resizeMode={"contain"}
                style={{ width: 25, height: 25 }}
                source={isFav ? IMG.BOOKMARK_SELECTED : IMG.BOOKMARK_UNSELECTED}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.sharingOptions(item)}>
            <FastImage
              resizeMode={"contain"}
              style={styles.uploadIcon}
              source={
                this.props.userData.night_mode === 1
                  ? IMG.SHARE_WHITE
                  : IMG.SHARE
              }
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  setRecentFun(post_id) {
    console.log("this.props", this.props);
    this.props.setRecent({ post_id: post_id });
    utility.recordEvent("Discover: add to recent");
  }
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#E7E8E9"),
        }}
      >
        <View style={styles.container}>
          {this.renderSearchbar()}
          <FlatList
            data={this.props.data}
            renderItem={this.renderItems.bind(this)}
            extraData={this.state}
            ListEmptyComponent={() => {
              if (this.props.loading) return null;
              return <ATOMS.PlaceholderView bgColor={"transparent"} />;
            }}
          />
        </View>
        <ATOMS.Loader isLoading={this.props.loading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, isSuccess, librarySearchData, favorites } = state.library;
  const { userId, userData, current_language } = state.user;
  return {
    current_language,
    data: librarySearchData,
    isSuccess,
    loading,
    favorites,
    userId,
    userData,
  };
};

export default connect(mapStateToProps, {
  getLibrarySearchData,
  addRemoveFavorite,
  clearData,
  setRecent,
})(SearchScreen);
