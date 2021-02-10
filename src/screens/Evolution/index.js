
import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import Grid from '../../components/atoms/FlatGrid';
import styles from './style'
import Header from '../../components/atoms/Header/index'
import * as images from '../../resources/index'
import language from '../../Localization'



export default class Evolution extends Component {
    render() {
        return (

            <View style={styles.container}>
                <Header
                    title={language.Evolution}
                    leftImage={images.CLOSE}
                    redirectLeft={() => this.props.navigation.goBack()}
                />
                <Grid type={4} />
            </View>
        );
    }
}


