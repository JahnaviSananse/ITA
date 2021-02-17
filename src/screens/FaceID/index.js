import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Switch, Text, SafeAreaView } from "react-native";
import styles from "./style";
import Header from "../../components/atoms/Header/index";
import * as images from "../../resources/index";
import language from "../../Localization";
import * as utility from "../../Utility/util";

export default class FaceID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
    };
  }
  toggleSwitch = (value) => {
    utility.recordEvent("FaceIDScreen : toggleSwitch");
    this.setState({ switchValue: value });
    if (value) {
      AsyncStorage.setItem("biometryType", "1");
    } else {
      AsyncStorage.removeItem("biometryType");
    }
  };
  componentWillMount() {
    AsyncStorage.getItem("biometryType").then((response) => {
      if (response) {
        this.setState({
          switchValue: true,
        });
      } else {
        this.setState({
          switchValue: false,
        });
      }
    });
    utility.recordScreen("Face ID Screen");
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
          style={[
            styles.container,
            {
              backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
            },
          ]}
        >
          <Header
            title={language.FaceID}
            backgroundColor={utility.changeHeaderColor("#F3F3F3")}
            leftImage={utility.changeCloseButton()}
            redirectLeft={() => this.props.navigation.goBack()}
          />
          <View style={styles.switchContainer}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: utility.changeFontColor("#6b6b6a"),
                },
              ]}
            >
              {language.FaceID}
            </Text>
            <Switch
              onTintColor="#87B1B4"
              style={styles.switchStyle}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.descText,
                { color: utility.changeFontColor("#6b6b6a") },
              ]}
            >
              {language.FaceIdMessage}
            </Text>
            <Text
              style={[
                styles.descText,
                { color: utility.changeFontColor("#6b6b6a") },
              ]}
            >
              {language.FaceIdWarning}
            </Text>
            <Text
              style={[
                styles.descText,
                { color: utility.changeFontColor("#6b6b6a") },
              ]}
            >
              {language.FaceIdTurnOff}
            </Text>
            <Text
              style={[
                styles.descText,
                { color: utility.changeFontColor("#6b6b6a") },
              ]}
            >
              {language.FaceIdTradeMark}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
