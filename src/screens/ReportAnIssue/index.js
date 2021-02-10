import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import * as images from '../../resources/index'
import * as color from '../../constants/colors'
import * as ATOMS from '../../components/atoms';
import * as MSG from '../../constants/message';
import Header from '../../components/atoms/Header/index'
import * as utility from '../../Utility/util';
import { setPostId, getReportList, getReportListPullToRefersh } from '../../store/Report/actions';
import { connect } from 'react-redux';
import * as scale from '../../Utility/util'
import * as fonts from '../../constants/fonts/index'
import moment from 'moment'
import styles from './style';
import language from '../../Localization';
import FastImage from 'react-native-fast-image'

class ReportAnIssue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            refreshing: false,
            night_mode: false,
            current_language: 'en'
        }
        this.props.getReportList()
    }

    componentWillMount() {
        utility.recordScreen("Report An Issue Screen")
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userData !== this.props.userData && this.props.userData) {
            if (this.props.userLoading !== true) {
                this.setState({
                    night_mode: this.props.userData.night_mode === 1 ? true : false,
                    current_language: this.props.userData.current_language
                })
            }
        }
    }
    onRefresh() {
        this.props.getReportListPullToRefersh()
        this.setState({
            isLoading: false
        })

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            title={language.ReportAnIssue}
                            leftImage={utility.changeBackButton()}
                            rightImage={utility.changeChatButton()}
                            backgroundColor={utility.changeHeaderColor('#F3F3F3')}
                            redirectRight={() => {
                                this.props.setPostId('')
                                this.props.navigation.navigate('Chat')
                            }}
                            redirectLeft={() => this.props.navigation.goBack()} />
                    </View>
                    {
                        !this.props.loading && this.props.reportList.length === 0 &&

                        <View style=
                            {[
                                styles.viewContainer,
                                { backgroundColor: utility.changeBackgroundColor("#FFFF"), }
                            ]}
                        >
                            <Text style=
                                {[
                                    styles.noDataText,
                                    {
                                        color: utility.changeFontColor("#000000"),
                                        fontWeight: '600',
                                    }
                                ]}
                            >{language.ReportAnIssue}</Text>
                            <FastImage source={images.CONVERSATION} style={styles.nodataImgContainer} />
                            <Text style=
                                {[
                                    styles.noDataText,
                                    {
                                        color: utility.changeFontColor("#000000"),
                                        marginBottom: 70
                                    }
                                ]}
                            >{language.ReportAnIssueConversationStart}</Text>
                        </View>
                    }

                    {
                        !this.props.loading && this.props.reportList.length === 0 &&

                        <View style={styles.viewContainer}>
                            <Text style=
                                {[
                                    styles.noDataText,
                                    {
                                        color: utility.changeFontColor("#000000"),
                                        fontWeight: '600',
                                    }
                                ]}
                            >{language.ReportAnIssue}</Text>
                            <Image source={images.CONVERSATION} style={styles.nodataImgContainer} />
                            <Text style=
                                {[
                                    styles.noDataText,
                                    { color: utility.changeFontColor("#000000"), }
                                ]}
                            >{language.ReportAnIssueConversationStart}</Text>
                        </View>
                    }


                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10, paddingTop: 10, paddingBottom: 50 }}
                        style={{ width: '100%', height: '100%', position: "absolute", marginTop: 50 }}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.loadingPull}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                        data={this.props.reportList}
                        renderItem={({ item }) => {
                            if (item === undefined) return null

                            var date = moment(item.date).format('DD MMM');

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.setPostId(item.post_id)
                                        this.props.navigation.navigate('Chat')
                                    }}
                                    style={{
                                        marginRight: 10,
                                        width: '100%',
                                        height: 60,
                                        marginBottom: 5,
                                        flexDirection: 'row'
                                    }}>
                                    <FastImage
                                        style={{ height: 50, width: 50, borderRadius: 25, padding: 15 }}
                                        source={{ uri: item.admin_image }}
                                    />
                                    <View style={{ justifyContent: 'center', paddingBottom: 10, marginLeft: 10 }}>
                                        <Text
                                            style={{
                                                color: utility.changeFontColor("#000000"),
                                                fontSize: utility.normalize(14),
                                                fontFamily: fonts.FONT_SFPRO_REGULAR
                                            }}>
                                            {item.admin_name}
                                        </Text>
                                        <Text
                                            style={{
                                                color: utility.changeFontColor("#000000"),
                                                fontSize: utility.normalize(14),
                                                fontFamily: fonts.FONT_SFPRO_REGULAR,
                                                paddingRight: 80
                                            }}
                                            numberOfLines={1}>Re: {item.comment ? item.comment : 'Photo'}
                                        </Text>


                                    </View>
                                    <Text
                                        style={{
                                            color: utility.changeFontColor("#000000"),
                                            fontSize: utility.normalize(11),
                                            fontFamily: fonts.FONT_SFPRO_REGULAR,
                                            position: 'absolute', right: 0, top: 0
                                        }}>{date}</Text>
                                    <View style={{ width: '100%', height: 0.3, backgroundColor: 'gray', position: 'absolute', bottom: 0 }} />
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => index}
                    />
                    {/* {this.renderheader()} */}
                    <ATOMS.Loader
                        isLoading={this.props.loading}
                    />
                </View>
                <ATOMS.OfflineBar />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { userId, userData, current_language } = state.user
    const {
        post_id,
        loading,
        isSuccess,
        reportList,
        loadingPull
    } = state.report
    return {
        current_language,
        post_id,
        loading,
        isSuccess,
        reportList,
        loadingPull,
        userId,
        userData
    }
};
export default connect(mapStateToProps, { setPostId, getReportList, getReportListPullToRefersh })(ReportAnIssue)