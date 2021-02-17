import React, { Component } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Tabbar } from "../components/atoms";
import Resources from "./Resources";
import Discover from "./Discover";
import Library from "./Library";
import Profile from "./Profile";
import NotSignIn from "./NotSignIn";
import { connect } from "react-redux";
import * as utility from "../Utility/util";
import * as ICONS from "../resources";
// import * as COLOR from '../constants/colors'
// import FastImage from 'react-native-fast-image'

class nightTabbar extends Component {
  constructor() {
    super();
    this.state = {
      page: "Discover",
    };
  }
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        <View style={styles.container}>
          {this.state.page === "Discover" && (
            <Discover navigation={this.props.navigation} />
          )}
          {this.state.page === "Library" && (
            <NotSignIn navigation={this.props.navigation} />
          )}
          {this.state.page === "Resources" && (
            <NotSignIn navigation={this.props.navigation} />
          )}
          {this.state.page === "Profile" && (
            <Profile navigation={this.props.navigation} />
          )}
          <Tabbar
            // type="ripple"
            // rippleColor="#F3F3F3"
            tabbarBgColor={utility.changeHeaderColor("#F3F3F3")}
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
                page: "Discover",
                tabIcon: (
                  <Image
                    source={
                      this.state.page === "Discover"
                        ? this.props.userData.night_mode
                          ? ICONS.TB_IC_DISCOVER_NIGHT_MODE_SELECTED
                          : ICONS.TB_IC_DISCOVER_SELECTED
                        : ICONS.TB_IC_DISCOVER
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode={"contain"}
                  />
                ),
              },
              {
                page: "Library",
                tabIcon: (
                  <Image
                    source={
                      this.state.page === "Library"
                        ? this.props.userData.night_mode
                          ? ICONS.TB_IC_LIBRARY_NIGHT_MODE_SELECTED
                          : ICONS.TB_IC_LIBRARY_SELECTED
                        : ICONS.TB_IC_LIBRARY
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode={"contain"}
                  />
                ),
              },
              {
                page: "Resources",
                tabIcon: (
                  <Image
                    source={
                      this.state.page === "Resources"
                        ? this.props.userData.night_mode
                          ? ICONS.TB_IC_RESOURCES_NIGHT_MODE_SELECTED
                          : ICONS.TB_IC_RESOURCES_SELECTED
                        : ICONS.TB_IC_RESOURCES
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode={"contain"}
                  />
                ),
              },
              {
                page: "Profile",
                tabIcon: (
                  <Image
                    source={
                      this.state.page === "Profile"
                        ? this.props.userData.night_mode
                          ? ICONS.TB_IC_PROFILE_NIGHT_MODE_SELECTED
                          : ICONS.TB_IC_PROFILE_SELECTED
                        : ICONS.TB_IC_PROFILE
                    }
                    style={{ height: 20, width: 20 }}
                    resizeMode={"contain"}
                  />
                ),
              },
            ]}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  const { userId, userData, userLoading } = state.user;
  return {
    userId,
    userData,
    userLoading,
  };
};
export default connect(mapStateToProps, null)(nightTabbar);
