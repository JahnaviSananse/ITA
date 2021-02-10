import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import * as images from '../../../resources/index'
import * as fonts from '../../../constants/fonts/index'
import * as utility from '../../../Utility/util'
import FastImage from 'react-native-fast-image'

import styles from './style';


export default class SelectView extends Component {
    render() {
        let width = Dimensions.get("screen").width
        const { itemWidth, itemHeight, bgColor, txtColor, paddingTop } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onPress()
                }}
                style={[styles.container,
                {
                    width: itemWidth,
                    height: itemHeight,
                    backgroundColor: bgColor, // utility.changeBackgroundColor(bgColor)
                    //aspectRatio: 1
                }]}>
                {
                    this.props.image && <FastImage source={this.props.image} style={{ width: '30%', height: '30%' }} />
                }
                <Text style={[styles.text, { color: txtColor, fontSize: 14, }]}>{this.props.text}</Text>
                {this.props.middletext && <Text style={[styles.text, { color: txtColor, fontSize: 20, width: (width * 0.3) }]}>{this.props.middletext}</Text>}
                {this.props.bottomText && <Text style={[styles.text, { paddingTop: paddingTop, color: txtColor, fontSize: 16, }]}>{this.props.bottomText}</Text>}
                {this.props.amtText && <Text style={[styles.text, { color: txtColor, fontSize: 20, width: (width * 0.3) }]}>{this.props.amtText}</Text>}
            </TouchableOpacity>
        );
    }
}
