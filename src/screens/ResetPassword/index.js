import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import {resetPassword} from '../../store/Auth/actions';
import * as utility from '../../Utility/util';
import styles from './style';
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.fncResetPassword = this.fncResetPassword.bind(this);
    this.fncIsValidate = this.fncIsValidate.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  fncIsValidate() {
    utility.recordEvent('Reset Password : Reset button pressed');
    let isValidate = false;
    let messageText = '';
    if (this.state.password.trim() == '') {
      messageText = language.ER_ENTER_PASS;
      alert(messageText);
    } else if (this.state.confirmPassword.trim() == '') {
      messageText = language.ER_ENTER_CONFIRM;
      alert(messageText);
    } else if (
      this.state.password.trim() !== this.state.confirmPassword.trim()
    ) {
      messageText = language.ER_PASS_NOT_MATCH;
      alert(messageText);
    } else {
      utility.recordEvent('Reset Password : Password successfully reset');
      isValidate = true;
    }

    if (isValidate === false) {
      alert(messageText);
      utility.recordEvent('Reset Password : Password reset fail');
    }

    return isValidate;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newPassword !== this.props.newPassword) {
      if (this.props.loading === false && this.props.isSuccess) {
        setTimeout(() => {
          this.clearState();
          this.props.navigation.navigate('Login');
        }, 500);
      }
    }
  }

  clearState() {
    this.setState({
      password: '',
      confirmPassword: '',
    });
  }
  fncResetPassword() {
    if (this.fncIsValidate()) {
      let loginRequest = {};
      loginRequest.new_password = this.state.password;
      loginRequest.confirm_password = this.state.confirmPassword;
      loginRequest.user_id = this.props.userId;
      this.props.resetPassword(loginRequest);
    }
  }
  componentWillMount() {
    utility.recordScreen('Reset Password Screen');
  }
  render() {
    let height = Dimensions.get('screen').height;
    let width = Dimensions.get('screen').width;
    let textFieldWidth = width / 2;
    return (
      <View style={{flex: 1}}>
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
            source={IMAGE.BACKGROUND_DOT_IMAGE}></FastImage>
          {/* <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'> */}
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

            <View style={styles.formMainContainer}>
              <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{language.ResetPassword}</Text>
                </View>
                <ATOMS.TextField
                  labelHeight={25}
                  label={language.PH_NEW_PASSWORD}
                  value={this.state.password}
                  keyboardType={'default'}
                  onChangeText={(password) => {
                    this.setState({password});
                  }}
                  tintColor={'#696969'}
                  textColor={'#233746'}
                  lineWidth={2}
                  secureTextEntry={true}
                  labelPadding={12}
                  inputContainerPadding={12}
                />
                <ATOMS.TextField
                  labelHeight={25}
                  label={language.PH_CONFIRM_PASSWORD}
                  value={this.state.confirmPassword}
                  keyboardType={'default'}
                  onChangeText={(confirmPassword) => {
                    this.setState({confirmPassword});
                  }}
                  tintColor={'#696969'}
                  textColor={'#233746'}
                  lineWidth={2}
                  secureTextEntry={true}
                  labelPadding={12}
                  inputContainerPadding={12}
                />

                <ATOMS.Button
                  style={{alignSelf: 'center'}}
                  title={'Reset Password'}
                  onPress={() => this.fncResetPassword()}
                />
              </View>
            </View>

            <View style={styles.backToLoginContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                style={styles.returnToSignInButton}>
                <Text style={styles.returnToSignInText}>
                  {language.ReturnToLogin}
                </Text>
              </TouchableOpacity>
              <ATOMS.Loader isLoading={this.props.loading} />
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
        <ATOMS.OfflineBar />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {loading, newPassword, isSuccess, userId} = state.auth;

  return {
    loading,
    newPassword,
    isSuccess,
    userId,
  };
};

export default connect(mapStateToProps, {resetPassword})(ResetPassword);
