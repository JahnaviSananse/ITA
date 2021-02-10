import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, ImageBackground, Text, Platform, Image, StatusBar, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { confirmationCode, resendCode } from '../../store/Auth/actions';
import * as IMAGE from '../../resources/index'
import styles from './style';
import * as ATOMS from '../../components/atoms';
import CodeInput from 'react-native-confirmation-code-input';
import language from '../../Localization'
import * as utility from '../../Utility/util';
import FastImage from 'react-native-fast-image'


class EnterCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isKeyboardShow: false
    };
    this.fncConfirmationCode = this.fncConfirmationCode.bind(this)
    this.fncIsValidate = this.fncIsValidate.bind(this)
    this.clearState = this.clearState.bind(this)
  };

  componentWillMount() {
    utility.recordScreen("Enter ConfirmationCode Screen")
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.code !== this.props.code) {
      if (this.props.loading === false && this.props.isSuccess) {

        setTimeout(() => {
          this.clearState()
          this.props.navigation.navigate("ResetPassword")
        }, 500);

      }
    }
  }

  clearState() {
    this.setState({
      code: '',
    })
  }
  fncIsValidate() {
    let isValidate = false
    let messageText = ''
    if (this.state.code.trim() == '') {
      messageText = language.ER_CONFIRMATION_CODE
    }
    else {
      isValidate = true
    }

    if (isValidate === false) {
      alert(messageText)
    }

    return isValidate
  }

  fncConfirmationCode() {
    if (this.fncIsValidate()) {
      let loginRequest = {}
      loginRequest.confirmation_code = this.state.code
      loginRequest.user_id = this.props.userId
      this.props.confirmationCode(loginRequest)
      utility.recordEvent("Enter code: confirmation code API call")
    }
  }
  // validate() {
  //   utility.recordEvent("Enter Confirmation Code : Submit button pressed", '')
  //   if (this.state.code == this.state.compareWithCode) {
  //     this.props.navigation.navigate("ResetPassword")
  //   } else {
  //     Alert.alert(
  //       'Confirmation Code',
  //       'Code not match',
  //       [{ text: 'Ok' }],
  //       { cancelable: false }
  //     );
  //   }
  // }
  resendCode() {
    let loginRequest = {}
    loginRequest.user_id = this.props.userId
    this.props.resendCode(loginRequest)
    utility.recordEvent("Enter code: confirmation code API call")
  }
  render() {
    let height = Dimensions.get("screen").height
    let width = Dimensions.get("screen").width

    let email = this.props.navigation.getParam('email')
    let textFieldWidth = (width / 2)
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#F3F3F3"
          barStyle="dark-content"
        />
        <ImageBackground style={styles.imageBackground} source={IMAGE.BACKGROUND_IMAGE}>
          <FastImage
            style={{ width: '100%', height: Platform.OS === 'android' ? 300 : '50%', position: 'absolute' }}
            resizeMode={FastImage.resizeMode.cover}
            source={IMAGE.BACKGROUND_DOT_IMAGE}></FastImage>
          <KeyboardAwareScrollView
            contentContainerStyle={{ height: height }}
            extraHeight={100}
            extraScrollHeight={100}
            keyboardShouldPersistTaps='handled'
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
          >
            <View style={styles.logoContainer}>
              <Image
                style={{ width: (width - 80), height: 100 }}
                resizeMode={'contain'}
                source={IMAGE.LOGO}
              />
            </View>

            <View style={styles.mainFormContainer}>
              <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{language.EnterConfirmationCode}</Text>
                  <Text style={styles.titleDesc}>{language.Enter6DigitCode} {email}.</Text>
                </View>

                <View style={styles.codeInputContainer}>
                  <CodeInput
                    ref="codeInputRef2"
                    activeColor='black'
                    cellBorderWidth={0}
                    inactiveColor='white'
                    autoFocus={false}
                    ignoreCase={true}
                    keyboardType={"number-pad"}
                    inputPosition='full-width'
                    size={40}
                    secureTextEntry={true}
                    codeLength={6}
                    space={10}
                    onFulfill={(code) => this.setState({ code: code })}
                    // onFulfill={(isValid, code) => console.log(isValid)}
                    containerStyle={{ marginTop: 0 }}
                    codeInputStyle={styles.codeInputStyle}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <ATOMS.Button
                    style={{ alignSelf: "center" }}
                    title={'Submit'}
                    // onPress={(isValid, code) => this.validCode(isValid, code)()}
                    onPress={() => this.fncConfirmationCode()}
                  />
                  <TouchableOpacity onPress={() => this.resendCode()}>
                    {utility.recordEvent("Enter code: Request new one button pressed")}
                    <Text style={styles.requestNewText}>{language.RequestNewOne}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* {!this.state.isKeyboardShow && */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Login')
                }
                style={styles.returnToSignInButton}>
                <Text style={styles.returnToSignInText}>{language.ReturnToLogin}</Text>
              </TouchableOpacity>
            </View>
            {/* } */}
          </KeyboardAwareScrollView>
        </ImageBackground>
        <ATOMS.OfflineBar />
      </View >

    )
  }
}
const mapStateToProps = state => {
  console.log(state)
  const { loading, code, isSuccess, userId } = state.auth
  return {
    loading,
    code,
    isSuccess,
    userId
  }
};

export default connect(mapStateToProps, { confirmationCode, resendCode })(EnterCode)

