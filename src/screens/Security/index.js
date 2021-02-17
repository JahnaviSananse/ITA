import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import * as CONSTANT from "../../constants/constant";
import Header from "../../components/atoms/Header/index";
import * as images from "../../resources/index";
import language from "../../Localization";
import styles from "./style";
import * as utility from "../../Utility/util";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import TouchID from "react-native-touch-id";

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //data: [language.Password, language.TouchID, language.FaceID], //'Face ID'
      //'Face ID'
      night_mode: false,
      current_language: "en",
      isSupportedTouchId: 0,
    };
  }

  componentWillMount() {
    utility.recordScreen("Security Screen");

    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        // Success code
        if (biometryType === "FaceID") {
          // for ios
          this.setState({
            isSupportedTouchId: 2,
          });
        } else if (biometryType === "TouchID") {
          // for ios
          this.setState({
            isSupportedTouchId: 1,
          });
          //this.allowedSupport(language.ActivateTouchIDAlert, '1')
        } else if (Platform.OS === "android" && biometryType === true) {
          // for android
          this.setState({
            isSupportedTouchId: 1,
          });
        }
      })
      .catch((error) => {
        // Failure codealert(error)
        console.log("catch==>" + error);
      });
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
  _renderRedirect = (value) => {
    switch (value) {
      case 2:
        utility.recordEvent("Security: FaceID Pressed");
        this.props.navigation.push("FaceID");
        break;
      case 1:
        utility.recordEvent("Security: TouchID Pressed");
        this.props.navigation.push("TouchID");
        break;

      case 3:
        utility.recordEvent("Security: Change Password Pressed"),
          this.props.navigation.push("ChangePassword");
        break;
    }
  };
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
            title={language.Security}
            leftImage={utility.changeBackButton()}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            redirectLeft={() => this.props.navigation.goBack()}
          />
          <View>
            <TouchableOpacity onPress={() => this._renderRedirect(3)}>
              <Text
                style={[
                  styles.title,
                  { color: utility.changeFontColor("#6b6b6a") },
                ]}
              >
                {language.Password}
              </Text>
              <FastImage
                style={styles.iconNext}
                source={utility.changeNextButton()}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.state.isSupportedTouchId === 0
                  ? null
                  : this._renderRedirect(this.state.isSupportedTouchId)
              }
            >
              <Text
                style={[
                  styles.title,
                  { color: utility.changeFontColor("#6b6b6a") },
                ]}
              >
                {this.state.isSupportedTouchId === 1 && language.TouchID}
                {this.state.isSupportedTouchId === 2 && language.FaceID}
                {this.state.isSupportedTouchId === 0 && null}
              </Text>

              <FastImage
                style={styles.iconNext}
                source={
                  this.state.isSupportedTouchId === 0
                    ? null
                    : utility.changeNextButton()
                }
              />
            </TouchableOpacity>
          </View>
          {/* <FlatList
            data={this.data}
            style={{ backgroundColor: utility.changeHeaderColor('#FFFFFF') }}
            renderItem={({ item, index }) => <TouchableOpacity onPress={() => this._renderRedirect(index)}>
              <Text
                style=
                {[
                  styles.title,
                  { color: utility.changeFontColor("#6b6b6a"), }
                ]}>{item}</Text>
              <FastImage style={styles.iconNext} source={utility.changeNextButton()} />
            </TouchableOpacity>}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { loading, userData, current_language } = state.user;
  return {
    current_language,
    loading,
    userData,
  };
};

export default connect(mapStateToProps, null)(Security);
