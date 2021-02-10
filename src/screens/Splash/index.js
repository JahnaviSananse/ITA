import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  ImageBackground,
  Linking,
  StatusBar,
  Text,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation';
import TouchID from 'react-native-touch-id';
import {connect} from 'react-redux';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import {
  checkAppVersion,
  checkLogin,
  getCommonConfig,
} from '../../store/Auth/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {restartAllowed: true};
    AsyncStorage.removeItem('currentLan');
    AsyncStorage.removeItem('isDiscover');
    AsyncStorage.removeItem('isLibraryItem');
    AsyncStorage.removeItem('isChat');
    AsyncStorage.removeItem('isVideo');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.configData !== this.props.configData) {
      if (this.props.loading === false && this.props.isSuccess) {
        this.props.checkAppVersion();
      }
    }
    if (prevProps.checkVersion !== this.props.checkVersion) {
      if (
        this.props.checkVersion.loading === false &&
        this.props.checkVersion.success
      ) {
        if (Object.keys(this.props.checkVersion.data).length === 0) {
          // Move on LOGIN
          // this.props.checkLogin()
          this.checkForTouchID();
        } else {
          let vData = this.props.checkVersion.data;
          if (vData.is_update === true) {
            let buttonArray = [];
            let update = {
              text: 'Update',
              onPress: () => {
                Linking.canOpenURL(vData.app_link)
                  .then((supported) => {
                    if (!supported) {
                      alert("Can't handle url: " + vData.app_link);
                    } else {
                      return Linking.openURL(vData.app_link);
                    }
                  })
                  .catch((err) => console.error('An error occurred', err));
              },
            };
            buttonArray.push(update);

            if (vData.is_soft === true) {
              let update = {
                text: language.OK,
                onPress: () => {
                  // this.props.checkLogin()
                  this.checkForTouchID();
                },
              };
              buttonArray.push(update);
            }
            Alert.alert('', vData.message, buttonArray);
          } else {
            // Move on LOGIN
            // this.props.checkLogin()
            this.checkForTouchID();
          }
        }
      }
    }
  }

  componentWillMount() {
    utility.recordScreen('Splash');
    // alert(DeviceInfo.getBrand())
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    this.props.getCommonConfig();
    // this.syncImmediate();
  }
  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: false},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }
  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({restartAllowed: !this.state.restartAllowed});
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage) => {
        this.setState({
          syncMessage: metadata
            ? JSON.stringify(metadata)
            : 'Running binary version',
          progress: false,
        });
      },
      (error: any) => {
        this.setState({syncMessage: 'Error: ' + error, progress: false});
      },
    );
  }
  codePushDownloadDidProgress(progress) {
    this.setState({progress});
  }
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({syncMessage: 'Checking for update.'});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({syncMessage: 'Downloading package.'});
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({syncMessage: 'Awaiting user action.'});
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({syncMessage: 'Installing update.'});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({syncMessage: 'App up to date.', progress: false});
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: false,
        });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: false,
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',
          progress: false,
        });
        break;
    }
  }
  checkForTouchID() {
    const ConfigObject = {
      title: language.FingerprintRequired, // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: language.TouchSensor, // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: language.Cancel, // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    setTimeout(() => {
      AsyncStorage.getItem('biometryType').then((response) => {
        if (response) {
          AsyncStorage.getItem('userData').then((userRes) => {
            if (userRes) {
              TouchID.authenticate(
                'Lightly press against the sensor to verify your fingerprint',
                ConfigObject,
              )
                .then((success) => {
                  this.props.checkLogin();
                })
                .catch((error) => {
                  // AsyncStorage.removeItem('biometryType');
                  AsyncStorage.removeItem('userData');
                  this.props.checkLogin();
                });
            } else {
              this.props.checkLogin();
            }
          });
          // TouchID.authenticate('Lightly press against the sensor to verify your fingerprint', ConfigObject)
          // 	.then((success) => {
          // 		this.props.checkLogin();
          // 	})
          // 	.catch((error) => {
          // 		// AsyncStorage.removeItem('biometryType');
          // 		AsyncStorage.removeItem('userData');
          // 		this.props.checkLogin();
          // 	});
        } else {
          this.props.checkLogin();
        }
      });
    }, 500);
  }
  render() {
    let height = Dimensions.get('screen').height;
    let width = Dimensions.get('screen').width;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />
        <ImageBackground
          source={IMAGE.BACKGROUND_IMAGE}
          style={{height: '100%', width: '100%'}}>
          <FastImage
            style={{width: '100%', height: '50%', position: 'absolute'}}
            resizeMode={FastImage.resizeMode.cover}
            source={IMAGE.BACKGROUND_DOT_IMAGE}
          />
          <View style={styles.imgBackground}>
            <View style={styles.logoContainer}>
              <FastImage
                style={{width: width - 80, height: 100}}
                resizeMode={FastImage.resizeMode.contain}
                source={IMAGE.LOGO}
              />
              <Text style={styles.logoText}>ITA CONNECT</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {loading, isSuccess, configData, checkVersion} = state.auth;
  return {
    loading,
    configData,
    checkVersion,
    isSuccess,
  };
};

export default connect(mapStateToProps, {
  getCommonConfig,
  checkAppVersion,
  checkLogin,
})(Splash);
