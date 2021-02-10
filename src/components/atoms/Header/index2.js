import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image'


// This will help you to render custom navigation bar. 
// Its defualt component for my structure. We can modify as per requirement
export default class Header extends Component {
    render() {
        const { navigation, redirect, placeholder, url, search, isModal, onLeftImagePress } = this.props;
        return (
            <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
                <TouchableOpacity onPress={() => isModal == true ? onLeftImagePress : navigation.goback()}>
                    <FastImage style={[styles.iconStyle, { marginLeft: 5 }]} source={this.props.leftImage}>
                    </FastImage>
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => this.props.onRightImagePress}>
                    <FastImage style={[styles.iconStyle, { marginRight: 5 }]} source={this.props.rightImage}>
                    </FastImage>
                </TouchableOpacity>
            </View >
        );
    }
}