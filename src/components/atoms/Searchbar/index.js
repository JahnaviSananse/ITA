import * as React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import styles from './style'
import * as ICON from '../../../resources/index'
import FastImage from 'react-native-fast-image'


export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  render() {
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <View style={styles.headerContainer}>
          <View style={styles.searchbarContainer}>
            <View style={styles.iconContainer}>
              <FastImage source={ICON.SEARCH} style={styles.icon} />
            </View>
            <TextInput
              placeholder={this.props.placeholder}
              style={styles.textFieldContainer}
              onChangeText={(search) => this.setState({ search })}
              value={this.state.search}
              returnKeyType='search'
              autoFocus={true}
            />
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.cancelButtonContainer}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View >
    );
  }
}
