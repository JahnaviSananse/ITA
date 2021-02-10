import React, {Component} from 'react';
import {
  Dimensions,
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
// import * as language from '../../constants/message';
import * as COLORS from '../../constants/colors';
import * as VALIDATE from '../../constants/validation';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import {signup} from '../../store/Auth/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class SignupPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      user_id: 0,
    };
    this.fncSignupPassword = this.fncSignupPassword.bind(this);
    this.fncIsValidate = this.fncIsValidate.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.setState({isKeyboardShow: true});
    });
    Keyboard.addListener('keyboardDidHide', () => {
      this.setState({isKeyboardShow: false});
    });
    utility.recordScreen('Signup Password Screen');
  }
  fncIsValidate() {
    utility.recordEvent('Signup Password: Signup Password Validation');
    let isValidate = false;
    let messageText = '';
    if (VALIDATE.isBlank(this.state.password)) {
      messageText = language.ER_ENTER_PASS;
    } else if (VALIDATE.isBlank(this.state.confirmPassword)) {
      messageText = language.ER_ENTER_CONFIRM;
    } else if (
      this.state.password.trim() != this.state.confirmPassword.trim()
    ) {
      messageText = language.ER_PASS_NOT_MATCH;
    } else {
      utility.recordEvent('Signup Password: Signup Successfull');
      isValidate = true;
    }

    if (isValidate === false) {
      alert(messageText);
    }

    return isValidate;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.passwordData !== this.props.passwordData) {
      if (this.props.loading === false && this.props.isSuccess) {
        setTimeout(() => {
          this.clearState();
          this.props.navigation.navigate('Login');
        }, 50);
      }
    }
  }

  clearState() {
    this.setState({
      password: '',
      confirmPassword: '',
    });
  }
  fncSignupPassword() {
    utility.recordEvent('Signup Password:: fncSignupPassword');
    if (this.fncIsValidate()) {
      let loginRequest = {};
      loginRequest.password = this.state.password;
      loginRequest.confirm_password = this.state.confirmPassword;
      loginRequest.user_id = this.props.userId;
      this.props.signup(loginRequest);
    }
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
            <View style={styles.logoContainer}>
              <FastImage
                style={{width: width - 80, height: 100}}
                resizeMode={FastImage.resizeMode.contain}
                source={IMAGE.LOGO}
              />
            </View>

            <View style={styles.mainFormContainer}>
              <View style={styles.formContainer}>
                <ATOMS.TextField
                  labelHeight={30}
                  label={language.PH_PASSWORD}
                  labelTextStyle={styles.placeHolderContainer}
                  titleTextStyle={styles.textContainer}
                  value={this.state.password}
                  keyboardType={'default'}
                  onChangeText={(password) => {
                    this.setState({password});
                  }}
                  tintColor={'#696969'}
                  textColor={'#233746'}
                  lineWidth={2}
                  secureTextEntry={true}
                  labelPadding={10}
                  inputContainerPadding={10}
                />
                <ATOMS.TextField
                  labelHeight={25}
                  label={language.PH_CONFIRM_PASSWORD}
                  labelTextStyle={styles.placeHolderContainer}
                  titleTextStyle={styles.textContainer}
                  value={this.state.confirmPassword}
                  keyboardType={'default'}
                  onChangeText={(confirmPassword) => {
                    this.setState({confirmPassword});
                  }}
                  tintColor={'#696969'}
                  textColor={'#233746'}
                  lineWidth={2}
                  secureTextEntry={true}
                  labelPadding={10}
                  inputContainerPadding={10}
                />

                <Text style={styles.linkButton}>
                  {language.AgreeTerms}
                  <Text> </Text>
                  <Text
                    style={styles.clickableText}
                    onPress={() => {
                      let data = {};
                      data.title = '';
                      data.file_url = this.props.configData.terms_and_conditions;
                      this.props.navigation.navigate('WebViewScreen', {data});
                    }}>
                    {language.TermsAndConditions}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => this.fncSignupPassword()}
                  style={styles.signupButton}>
                  <Text style={styles.signupText}>{language.Signup}</Text>
                </TouchableOpacity>
                {/* </View> */}
              </View>
            </View>
            {/* {!this.state.isKeyboardShow && */}
            <View style={styles.backToLoginContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                style={styles.backToLoginBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: COLORS.BLUE,
                    fontSize: 13,
                  }}>
                  {language.ReturnToLogin}
                </Text>
              </TouchableOpacity>
              <ATOMS.Loader isLoading={this.props.loading} />
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
  const {loading, passwordData, isSuccess, userId, configData} = state.auth;

  return {
    configData,
    loading,
    passwordData,
    isSuccess,
    userId,
  };
};

export default connect(mapStateToProps, {signup})(SignupPassword);
