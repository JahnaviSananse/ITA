import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styles from './style'
import * as utility from '../../../Utility/util'
import FastImage from 'react-native-fast-image'
import language from '../../../Localization'

export default class PlaceholderView extends Component {
    componentDidMount() {
        utility.recordScreen("Placeholder Screen")
    }
    render() {
        const width = Dimensions.get("screen").width
        const { title, description, image } = this.props
        let bgColor = utility.changeBackgroundColor("#FFFFFF");
        if (this.props.bgColor) {
            bgColor = this.props.bgColor
        }

        let textColor = utility.changeFontColor("#000000")
        return (
            <View style={
                [
                    styles.container,
                    {
                        backgroundColor: bgColor
                    }
                ]
            }>
                <View style={{ width: (width * 0.7), marginTop: 150 }}>
                    {
                        title ?
                            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
                            :
                            <Text style={[styles.title, { color: textColor }]}>{language.NO_DATA_FOUND}</Text>
                    }
                    {
                        image && <FastImage style={styles.placeholderImage} source={image} />
                    }
                    {
                        description && <Text style={[styles.description, { color: utility.changeFontColor("#000000") }]}>{description}</Text>
                    }
                </View>
            </View>
        );
    }
}
