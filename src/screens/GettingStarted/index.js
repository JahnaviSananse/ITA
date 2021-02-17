import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AIMS,
  MOVEMENT_TYPES,
  SimpleAnimation,
} from "react-native-simple-animations";
import { connect } from "react-redux";
import WalkThrough from "../../components/atoms/WalkThrough";
import * as CONSTANT from "../../constants/constant";
import language from "../../Localization";
import * as IMAGE from "../../resources/index";
import { tabbarNavigation } from "../../store/Auth/actions";
import * as utility from "../../Utility/util";
import styles from "./style";
class GettingStarted extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      night_mode: false,
      current_language: "en",
      myIndex: 0,
      isDisable: false,
      aryScreen: [
        { title: language.WelcomeToITA, detail: language.WelcomeToITADetail },
        {
          title: language.Discover,
          detail: language.DiscoverDetail,
          url: require("../../resources/discover.png"),
        },
        {
          title: language.Library,
          detail: language.LibraryDetail,
          more: language.LibraryMore,
          url: require("../../resources/library.png"),
        },
        {
          title: language.Resource,
          detail: language.ResourceDetail,
          more: language.ResourceMore,
          url: require("../../resources/resources.png"),
        },
        {
          title: language.Profile,
          detail: language.ProfileDetail,
          url: require("../../resources/profile.png"),
        },
      ],
    };
    // AsyncStorage.removeItem('userGetStarted')
    // setTimeout(() => {
    //   this.setUserValue()
    // }, 100);
  }
  setUserValue() {
    AsyncStorage.getItem("userGetStarted").then((response) => {
      let userData = [];
      if (response) {
        userData = JSON.parse(JSON.stringify(response));
      }
      if (!userData.includes(this.props.userId)) {
        userData.push(this.props.userId);
        AsyncStorage.setItem("userGetStarted", JSON.stringify(userData));
      }
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
  static navigationOptions = { header: null };
  scrollToIndex = () => {
    let scrollTo = this.state.myIndex + 1;
    if (this.state.myIndex < this.state.aryScreen.length - 1) {
      // scrollTo = index + 1
      // this.setState({ myIndex: index + 1 })
      setTimeout(() => {
        this.setState({ myIndex: index + 1 });

        // this.flatListRef.scrollToIndex({ animated: true, index: scrollTo });
      }, 500);
    } else {
      this.setState({ isDisable: true });
    }
    // this.flatListRef.scrollToIndex({ animated: true, index: scrollTo });
  };
  componentWillMount() {
    utility.recordScreen("Getting Started");
  }
  onSkipClick() {
    utility.recordEvent("GettingStarted : Skip Button Pressed");
    // this.props.navigation.goBack()
    this.finalNavigation();
  }
  onNextPressed() {
    // utility.recordEvent("GettingStarted : Next Button Pressed - Index ", this.state.myIndex)
    let myIndex = this.state.myIndex + 1;
    if (myIndex < this.state.aryScreen.length - 1) {
      // this.state.myIndex = myIndex
      this.setState({ myIndex });
    } else {
      this.state.myIndex = 4;
      this.setState({ isDisable: true });
    }

    // this.flatListRef.scrollToIndex({ animated: true, index: myIndex });
  }
  finalNavigation() {
    let isLogin = this.props.route.params?.isLogin;
    if (isLogin === "1") {
      // this.props.tabbarNavigation()
      this.props.navigation.navigate("Login");
    } else {
      this.props.navigation.goBack();
    }
  }
  render() {
    const screen = this.props.route.params?.screen;
    let currentObj = [];
    if (this.state.aryScreen) {
      currentObj = JSON.parse(
        JSON.stringify(this.state.aryScreen[this.state.myIndex])
      );
      // alert(JSON.stringify(currentObj))
    }
    return (
      <View>
        <ImageBackground
          source={IMAGE.BACKGROUND_IMAGE}
          style={{ width: "100%", height: "100%" }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: utility.changeHeaderColor("transparent"),
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: utility.changeBackgroundColor("transparent"),
              }}
            >
              {currentObj.length !== 0 && (
                <WalkThrough
                  url={currentObj.url}
                  title={currentObj.title}
                  detail={currentObj.detail}
                  more={currentObj.more}
                />
              )}
              {this.state.myIndex < 4 && (
                <View
                  style={{
                    height: "20%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 100,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.onNextPressed()}
                    style={styles.nextButton}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require("../../resources/nextGettingStarted.png")}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {this.state.myIndex < 4 && (
                <Text
                  onPress={() => this.onSkipClick()}
                  style={[
                    styles.skipButton,
                    {
                      color: utility.changeFontColor("#1D343A"),
                      position: "absolute",
                      right: 20,
                      top: 20,
                    },
                  ]}
                >
                  {language.Skip}
                </Text>
              )}
              {this.state.myIndex === 4 && (
                <View style={{ position: "absolute", bottom: 200 }}>
                  <SimpleAnimation
                    aim={AIMS.IN}
                    animateOnUpdate={true}
                    delay={1500}
                    fade
                    direction={null}
                    distance={500}
                    duration={1000}
                    movementType={MOVEMENT_TYPES.SLIDE}
                    staticType={"zoom"}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.finalNavigation();
                      }}
                      style={[
                        styles.getStartedButton,
                        {
                          backgroundColor: utility.changeButtonColor("#233746"),
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: utility.changeFontColor("#FFFF"),
                          fontSize: CONSTANT.item,
                        }}
                      >
                        {language.GetStarted}
                      </Text>
                    </TouchableOpacity>
                  </SimpleAnimation>
                </View>
              )}
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, isSuccess, userId, userData, current_language } = state.user;
  return {
    current_language,
    loading,
    userData,
    isSuccess,
    userId,
  };
};

export default connect(mapStateToProps, { tabbarNavigation })(GettingStarted);
