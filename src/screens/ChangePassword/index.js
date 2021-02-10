import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import Header from '../../components/atoms/Header/index';
import * as CONSTANT from '../../constants/constant';
import * as VALIDATE from '../../constants/validation';
import language from '../../Localization';
import {changePassword} from '../../store/User/actions';
import * as utility from '../../Utility/util';
import styles from './style';

//
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      user_id: null,
      night_mode: false,
      current_language: 'en',
    };
    this.fncDoChangePassword = this.fncDoChangePassword.bind(this);
    this.fncIsValidate = this.fncIsValidate.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('user_id').then((response) => {
      this.setState({user_id: response});
    });
  }
  clearState() {
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }
  fncIsValidate() {
    utility.recordEvent(
      'Change Password: change password change button pressed',
    );
    // this.setState({ isDisable: true })
    let isValidate = false;
    let messageText = '';
    if (VALIDATE.isBlank(this.state.currentPassword)) {
      messageText = language.ER_CURRENT_PASSWORD;
    } else if (VALIDATE.isBlank(this.state.newPassword)) {
      messageText = language.ER_NEW_PASSWORD;
    } else if (VALIDATE.isBlank(this.state.confirmPassword)) {
      messageText = language.ER_CONFIRM_PASSWORD;
    } else if (this.state.newPassword != this.state.confirmPassword) {
      messageText = language.ER_PASSWORD_MISMATCH;
    } else {
      isValidate = true;
    }

    if (isValidate === false) {
      utility.recordEvent('Login: Login Fail');
      // this.setState({ isDisable: false })
      Alert.alert(
        language.ChangePassword,
        messageText,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      // alert(messageText)
    }

    return isValidate;
  }

  fncDoChangePassword() {
    Keyboard.dismiss();
    // Check if all the validation will true then process with login api.
    if (this.fncIsValidate()) {
      // alert(JSON.stringify(this.props.userId))
      let changePass = {};
      changePass.user_id = this.state.user_id;
      changePass.old_password = this.state.currentPassword;
      changePass.new_password = this.state.newPassword;
      changePass.confirm_password = this.state.confirmPassword;
      this.props.changePassword(changePass);
    }
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
  componentWillMount() {
    utility.recordScreen('Change Password');
  }
  _renderTextFields() {
    return (
      <View
        style={{
          backgroundColor: utility.changeBackgroundColor('#FFFFFF'),
          paddingHorizontal: 35,
          marginTop: 10,
        }}>
        <ATOMS.TextField
          // style={{ marginTop: 30 }}
          label={language.Current}
          value={this.state.currentPassword}
          onChangeText={(currentPassword) => this.setState({currentPassword})}
          tintColor={utility.changeFontColor('#696969')}
          textColor={utility.changeFontColor('#233746')}
          labelPadding={12}
          inputContainerPadding={12}
          secureTextEntry={true}
        />
        <ATOMS.TextField
          // style={{ marginTop: 10 }}
          label={language.New}
          value={this.state.newPassword}
          onChangeText={(newPassword) => this.setState({newPassword})}
          tintColor={utility.changeFontColor('#696969')}
          textColor={utility.changeFontColor('#233746')}
          labelPadding={12}
          inputContainerPadding={12}
          secureTextEntry={true}
        />
        <ATOMS.TextField
          // style={{ marginTop: 10 }}
          label={language.Confirm}
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
          tintColor={utility.changeFontColor('#696969')}
          textColor={utility.changeFontColor('#233746')}
          labelPadding={12}
          inputContainerPadding={12}
          secureTextEntry={true}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor('#F3F3F3'),
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: utility.changeBackgroundColor('#FFFFFF'),
          }}>
          <Header
            title={language.Password}
            leftImage={utility.changeCloseButton()}
            backgroundColor={utility.changeHeaderColor('#F3F3F3')}
            redirectLeft={() => this.props.navigation.goBack()}
          />
          {this._renderTextFields()}
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {backgroundColor: utility.changeButtonColor('#233746')},
            ]}
            onPress={() => this.fncDoChangePassword()}>
            <Text
              style={{
                color: utility.changeFontColor('#FFFFFF'),
                fontSize: CONSTANT.ITEMS_FONT,
              }}>
              {language.Save}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.descriptionText,
              {color: utility.changeFontColor('#696969')},
            ]}>
            {language.PasswordRules}
          </Text>
        </View>
        <ATOMS.Loader isLoading={this.props.loading} />
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {loading, isSuccess, userId, userData, current_language} = state.user;
  return {
    current_language,
    loading,
    userData,
    isSuccess,
    userId,
  };
};

export default connect(mapStateToProps, {changePassword})(ChangePassword);
