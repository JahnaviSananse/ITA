import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import styles from './style';
import * as utility from '../../../Utility/util'
import { connect } from 'react-redux';
// This will help you to render custom navigation bar. 
// Its defualt component for my structure. We can modify as per requirement
class Header extends Component {
    componentDidMount() {
        utility.recordScreen("Header View")
    }
    render() {
        const { redirectRight, backgroundColor } = this.props
        let bgColor = utility.changeHeaderColor('#F3F3F3')
        return (
            <View
                style={
                    [
                        styles.container,
                        {
                            backgroundColor: backgroundColor ? backgroundColor : "#F3F3F3"
                        }
                    ]}>
                <StatusBar
                    backgroundColor={backgroundColor ? backgroundColor : "#F3F3F3"}
                    barStyle={this.props.userData.night_mode ? 'light-content' : 'dark-content'}
                />
                <Text style={[styles.headerTitle, { color: utility.changeFontColor('#555555') }]}>{this.props.title}</Text>
                <TouchableOpacity style={styles.ButtonTouch} onPress={redirectRight}>
                    <Image style={styles.iconStyles} source={this.props.img} />
                </TouchableOpacity>
            </View>
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