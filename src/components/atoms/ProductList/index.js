import React, { Component } from "react";
import { FlatList, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import styles from './style'
import language from "../../../Localization";
import * as utility from '../../../Utility/util'
import { connect } from 'react-redux';

//products
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false
    };
  }
  trackMethod(str) {
    let value = `ProductList: ${str}`
    utility.recordEvent(value)
  }
  render() {
    const TYPE = {
      PRESENTATION: "presentation",
      SOCIAL: "socialpost",
      FLYER: "flyers",
      PRODUCT: "Product"
    }
    // let navigate = this.props.navigation


    let type = this.props.data.type
    let showDesc = false
    let screenWidth = Dimensions.get('window').width
    let width = (screenWidth * 25) / 100
    let height = (screenWidth * 37) / 100
    if (type == TYPE.PRESENTATION) {
      width = (screenWidth * 85) / 100
      height = (screenWidth * 55) / 100
      paddingRight = 10
    }
    else if (type == TYPE.SOCIAL) {
      width = (screenWidth * 25) / 100
      height = (screenWidth * 28) / 100
      showDesc = true
    }
    else if (type === TYPE.SOCIAL || type === TYPE.FLYER) {
      showDesc = true
    }
    return (
      <View style=
        {[
          styles.container,
          { backgroundColor: utility.changeBackgroundColor("#F2F2F2") }
        ]}>
        <View>
          <View style={{ marginTop: 20, width: screenWidth }}>
            <Text
              style={[
                styles.titleText,
                { color: utility.changeFontColor("#000000"), }
              ]}
            >{this.props.data.title}</Text>
            {type != TYPE.PRESENTATION &&
              <TouchableOpacity style={styles.viewAllContainer}
                onPress={this.props.viewAll}>
                <Text style={styles.viewAllText} onPress={this.trackMethod("View all pressed")}>{language.ViewAll}</Text>
                <Image source={require("../../../resources/nextBlue.png")} style={styles.viewAllButton} />
              </TouchableOpacity>
            }
          </View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={this.props.data.data}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => {
                  this.props.postClick(rowData.post_id)
                  type == TYPE.SOCIAL ? this.props.navigation.navigate("ImageScreen", { 'image': rowData.image, 'data': rowData }) : this.props.navigation.navigate("WebViewScreen", { "data": rowData })
                }} style={[styles.itemContainer, { marginRight: 10 }]}>
                  <Image
                    style={{ width: width + 10, height: height, backgroundColor: "#FFFF" }}
                    resizeMode={"cover"}
                    source={{ uri: rowData.image }}
                  />
                  <Text numberOfLines={2}
                    style=
                    {[
                      styles.productTitle,
                      { width: width, color: utility.changeFontColor("#000000") }
                    ]}
                  >{rowData.title}</Text>
                  {showDesc === true ? <Text numberOfLines={1}
                    style=
                    {[
                      styles.productDesc,
                      { width: width, color: utility.changeFontColor("#757575"), }
                    ]}
                  >{rowData.subTitle}</Text> : <Text></Text>}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View >
    );
  }
}
const mapStateToProps = state => {
  const { userData } = state.user
  return {
    userData,
  }
};

export default connect(mapStateToProps, null)(index)