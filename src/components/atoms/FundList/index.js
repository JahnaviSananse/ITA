import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import styles from './style'
import * as utility from '../../../Utility/util'
import FastImage from 'react-native-fast-image'


export default class FundList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  trackMethod(str) {
    let value = `FuntList: ${str}`
    utility.recordEvent(value)
  }
  render() {
    const { data } = this.props
    return (

      < FlatList style={{ marginBottom: 0 }
      }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, backgroundColor: utility.changeBackgroundColor("transparent") }}
        data={data}
        renderItem={({ item: data }) => {
          return (
            <TouchableOpacity
              activeOpacity={data.pdf !== '' ? 0.8 : 1.0}
              onPress={() => {
                if (data.pdf !== '') {
                  this.trackMethod('redirect to webviewscreen')
                  let finalData = JSON.parse(JSON.stringify(data))
                  finalData.file_url = finalData.pdf
                  this.props.navigation.navigate("WebViewScreen", { "data": finalData, "isFund": true })
                }
              }} style={styles.container}>

              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{data.isin}</Text>
                <Text style={styles.currencyText}>{data.currency}</Text>
              </View>

              <View style={styles.imageContainer}>
                <FastImage
                  style={styles.imageStyle}
                  source={{ uri: data.image }}
                />
                <Text style={styles.descText} numberOfLines={1}>{data.title}</Text>
              </View>

              <View style={styles.categoryContainer}>
                <Text style={styles.countryText}>{data.investmentuniverse}</Text>
                <View style={styles.verticalLineContainer} />
                <Text style={styles.categoryText}>{data.assetclass}</Text>
              </View>

              {
                data.pdf !== '' &&
                <FastImage
                  style={styles.cornerImage}
                  source={require('../../../resources/corner.png')}
                />
              }
            </TouchableOpacity >
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}