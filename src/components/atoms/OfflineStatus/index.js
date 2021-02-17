import NetInfo from "@react-native-community/netinfo";
import React, { Component } from "react";
import { Animated, AppState, Easing, View } from "react-native";
import { connect } from "react-redux";
import language from "../../../Localization";
import { updateInternetStatus } from "../../../store/Auth/actions";
import styles from "./index.styles";
class OfflineBar extends Component {
  animationConstants = {
    DURATION: 800,
    TO_VALUE: 4,
    INPUT_RANGE: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0],
  };

  setNetworkStatus = (status) => {
    this.props.updateInternetStatus(status);
  };

  state = {
    isConnected: true,
    offlineText: "",
  };
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      // NetInfo.fetch().then(this.setNetworkStatus);
    }
  };
  componentWillMount() {
    // NetInfo.addEventListener('change', this.setNetworkStatus);
    // setTimeout(() => {
    //   NetInfo.isConnected.fetch().then(this.setNetworkStatus);
    // }, 500);
    AppState.addEventListener("change", this._handleAppStateChange);
    this.animation = new Animated.Value(0);
  }
  componentWillUnMount() {
    // NetInfo.isConnected.removeEventListener('change', this.setNetworkStatus);
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }
  // Took Reference from https://egghead.io/lessons/react-create-a-button-shake-animation-in-react-native#/tab-code
  triggerAnimation = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: this.animationConstants.DURATION,
      toValue: this.animationConstants.TO_VALUE,
      useNativeDriver: true,
      ease: Easing.bounce,
    }).start();
  };

  // componentWillReceiveProps(newProps) {
  //   if (newProps) {
  //     if (this.props.isConnected != newProps.isConnected) {
  //       if (this.props.isConnected) {
  //         // Show Bar
  //         this.setState({
  //           isConnected: true
  //         })
  //       } else {
  //         // Hide Bar
  //         this.setState({
  //           isConnected: false
  //         })
  //       }
  //     }
  //   }
  // }
  render() {
    const interpolated = this.animation.interpolate({
      inputRange: this.animationConstants.INPUT_RANGE,
      outputRange: this.animationConstants.OUTPUT_RANGE,
    });
    const animationStyle = {
      transform: [{ translateX: interpolated }],
    };
    const { offlineText = language.InternetConnection } = this.props;

    if (this.props.status !== undefined) {
      return this.props.status === 0 ? (
        <View style={[styles.container]}>
          <Animated.Text style={[styles.offlineText, animationStyle]}>
            {offlineText}
          </Animated.Text>
        </View>
      ) : null;
    }

    // return (
    //   <View style={[styles.container]}>
    //     <Animated.Text style={[styles.offlineText, animationStyle]}>{this.props.isConnected ? 'true' : 'false'}</Animated.Text>
    //   </View>
    // )
    return !this.props.isConnected ? (
      <View style={[styles.container]}>
        <Animated.Text style={[styles.offlineText, animationStyle]}>
          {offlineText}
        </Animated.Text>
      </View>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  const { isConnected } = state.auth;
  return {
    isConnected,
  };
};

export default connect(mapStateToProps, { updateInternetStatus })(OfflineBar);
