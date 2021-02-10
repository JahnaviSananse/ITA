import React, { Component } from 'react';
import {
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView
} from 'react-native';
import styles from './style'
import TouchID from "react-native-touch-id";
import language from '../../Localization'
import * as utility from '../../Utility/util';

export default class FingerPrint extends Component {
  constructor() {
    super()
    this.state = {
      biometryType: null
    };
  }
  trackMethod(str) {
    let value = `FingerPrint: ${str}`
    utility.recordEvent(value)
  }

  componentDidMount() {
    this.trackMethod('componentDidMount')
    TouchID.isSupported()
      .then(biometryType => {
        this.setState({ biometryType });
      })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.btn}
            onPress={this.clickHandler}
            underlayColor="#0380BE"
            activeOpacity={1}
          >
            <Text style={{
              color: '#fff',
              fontWeight: '600'
            }}>
              {`Authenticate with ${this.state.biometryType}`}
            </Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }

  clickHandler() {
    this.trackMethod('clickHandler')
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        AlertIOS.alert('TouchID not supported');
      });
  }
}

function authenticate() {
  this.trackMethod('authenticate')
  return TouchID.authenticate()
    .then(success => {
      this.trackMethod('Authenticated Successfully')
      AlertIOS.alert('Authenticated Successfully');
    })
    .catch(error => {
      console.log(error)
      this.trackMethod(error)
      AlertIOS.alert(error.message);
    });
}
