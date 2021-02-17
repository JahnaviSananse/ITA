import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { login } from "../../store/Auth/actions";
import * as COLOR from "../../constants/colors";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "react-native-underline-tabbar";
import Grid from "../../components/atoms/FlatGrid";
import Header from "../../components/atoms/Header/index";
import * as images from "../../resources/index";
import language from "../../Localization";
import * as utility from "../../Utility/util";
import styles from "./style";
import {
  getProduct,
  getProductLoadMore,
  getProductPullToRefresh,
} from "../../store/Products/actions";
import { setRecent } from "../../store/User/actions";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";

class SocialPosts extends Component {
  constructor() {
    super();
    this.state = {
      category_id: "",
      paged: 1,
      category: [],
      isLoadMore: false,
      headerTitle: "",
    };
    setTimeout(() => {
      this.state.headerTitle = this.props.route.params?.headerTitle;
      this.state.category = this.props.route.params?.category;
      this.state.title = this.props.route.params?.headerTitle;
      this.state.paged = 1;
      this.state.category_id = this.state.category[0].id;
      this.getProduct();
      this.state.paged = 2;
    }, 100);
  }
  componentWillMount() {
    utility.recordScreen("Social Posts Screen");
  }
  onImageClick() {
    utility.recordEvent("SocialPost : Open Post");
    this.props.navigation.navigate("ImageScreen");
  }
  getProduct() {
    utility.recordEvent("SocialPost : getProduct");
    let request = {};
    request.category_id = this.state.category_id;
    request.paged = this.state.paged;
    this.props.getProduct(request);
  }
  getPullToRefresh() {
    utility.recordEvent("SocialPost : getProductPullToRefresh");
    let request = {};
    request.category_id = this.state.category_id;
    request.paged = this.state.paged;
    this.props.getProductPullToRefresh(request);
  }
  getProductLoadMore() {
    utility.recordEvent("SocialPost : getProduct");
    let request = {};
    request.category_id = this.state.category_id;
    request.paged = this.state.paged;
    this.props.getProductLoadMore(request);
  }
  render() {
    const TYPE = {
      SOCIAL: "socialPosts",
      PRODUCTS: "products",
      PROFILE: "profile",
    };
    let isCover = true;
    let finalData = [];
    let coverData = [];
    if (this.props.product) {
      this.props.product.map((value, index) => {
        if (value.is_cover_post === 1 && coverData.length === 0) {
          coverData.push(value);
          isCover = true;
        } else {
          finalData.push(value);
        }
      });

      if (coverData.length > 0) {
        // finalData.unshift(coverData[0]);
      }
    }

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
          }}
        >
          <Header
            title={this.state.headerTitle}
            leftImage={utility.changeBackButton()}
            rightImage={utility.changeSearchButton()}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            redirectLeft={() => this.props.navigation.goBack()}
            redirectRight={() =>
              this.props.navigation.push("SearchScreen", {
                placeholder: language.SocialPosts,
              })
            }
          />
          <ScrollableTabView
            onChangeTab={(index, ref) => {
              console.log("this.state", this.state);
              let current = index.i;
              this.state.paged = 1;
              // this.state.category_id = this.state.category[current].id;
              // this.getProduct();
              setTimeout(() => {
                this.state.category_id =
                  this.state.category.length > 0
                    ? this.state.category[current].id
                    : 0;
                this.getProduct();
              }, 500);
              this.state.paged = 2;
              this.state.isLoadMore = false;
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
            {this.state.category.map((item) => (
              <View tabLabel={{ label: item.name }}>
                <View style={{ height: "100%" }}>
                  <Grid
                    type={TYPE.SOCIAL}
                    isCoverImage={isCover}
                    // data={this.props.product}
                    enablePull={true}
                    loadingPull={this.props.pullToRefresh}
                    pullToRefresh={() => {
                      this.state.paged = 1;
                      this.getPullToRefresh();
                      this.state.paged = 2;
                      this.state.isLoadMore = false;
                    }}
                    data={finalData}
                    onPress={(item) => {
                      this.props.setRecent({ post_id: item.post_id });
                      this.props.navigation.navigate("ImageScreen", {
                        image: item.image,
                        data: item,
                      });
                    }}
                    allowedLoadMore={true}
                    onLoadMore={() => {
                      if (this.state.isLoadMore) {
                        return;
                      }
                      this.state.isLoadMore = true;
                      setTimeout(() => {
                        if (!this.props.loading && this.props.isLoadMore) {
                          this.getProductLoadMore();
                          setTimeout(() => {
                            this.state.paged = this.state.paged + 1;
                            this.state.isLoadMore = false;
                          }, 100);
                        } else {
                          this.state.isLoadMore = false;
                        }
                      }, 1000);
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollableTabView>
          <ATOMS.Loader isLoading={this.props.loading} />
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { configData } = state.auth;
  const { product, loading, isLoadMore, pullToRefresh } = state.product;
  return {
    pullToRefresh,
    configData,
    product,
    loading,
    isLoadMore,
  };
};

export default connect(mapStateToProps, {
  getProduct,
  setRecent,
  getProductLoadMore,
  getProductPullToRefresh,
})(SocialPosts);
