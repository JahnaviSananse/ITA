import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import Header from '../../components/atoms/Header'
import * as ATOMS from '../../components/atoms';
import * as images from '../../resources/index'
import * as helpRiskData from './helpRisk.json'
import * as utility from '../../Utility/util';
import { connect } from 'react-redux';



// This will help you to render custom navigation bar. 
// Its defualt component for my structure. We can modify as per requirement
class RiskProfileModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            helpRisJson: JSON.parse(JSON.stringify(helpRiskData.data)),
        }
    }
    renderText() {
        return this.state.helpRisJson.map((item) => <View>
            <Text style=
                {[
                    styles.modalQuestionText,
                    { color: utility.changeFontColor("#000000") }
                ]}
            >{item.question}</Text>
            <Text style=
                {[
                    styles.modalText,
                    { color: utility.changeFontColor("#000000") }
                ]}
            >
                {item.ans}
            </Text>
        </View>)

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
    componentWillMount() {
        utility.recordScreen("Help Risk Screen")
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
                    <View >
                        <Header
                            leftImage={utility.changeDownButton()}
                            backgroundColor={utility.changeHeaderColor('#F3F3F3')}
                            redirectLeft={() => this.props.navigation.goBack()}
                            navigation={this.props.navigation}
                        />
                        <ScrollView>
                            <View style={styles.modalContainer}>
                                {this.renderText()}
                            </View>
                        </ScrollView>
                    </View>
                    <ATOMS.OfflineBar />
                </SafeAreaView>
            </View >
        );
    }
}


const mapStateToProps = state => {
    const { loading, userId, userData, current_language } = state.user
    return {
        current_language,
        loading,
        userData,
        userId
    }
};

export default connect(mapStateToProps, null)(RiskProfileModal)