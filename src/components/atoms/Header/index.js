import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import styles from './style';
import * as utility from '../../../Utility/util'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';

// This will help you to render custom navigation bar.
// Its defualt component for my structure.We can modify as per requirement
class Header extends Component {
    trackMethod(str) {
        let value = `Header: ${str}`
        utility.recordEvent(value)
    }
    render() {
        const { redirectLeft, redirectRight, filterButton, backgroundColor } = this.props;
        let bgColor = utility.changeHeaderColor('#F3F3F3')
        let width = Dimensions.get('screen').width
        return (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: backgroundColor ? backgroundColor : "#F3F3F3"
                        // backgroundColor: bgColor
                    }]}>
                <StatusBar
                    backgroundColor={backgroundColor ? backgroundColor : "#F3F3F3"}
                    barStyle={this.props.userData.night_mode ? 'light-content' : 'dark-content'}
                />
                <TouchableOpacity
                    onPress={redirectLeft}
                    style={styles.ButtonTouch}>
                    <Image style={styles.iconStyle} resizeMode={'contain'} source={this.props.leftImage}>
                    </Image>
                </TouchableOpacity>
                <View style={{ justifyContent: "center", alignItems: 'center', width: width - 100 }}>
                    <Text numberOfLines={1} style={[styles.text, { color: utility.changeFontColor('#233746') }]}>{this.props.title}</Text>
                </View>
                <TouchableOpacity onPress={redirectRight} style={styles.ButtonTouch}>
                    <FastImage style={styles.iconStyle} resizeMode={'contain'} source={this.props.rightImage} >
                    </FastImage>
                </TouchableOpacity>
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

export default connect(mapStateToProps, null)(Header)