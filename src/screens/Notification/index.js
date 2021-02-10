import React, { Component } from 'react';
import { View, Switch, TouchableOpacity, SafeAreaView, Text, AsyncStorage } from 'react-native';
import styles from './style';
import * as CONSTANT from "../../constants/constant"
import * as fonts from "../../constants/fonts/index"
import Header from '../../components/atoms/Header/index'
import * as ATOMS from '../../components/atoms';
import language from '../../Localization';
import * as scale from '../../Utility/util'
import * as utility from '../../Utility/util';
import { connect } from 'react-redux';
import { updateNotification } from '../../store/User/actions';
import FastImage from 'react-native-fast-image'

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsNotificationValue: false,
      libraryNotificationValue: false,
      user_id: null
    };
    setTimeout(() => {
      this.setNotificationData()
    }, 50);
  };
  setNotificationData() {
    this.setState({
      newsNotificationValue: this.props.userData.news_update_notification === 1 ? true : false,
      libraryNotificationValue: this.props.userData.library_update_notification === 1 ? true : false
    })
  }
  componentWillMount() {
    utility.recordScreen("Notification Screen")
    AsyncStorage.getItem('user_id').then((response) => {
      this.setState({ user_id: response })
    })
  }
  newsNotificationtoggleSwitch = (value) => {
    utility.recordEvent("Notification : newsNotificationtoggleSwitch")
    this.setState({ newsNotificationValue: value })
    let updateNotiData = {}
    updateNotiData.user_id = this.state.user_id
    updateNotiData.news_status = value ? 1 : 0
    updateNotiData.library_status = this.state.libraryNotificationValue ? 1 : 0
    this.props.updateNotification(updateNotiData)
  }

  LibraryNotificationtoggleSwitch = (value) => {
    utility.recordEvent("Notification : LibraryNotificationtoggleSwitch")
    this.setState({ libraryNotificationValue: value })
    let updateNotiData = {}
    updateNotiData.user_id = this.state.user_id
    updateNotiData.news_status = this.state.newsNotificationValue ? 1 : 0
    updateNotiData.library_status = value ? 1 : 0
    this.props.updateNotification(updateNotiData)
  }
  render() {
    let current_noti_lan = '';
    if (this.props.configData.languages !== undefined) {
      let arylan = this.props.configData.languages
      arylan.map((value, index) => {
        if (value.language_code === this.props.userData.notification_language) {
          current_noti_lan = value.language
        }
      })
    } else {
      current_noti_lan = 'en';
    }


    // if (arylan !== null) {


    // }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
        <Header
          title={language.Notification}
          leftImage={utility.changeCloseButton()}
          backgroundColor={utility.changeHeaderColor('#F3F3F3')}
          redirectLeft={() => this.props.navigation.goBack()}
        />
        <View style={{ height: '100%', backgroundColor: utility.changeHeaderColor('#FFFFFF') }}>
          <Text style={{ fontSize: scale.normalize(17), color: utility.changeFontColor("#000000"), fontWeight: "bold", padding: 15, marginLeft: 5, fontFamily: fonts.FONT_SFPRO_SEMI_BOLD }}>{language.PushNotification}</Text>

          <View style={{ flexDirection: "row" }}>
            <Switch onTintColor="#87B1B4" style={styles.switchStyle} onValueChange={this.newsNotificationtoggleSwitch} value={this.state.newsNotificationValue} />
            <Text style={{ color: utility.changeFontColor("#696969"), fontSize: scale.normalize(17), padding: 15, marginLeft: 5, fontFamily: fonts.FONT_SFPRO_REGULAR }}>{language.NewsUpdate}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Switch onTintColor="#87B1B4" style={styles.switchStyle} onValueChange={this.LibraryNotificationtoggleSwitch} value={this.state.libraryNotificationValue} />
            <Text style={{ color: utility.changeFontColor("#696969"), fontSize: scale.normalize(17), padding: 15, marginLeft: 5, fontFamily: fonts.FONT_SFPRO_REGULAR }}>{language.LibraryUpdate}</Text>
          </View>

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              this.props.navigation.navigate('LanguageNotification')
            }}
          >
            <Text style={{ color: utility.changeFontColor("#696969"), fontSize: scale.normalize(17), padding: 15, marginLeft: 5, fontFamily: fonts.FONT_SFPRO_REGULAR }}>{language.NotificationLanguage}</Text>
            <View style={{ position: 'absolute', height: '100%', right: 10, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: utility.changeFontColor("#696969"), fontSize: scale.normalize(14), fontFamily: fonts.FONT_SFPRO_REGULAR, marginRight: 5 }}>{current_noti_lan}</Text>
              <FastImage style={{
                width: 15,
                height: 15,
              }} source={utility.changeNextButton()} />
            </View>
          </TouchableOpacity>


          <Text style={{ textAlign: "justify", fontSize: scale.normalize(15), marginTop: 35, marginHorizontal: 20, color: utility.changeFontColor("#696969"), fontFamily: fonts.FONT_SFPRO_REGULAR }}>
            {language.NotificationRules}
          </Text>
          <ATOMS.Loader isLoading={this.props.loading} />
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { configData } = state.auth
  const { loading, userData, userId } = state.user
  return {
    configData,
    loading,
    userData,
    userId
  }
};

export default connect(mapStateToProps, { updateNotification })(Notification)