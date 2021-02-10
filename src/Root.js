import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import {fromBottom, fromRight} from 'react-navigation-transitions';
import {connect} from 'react-redux';
import Home from '../Home';
import {
  ChangePassword,
  Chat,
  Discover,
  EnterCode,
  Evolution,
  Filter,
  FingerPrint,
  Flyer,
  ForgotPassword,
  Fund,
  GettingStarted,
  ImageScreen,
  Language,
  LanguageNotification,
  Library,
  Login,
  News,
  Notification,
  NotSignIn,
  Privacy,
  Product,
  Profile,
  ReportAnIssue,
  ResetPassword,
  Resources,
  RiskProfile,
  RiskProfileFinalStep,
  RiskProfileModal,
  SearchScreen,
  Security,
  Setting,
  SignUp,
  SignupPassword,
  SocialPosts,
  Splash,
  TouchID,
  Video,
  WebViewScreen,
} from '../src/screens';
import navigationRef from './routes/router';
import GuestTabbarScreen from './screens/GuestTabbarScreen';
import MainTabbarScreen from './screens/MainTabbarScreen';

const handleCustomTransition = ({scenes}) => {
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    nextScene.route.routeName === 'News' ||
    nextScene.route.routeName === 'Filter'
  ) {
    return fromBottom();
  }
  return fromRight();
};

const Root = (props) => {
  console.disableYellowBox = true;
  let acessToken = null;
  const Stack = createStackNavigator();
  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
        [
          {
            text: 'Close',
            onPress: () => {
              // BackAndroid.exitApp();
            },
          },
        ],
      );

      AsyncStorage.getItem('userData').then((userdata) => {
        let user_id = '';
        if (userdata) {
          let dataUser = JSON.parse(userdata);
          user_id = dataUser.user_id;
        }
        AsyncStorage.getItem(key.kEventList).then((events) => {
          if (events) {
            var requestParam = {};
            requestParam.user_id = user_id;
            requestParam.steps = events;
            requestParam.error = `${e.name} ${e.message}`;
            let sessionString = ' Model :' + DeviceInfo.getModel();
            sessionString =
              sessionString + ' Device type :' + DeviceInfo.getDeviceType();
            sessionString = sessionString + ' Brand :' + DeviceInfo.getBrand();
            sessionString =
              sessionString + ' Build Number :' + DeviceInfo.getBuildNumber();
            sessionString =
              sessionString + ' Device Locale :' + DeviceInfo.getDeviceLocale();
            sessionString =
              sessionString +
              ' Device Free Storage :' +
              DeviceInfo.getFreeDiskStorage();
            sessionString =
              sessionString + ' Manufacturer :' + DeviceInfo.getManufacturer();
            sessionString =
              sessionString +
              ' System Version :' +
              DeviceInfo.getSystemVersion();
            requestParam.deviceInfo = sessionString;

            const axios = require('axios');
            axios({
              method: 'post',
              url: API.API_EXCEPTION,
              data: requestParam,
              headers: {
                'Content-Type': 'Application/json',
              },
            })
              .then((response) => {
                alert(response.data.message);
              })
              .catch((error) => {});
          }
        });
      });
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };
  setJSExceptionHandler(errorHandler, false);
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="EnterCode" component={EnterCode} />

          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen name="Resources" component={Resources} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen
            name="LanguageNotification"
            component={LanguageNotification}
          />
          <Stack.Screen name="Fund" component={Fund} />
          <Stack.Screen name="Filter" component={Filter} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="FingerPrint" component={FingerPrint} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="GettingStarted" component={GettingStarted} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="SocialPosts" component={SocialPosts} />
          <Stack.Screen name="Evolution" component={Evolution} />
          <Stack.Screen name="RiskProfile" component={RiskProfile} />
          <Stack.Screen
            name="RiskProfileFinalStep"
            component={RiskProfileFinalStep}
          />
          <Stack.Screen name="ReportAnIssue" component={ReportAnIssue} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SignupPassword" component={SignupPassword} />
          <Stack.Screen name="Flyer" component={Flyer} />
          <Stack.Screen name="TouchID" component={TouchID} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
          <Stack.Screen name="NotSignIn" component={NotSignIn} />
          <Stack.Screen name="RiskProfileModal" component={RiskProfileModal} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen
            name="MainTabbarScreen"
            component={MainTabbarScreen}
            navigationOptions={(gesturesEnabled = false)}
          />
          <Stack.Screen
            name="GuestTabbarScreen"
            component={GuestTabbarScreen}
            navigationOptions={(gesturesEnabled = false)}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
// export default Root;
const mapStateToProps = (state) => ({
  user_data: state.auth.user_data,
  access_token: state.auth.access_token,
});

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Root);
