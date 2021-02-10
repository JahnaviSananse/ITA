import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import * as fonts from '../../constants/fonts/index';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import {forgetPassword} from '../../store/Auth/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      introducerCode: '',
      isKeyboardShow: false,
    };
    this.fncForgetPassword = this.fncForgetPassword.bind(this);
    this.fncIsValidate = this.fncIsValidate.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  trackMethod(str) {
    let value = `ForgotPassword: ${str}`;
    utility.recordEvent(value);
  }
  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({isKeyboardShow: true});
    });
    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({isKeyboardShow: false});
    });
    utility.recordScreen('Forgot Password Screen');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.introducerCode !== this.props.introducerCode) {
      if (this.props.loading === false && this.props.isSuccess) {
        setTimeout(() => {
          this.clearState();
          this.props.navigation.navigate('EnterCode', {
            email: this.props.email_address,
          });
        }, 500);
      }
    }
  }

  fncIsValidate() {
    this.trackMethod('Next button Pressed');
    let isValidate = false;
    let messageText = '';
    if (this.state.introducerCode.trim() == '') {
      messageText = language.ER_INTRODUCER_CODE;
      alert(messageText);
    } else {
      this.trackMethod('Introducer code successfull');
      isValidate = true;
    }

    if (isValidate === false) {
      this.trackMethod('Introducer code unsuccessfull');
      alert(messageText);
    }

    return isValidate;
  }

  clearState() {
    this.setState({
      introducerCode: '',
    });
  }

  fncForgetPassword() {
    this.trackMethod('fncForgetPassword');
    if (this.fncIsValidate()) {
      let loginRequest = {};
      loginRequest.introducer_code = this.state.introducerCode;
      this.trackMethod('forgetPassword');
      this.props.forgetPassword(loginRequest);
    }
  }

  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    this.setState({introducerCode: newText});
  }
  returnToLogin() {
    this.trackMethod('Return to SignIn pressed');
    this.props.navigation.navigate('Login');
  }
  render() {
    let height = Dimensions.get('screen').height;
    let width = Dimensions.get('screen').width;
    let textFieldWidth = width / 2;
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />
        <ImageBackground
          style={styles.imageBackground}
          source={IMAGE.BACKGROUND_IMAGE}>
          <FastImage
            style={{
              width: '100%',
              height: Platform.OS === 'android' ? 300 : '50%',
              position: 'absolute',
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={IMAGE.BACKGROUND_DOT_IMAGE}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={{height: height}}
            extraHeight={100}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{width: width - 80, height: 100}}
                resizeMode={'contain'}
                source={IMAGE.LOGO}
              />
            </View>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{language.TroubleLogin}</Text>
                  <Text style={styles.titleDesc}>
                    {language.HelpUsToIdentify}
                  </Text>
                </View>
                <ATOMS.TextField
                  labelHeight={25}
                  label={language.PH_INTRODUCER_CODE}
                  labelTextStyle={styles.placeHolderContainer}
                  titleTextStyle={styles.textContainer}
                  value={this.state.introducerCode}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => this.onChanged(text)}
                  tintColor={'#696969'}
                  textColor={'#233746'}
                  lineWidth={2}
                  maxLength={8}
                  inputContainerPadding={10}
                />

                <ATOMS.Button
                  style={{
                    alignSelf: 'center',
                    fontFamily: fonts.FONT_SFPRO_REGULAR,
                  }}
                  title={'Next'}
                  onPress={() => this.fncForgetPassword()}
                  // onPress={() => this.props.navigation.push("EnterCode")}
                />
              </View>
            </View>
            {/* {!this.state.isKeyboardShow && */}
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => this.returnToLogin()}
                style={styles.returnToSignInButton}>
                <Text style={styles.returnToSignInText}>
                  {language.ReturnToLogin}
                </Text>
              </TouchableOpacity>
            </View>
            {/* } */}
          </KeyboardAwareScrollView>
          <ATOMS.Loader isLoading={this.props.loading} />
        </ImageBackground>
        <ATOMS.OfflineBar />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {loading, introducerCode, isSuccess, email_address} = state.auth;
  return {
    loading,
    introducerCode,
    isSuccess,
    email_address,
  };
};

export default connect(mapStateToProps, {forgetPassword})(ForgotPassword);
