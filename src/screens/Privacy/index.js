import React, { Component } from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import styles from './style';
import Header from '../../components/atoms/Header/index'
import * as images from '../../resources/index'
import language from '../../Localization';
import * as utility from '../../Utility/util';
import { connect } from 'react-redux';

class Privacy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            night_mode: false,
            current_language: 'en',
        };
    };
    componentWillMount() {
        utility.recordScreen("Privacy Screen")
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userData !== this.props.userData && this.props.userData) {
            if (this.props.loading !== true) {
                this.setState({
                    night_mode: this.props.userData.night_mode === 1 ? true : false,
                    current_language: this.props.userData.current_language
                })
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
                <View>
                    <Header
                        leftImage={utility.changeBackButton()}
                        redirectLeft={() => this.props.navigation.goBack()}
                        backgroundColor={utility.changeHeaderColor('#F3F3F3')}
                    />
                    <ScrollView style={{ backgroundColor: utility.changeHeaderColor('#FFFFFF') }}>
                        <View style={{ paddingHorizontal: 15, height: "100%", backgroundColor: utility.changeHeaderColor('#FFFFFF'), paddingBottom: 70 }}>

                            <Text style=
                                {[
                                    styles.title,
                                    { color: utility.changeFontColor("#000000") }
                                ]}
                            >Privacy Online</Text>
                            <Text style=
                                {[
                                    styles.desc,
                                    { color: utility.changeFontColor("#000000") }
                                ]}
                            >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                    id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                     eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                    id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                     eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                            <Text style={{ paddingTop: 15, color: utility.changeFontColor("#000000") }}>{language.CopyRight}</Text>

                        </View>
                    </ScrollView>
                </View >
                <ATOMS.OfflineBar />
            </SafeAreaView>
        );
    }
}


const mapStateToProps = state => {
    const { loading, isSuccess, userId, userData, current_language } = state.user
    return {
        current_language,
        loading,
        userData,
        isSuccess,
        userId
    }
};

export default connect(mapStateToProps, null)(Privacy)