import React, { Component } from "react";
import { Platform, TouchableOpacity, Text, View, Image, SectionList, FlatList, SafeAreaView } from "react-native";
import * as COLOR from '../../constants/colors'
import styles from './style'
import Icon from '../../../node_modules/react-native-vector-icons/MaterialIcons'
import Header from '../../components/atoms/Header/index'
import * as images from '../../resources/index'
import * as TITLE from '../../constants/titles'
import language from "../../Localization";
import * as utility from '../../Utility/util';
import { connect } from 'react-redux';
import { changeLanguage, changeLanguageGuestAccess } from '../../store/User/actions';
import { getCommonConfig } from '../../store/Auth/actions';
import FastImage from 'react-native-fast-image'
import * as ATOMS from '../../components/atoms';

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'English',
        };
    };
    componentWillMount() {
        utility.recordScreen("Language Screen")
    }

    // componentWillUpdate(preProps, newProps) {
    //     if (preProps != newProps) {
    //         if (this.props.isSuccess && this.props.loading == false) {
    //             this.props.getCommonConfig()
    //         }
    //     }
    // }
    onLanguageClick(item) {
        let request = {}
        request.language_code = item.language_code
        if (this.props.userId) {
            this.props.changeLanguage(request)
            setTimeout(() => {
                this.props.getCommonConfig()
            }, 3000)
        }
        this.props.changeLanguageGuestAccess(request)

        utility.recordEvent("Language : Select App Language", 'Selected Language :' + this.state.selectedLanguage)
        { this.setState({ selectedLanguage: item }) }
    }
    render() {
        let arylan = this.props.configData.languages
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
                <View style=
                    {[
                        styles.container,
                        { backgroundColor: utility.changeBackgroundColor("#FFFFFF") }
                    ]}
                >
                    <Header
                        title={language.Language}
                        leftImage={utility.changeBackButton()}
                        backgroundColor={utility.changeHeaderColor('#F3F3F3')}
                        redirectLeft={() => {
                            this.props.navigation.goBack()
                        }}
                    />

                    <Text style=
                        {[
                            styles.SectionHeader,
                            {
                                backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
                                color: utility.changeFontColor('#000000'),
                            }
                        ]}
                    > {language.LanguageOptions} </Text>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={arylan}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => this.onLanguageClick(item)} style={{ flexDirection: 'row' }}>
                                    <Text style=
                                        {[
                                            styles.SectionListItemS,
                                            {
                                                color: utility.changeFontColor("#696969"),
                                                backgroundColor: utility.changeBackgroundColor('#FFFFFF')
                                            }
                                        ]}
                                    > {item.language} </Text>
                                    <FastImage source={this.props.current_language == item.language_code ? require("../../resources/checkMark.png") : null} style={[styles.iconStyle, { height: 15, width: 15 }]} />
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => index}
                    />
                </View>
                <ATOMS.OfflineBar />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { configData, checkVersion } = state.auth
    const { current_language, loading, isSuccess, userId } = state.user
    return {
        userId,
        loading,
        configData,
        checkVersion,
        isSuccess,
        current_language
    }
};

export default connect(mapStateToProps, { changeLanguage, getCommonConfig, changeLanguageGuestAccess })(Language)