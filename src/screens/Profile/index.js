import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  AsyncStorage,
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "react-native-underline-tabbar";
import Grid from "../../components/atoms/FlatGrid";
import PlaceholderView from "../../components/atoms/PlaceholderView";
import styles from "./style";
import TabHeader from "../../components/atoms/TabHeader";
import * as images from "../../resources/index";
import language from "../../Localization";
import * as utility from "../../Utility/util";
import {
  getFavList,
  getRecentList,
  getRecentPullToRefresh,
  getFavListPull,
} from "../../store/RecentFav/actions";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import { setRecent } from "../../store/User/actions";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      paged: 1,
      redirectScreen: "Setting",
      night_mode: true,
      current_language: "en",
      favdata: {
        title: "NO FAVORITES HAVE BEEN ADDED YET",
        description:
          "Whenever you see this icon, tap it! Everything will be saved here.",
        image: images.FAVORITE,
      },
      recentdata: {
        title: language.NoRecentItems,
        description: language.RecentContent,
        image: images.RECENT,
      },
      pdfData: [
        { title: "Evolution" },
        { title: "S&P 500 Index" },
        { title: "Platinum" },
      ],
    };
    setTimeout(() => {
      this.getData();
    }, 200);
  }
  setRecent(post_id) {
    this.props.setRecent({ post_id: post_id });
    utility.recordEvent("Discover: add to recent");
  }
  getData() {
    if (this.props.userId) {
      this.state.paged = 1;
      if (this.state.current === 0) {
        this.props.getRecentList({ paged: this.state.paged });
      } else {
        this.props.getFavList({ paged: this.state.paged });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData) {
      if (this.props.userLoading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }
  componentDidMount() {
    this.setState({ redirectScreen: "Setting" });
    // AsyncStorage.getItem('userData').then((response) => {
    //     if (response) {
    //         this.setState({ redirectScreen: "Setting" })
    //     }
    //     else {
    //         this.setState({ redirectScreen: "NotSignIn" })
    //     }
    // });
  }

  componentWillMount() {
    utility.recordScreen("Profile Screen");
  }
  getPullToRefreshFav() {
    this.props.getFavListPull({ paged: this.state.paged });
  }
  getPullToRefresh() {
    utility.recordEvent("ProductList : getProductPullToRefresh");
    let request = {};
    request.category_id = this.state.category_id;
    request.paged = this.state.paged;
    this.props.getRecentPullToRefresh(request);
  }
  render() {
    const type = {
      PROFILE: "profile",
    };
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
            backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
            paddingBottom: 1,
          }}
        >
          <TabHeader
            title={language.Profile}
            img={utility.changeSettingButton()}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            redirectRight={() =>
              this.props.navigation.push(this.state.redirectScreen)
            }
          />
          <ScrollableTabView
            onChangeTab={(index, ref) => {
              this.state.current = index.i;
              this.getData();
            }}
            tabBarActiveTextColor={utility.changeFontColor("#000000")}
            tabBarInactiveTextColor={utility.changeFontColor("#696969")}
            renderTabBar={() => (
              <TabBar
                style={{ borderBottomWidth: 0 }}
                underlineColor={utility.changeFontColor("#93b1b4")}
              />
            )}
          >
            <View tabLabel={{ label: language.Recent }}>
              <View style={{ height: "100%" }}>
                {/* <Grid
                                    type={type.PROFILE}
                                    // img={require('../../resources/profilePDF.jpg')}
                                    data={this.props.recentList}
                                    onPress={(item) => {
                                        alert(JSON.strin gify(item))
                                    }}
                                /> */}
                {!this.props.loading && this.props.recentList.length > 0 ? (
                  <Grid
                    type={type.PROFILE}
                    loadingPull={this.props.pullToRefresh}
                    pullToRefresh={() => {
                      this.state.paged = 1;
                      this.getPullToRefresh();
                      this.state.paged = 2;
                      this.state.isLoadMore = false;
                    }}
                    data={this.props.recentList}
                    onPress={(item) => {
                      this.setRecent(item.post_id);
                      item.type === "socialpost"
                        ? this.props.navigation.navigate("ImageScreen", {
                            image: item.image,
                            data: item,
                          })
                        : this.props.navigation.navigate("WebViewScreen", {
                            data: item,
                          });
                    }}
                  />
                ) : (
                  <View>
                    {this.props.loading ? null : (
                      <PlaceholderView
                        title={language.NoRecentItems}
                        image={this.state.recentdata.image}
                        description={language.RecentContent}
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
            <View tabLabel={{ label: language.Favorite }}>
              <View style={{ height: "100%" }}>
                {!this.props.loading && this.props.favoriteList.length > 0 && (
                  <Grid
                    type={type.PROFILE}
                    loadingPull={this.props.pullToRefresh}
                    pullToRefresh={() => {
                      this.state.paged = 1;
                      this.getPullToRefreshFav();
                      this.state.paged = 2;
                      this.state.isLoadMore = false;
                    }}
                    data={this.props.favoriteList}
                    onPress={(item) => {
                      this.setRecent(item.post_id);
                      item.type === "socialpost"
                        ? this.props.navigation.navigate("ImageScreen", {
                            image: item.image,
                            data: item,
                          })
                        : this.props.navigation.navigate("WebViewScreen", {
                            data: item,
                          });
                    }}
                  />
                )}
                {
                  <View>
                    {!this.props.loading &&
                      this.props.favoriteList.length === 0 && (
                        <PlaceholderView
                          title={language.NoFavItems}
                          image={this.state.favdata.image}
                          description={language.FavContent}
                        />
                      )}
                  </View>
                }
              </View>
            </View>
          </ScrollableTabView>

          <ATOMS.Loader isLoading={this.props.loading} />
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    loading,
    isSuccess,
    recentList,
    favoriteList,
    pullToRefresh,
  } = state.recentfav;
  const { userId, userData, userLoading, current_language } = state.user;
  return {
    current_language,
    userId,
    loading,
    isSuccess,
    recentList,
    favoriteList,
    userData,
    userLoading,
    pullToRefresh,
  };
};
export default connect(mapStateToProps, {
  getFavList,
  getFavListPull,
  getRecentList,
  setRecent,
  getRecentPullToRefresh,
})(Profile);
