import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Alert,
  SafeAreaView,
  SectionList,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import * as ATOMS from "../../components/atoms";
import Header from "../../components/atoms/Header/index";
import * as CONSTANT from "../../constants/constant";
import language from "../../Localization";
import {
  changeNightMode,
  logout,
  updateNightMode,
} from "../../store/User/actions";
import * as utility from "../../Utility/util";
import styles from "./style";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      night_mode: false,
      current_language: "en",
    };

    setTimeout(() => {
      this.getNightMode();
    }, 500);
  }

  getNightMode() {
    this.setState({
      switchValue: this.props.userData.night_mode === 1 ? true : false,
    });
  }
  toggleSwitch = (value) => {
    utility.recordEvent("Setting : NightMode switch toggle");
    this.setState({ switchValue: value });
    if (this.props.userId) {
      let nightMode = {};
      nightMode.nightmode_status = value ? 1 : 0;
      this.props.updateNightMode(nightMode);
    } else {
      let req = {};
      req.night_mode = value ? 1 : 0;
      this.props.changeNightMode(req);
    }
  };

  componentWillMount() {
    utility.recordScreen("Setting Screen");
  }

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
  renderSignupAlert() {
    Alert.alert(
      "",
      language.RememberAccountSettings,
      [
        {
          text: language.YES,
          onPress: () => {
            this.renderMainSignOutAlert(1);
          },
        },
        {
          text: language.NO,
          onPress: () => {
            this.renderMainSignOutAlert(0);
          },
        },
        {
          text: language.Cancel,
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  renderMainSignOutAlert(isKeep) {
    AsyncStorage.getItem("userLogin").then((userLogin) => {
      console.log("user login......", userLogin);
      if (userLogin) {
        let dataUser = JSON.parse(userLogin);
        AsyncStorage.getItem("biometryType").then((biometryType) => {
          if (biometryType !== 0) {
            AsyncStorage.setItem("loginBio", JSON.stringify(dataUser));
          } else {
            AsyncStorage.removeItem("loginBio");
          }

          let request = {};
          request.isKeep = isKeep;
          request.device_token = this.props.authToken;
          console.log("NAV........", this.props);
          this.props.logout(request, this.props.navigation);
        });
      } else {
        let request = {};
        request.isKeep = isKeep;
        request.device_token = this.props.authToken;
        this.props.logout(request, this.props.navigation);
      }
    });
  }

  _renderRedirect = (value) => {
    switch (value) {
      case CONSTANT.LANGUAGE:
        utility.recordEvent("Settings : Language Option Pressed");
        this.props.navigation.push("Language");
        break;
      case CONSTANT.SECURITY:
        utility.recordEvent("Settings : Security Option Pressed");
        this.props.navigation.push("Security");
        break;
      case CONSTANT.NOTIFICATION:
        utility.recordEvent("Settings : Notification Option Pressed");
        this.props.navigation.push("Notification");
        break;
      case CONSTANT.REPORT_ISSUE:
        utility.recordEvent("Settings : ReportAnIssue Option Pressed");
        this.props.navigation.push("ReportAnIssue");
        break;
      case CONSTANT.FAQ:
        utility.recordEvent("Settings : FAQ Option Pressed");
        //this.props.navigation.navigate("WebViewScreen", { "title": language.FAQ })
        break;
      case CONSTANT.PRIVACY:
        let data = {};
        data.title = "";
        data.file_url = this.props.configData.privacy_policy;
        this.props.navigation.navigate("WebViewScreen", { data });

        // utility.recordEvent("Settings : Privacy Option Pressed")
        // this.props.navigation.push("Privacy")
        break;
      case CONSTANT.GETTING_STARTED:
        utility.recordEvent("Settings : GettingStarted Option Pressed");
        this.props.navigation.navigate("GettingStarted", {
          screen: "setting",
          isLogin: "0",
        });
        break;
      case CONSTANT.SIGNOUT:
        utility.recordEvent("Settings : Signout Option Pressed");
        this.renderSignupAlert();
        // this.props.logout()
        break;
    }
  };
  getBGColor(color) {
    const { userData } = this.props;
    let isNightMode = userData.night_mode === 0 ? false : true;
    return utility.changeBackgroundColorNew(color, isNightMode);
  }
  render() {
    let sectionOne = [];
    let sectionTwo = [];

    let img_lan =
      this.props.userData.night_mode === 1
        ? require("../../resources/language_w.png")
        : require("../../resources/language.png");
    let img_sec =
      this.props.userData.night_mode === 1
        ? require("../../resources/security_w.png")
        : require("../../resources/security.png");
    let img_noti =
      this.props.userData.night_mode === 1
        ? require("../../resources/Notification_w.png")
        : require("../../resources/Notification.png");
    let img_night =
      this.props.userData.night_mode === 1
        ? require("../../resources/nightMode_w.png")
        : require("../../resources/nightMode.png");
    let img_report =
      this.props.userData.night_mode === 1
        ? require("../../resources/report_w.png")
        : require("../../resources/report.png");
    let img_privacy =
      this.props.userData.night_mode === 1
        ? require("../../resources/privacy_w.png")
        : require("../../resources/privacy.png");
    let img_gettingstarted =
      this.props.userData.night_mode === 1
        ? require("../../resources/gettingStarted_w.png")
        : require("../../resources/gettingStarted.png");
    if (this.props.userId) {
      sectionOne = [
        {
          icon: img_lan,
          category: CONSTANT.LANGUAGE,
          text: language[CONSTANT.LANGUAGE],
        },
        {
          icon: img_sec,
          category: CONSTANT.SECURITY,
          text: language[CONSTANT.SECURITY],
        },
        {
          icon: img_noti,
          category: CONSTANT.NOTIFICATION,
          text: language[CONSTANT.NOTIFICATION],
        },
        {
          icon: img_night,
          category: CONSTANT.NIGHT_MODE,
          text: language.Night_mode,
        },
      ];

      sectionTwo = [
        {
          icon: img_report,
          category: CONSTANT.REPORT_ISSUE,
          text: language.SmallReportAnIssue,
        },
        // { icon: require("../../resources/FAQ.png"), category: CONSTANT.FAQ },
        {
          icon: img_privacy,
          category: CONSTANT.PRIVACY,
          text: language[CONSTANT.PRIVACY],
        },
        {
          icon: img_gettingstarted,
          category: CONSTANT.GETTING_STARTED,
          text: language.Getting_started,
        },
        { icon: "", category: CONSTANT.SIGNOUT },
      ];
    } else {
      sectionOne = [
        {
          icon: img_lan,
          category: CONSTANT.LANGUAGE,
          text: language[CONSTANT.LANGUAGE],
        },
        {
          icon: img_night,
          category: CONSTANT.NIGHT_MODE,
          text: language.Night_mode,
        },
      ];

      sectionTwo = [
        {
          icon: img_privacy,
          category: CONSTANT.PRIVACY,
          text: language[CONSTANT.PRIVACY],
        },
        {
          icon: img_gettingstarted,
          category: CONSTANT.GETTING_STARTED,
          text: language.Getting_started,
        },
      ];
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        <View style={styles.container}>
          <Header
            title={language.Settings}
            leftImage={utility.changeCloseButton()}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            redirectLeft={() => {
              console.log("this.props=======>>>>", this.props);
              this.props.navigation.replace("MainTabbarScreen");
            }}
          />
          <SectionList
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{
              height: "100%",
              backgroundColor: this.getBGColor("#FFFFFF"),
            }}
            sections={[
              {
                title: language.Preferences,
                data: sectionOne,
              },
              {
                title: language.About,
                data: sectionTwo,
              },
            ]}
            renderSectionHeader={({ section }) => (
              <Text
                style={[
                  styles.SectionHeader,
                  {
                    color: utility.changeFontColor("#696969"),
                    backgroundColor: this.getBGColor("#FFFFFF"),
                  },
                ]}
              >
                {" "}
                {section.title}{" "}
              </Text>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this._renderRedirect(item.category)}
                disabled={item.category === CONSTANT.NIGHT_MODE ? true : false}
                style={{ flexDirection: "row", marginTop: 10 }}
              >
                {item.category != CONSTANT.SIGNOUT && (
                  <FastImage
                    style={styles.iconStyle}
                    resizeMode={FastImage.resizeMode.contain}
                    source={item.icon}
                  />
                )}

                <Text
                  style={[
                    styles.SectionListItemS,
                    {
                      color:
                        item.category != CONSTANT.SIGNOUT
                          ? utility.changeFontColor("#696969")
                          : "#89B4B6",
                      marginLeft: item.category != CONSTANT.SIGNOUT ? 0 : 5,
                    },
                  ]}
                >
                  {item.category != CONSTANT.SIGNOUT
                    ? item.text
                    : language.SignOut}
                </Text>

                {item.category === CONSTANT.NIGHT_MODE ? (
                  <Switch
                    onTintColor="#87B1B4"
                    style={styles.switchStyle}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                  />
                ) : (
                  <FastImage
                    style={styles.iconNextStyle}
                    source={
                      item.category != CONSTANT.SIGNOUT &&
                      utility.changeNextButton()
                    }
                  />
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
          <ATOMS.Loader isLoading={this.props.loading} />
          <Text
            style={{
              position: "absolute",
              bottom: 30,
              alignSelf: "center",
              color: "gray",
            }}
          >
            {language.Version} {DeviceInfo.getVersion()}
          </Text>
        </View>
        {/* <ATOMS.OfflineBar /> */}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { loading, userData, current_language, userId, authToken } = state.user;
  const { configData } = state.auth;
  return {
    configData,
    userId,
    loading,
    userData,
    current_language,
    authToken,
  };
};

export default connect(mapStateToProps, {
  logout,
  updateNightMode,
  changeNightMode,
})(Setting);
