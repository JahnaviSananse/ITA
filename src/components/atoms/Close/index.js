import React, { Component } from 'react';
import * as utility from '../../../Utility/util'
import { StyleSheet, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image'

export default class Close extends Component {
    trackMethod(str) {
        let value = `Close: ${str}`
        utility.recordEvent(value)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {this.trackMethod('Close button pressed')}
                <FastImage
                    source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }}
                    style={{
                        width: 20,
                        height: 20,
                        marginLeft: 15,
                    }}
                />
            </View>
        );
    }
}