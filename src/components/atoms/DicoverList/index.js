import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    Linking,
    Platform, Text,
    TouchableOpacity, View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from 'react-redux';
import * as COLOR from '../../../constants/colors';
import language from '../../../Localization';
import * as images from '../../../resources/index';
import { shareData } from '../../../store/Auth/actions';
import { pollVote, surveyVote } from '../../../store/Discover/actions';
import * as utility from '../../../Utility/util';
import styles from './style';



class index extends Component {
    constructor(props) {
        super(props);
        selectedIndex: 0,
            this.state = {
                selectedPoll: '',
                isDisable: false,
                submitedOption: '',
                ansType: '',
                selectedIndex: -1,
                isSubmited: false,
            };
    };

    voteAction(type) {
        if (type == "poll") {
            let voteRequest = {}
            voteRequest.user_id = this.props.userId
            voteRequest.poll_id = this.props.video.post_id
            voteRequest.text = this.state.selectedPoll
            this.props.pollVote(voteRequest)
        } else if (type == "survey") {
            let voteRequest = {}
            voteRequest.user_id = this.props.userId
            voteRequest.survey_id = this.props.video.post_id
            voteRequest.text = this.state.selectedPoll
            this.props.surveyVote(voteRequest)
        }
    }

    trackMethod(str) {
        let value = `DiscoverList: ${str}`
        utility.recordEvent(value)
    }
    renderPollOptions(pollOption) {
        let video = this.props.video;
        let pollType = 'textimage';
        if (video.answers_type === 'text') {
            pollType = 'text'
        } else if (video.answers_type === 'image') {
            pollType = 'image'
        }
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: "center", alignItems: "center" }}>

                {
                    pollType === 'text' && <Text style={styles.pollOptionsText}>{pollOption.text}</Text>
                }
                {
                    // pollType === 'image' && <Text style={styles.pollOptionsText}>{video.poll_answers[0].image}</Text>
                    pollType === 'image' &&
                    <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: pollOption.image }}
                    />

                }
                {/* {
                    pollType === 'textimage' && <View style={{ flexDirection: 'column', alignItems: "center", height: '100%', width: '100%' }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.cover}
                            style={{ width: '100%', height: '50%', backgroundColor: "red" }}
                            source={{ uri: pollOption.image }}
                        />
                        <Text numberOfLines={2} style={styles.pollOptionsTextImage}>{pollOption.text}</Text>
                    </View>
                } */}
            </View>
        )
    }
    sharingOptions() {
        utility.recordEvent("Discover : sharingOptions")
        let video = this.props.video
        let url = ''
        if (video.file_url) {
            url = video.file_url
        } else if (video.shareable_link) {
            url = video.shareable_link
        } else if (video.image) {
            url = video.image
        }
        this.props.shareData(url)
        // Share.share({
        //     message: '',
        //     url: url,
        //     title: this.props.video.title ? this.props.video.title : ''
        // })
    }
    storedAnswer(obj) {
        // alert(obj.type)
        // let text = obj.image ? obj.image : obj.text
        // let link = (text == 'image' ? obj.answer.image : obj.answer.text)
        // let mainObject = {}
        // mainObject.text = link
        // // alert(JSON.stringify(mainObject))
        // this.setState({
        //     selectedPoll: mainObject
        // })

        // let text = obj.image ? obj.image : obj.text
        // let mainObject = {}
        // mainObject.text = (text === 'image' ? obj.answer.image : obj.answer.text)
        // alert(JSON.stringify(mainObject))

        // this.setState({
        //     selectedPoll: mainObject
        // })
    }
    pollOptions(video) {
        let isPollSelected = -1
        let isPollEnable = false
        let pollButtonWidth = ((Dimensions.get('screen').width - 50) / 2)
        let answer = video.users_answer ? video.users_answer : ''
        video.answers.map((value, index) => {
            let pValue = value.image ? value.image : value.text
            if (pValue === this.state.selectedPoll.text || answer === pValue) {
                isPollSelected = index
            }
        })
        if (video.users_answer) {
            isPollEnable = true
        }
        if (isPollSelected == -1 && this.state.selectedIndex != -1) {
            isPollSelected = this.state.selectedIndex;
        }
        return (
            <FlatList
                data={video.answers}
                extraData={this.state}
                renderItem={({ index, item }) =>
                    < View style={{ marginBottom: 30, paddingHorizontal: 5 }}>
                        <TouchableOpacity
                            disabled={isPollEnable}
                            onPress={() => {
                                this.setState({
                                    selectedIndex: index,
                                    selectedPoll: video.answers_type === 'image' ? video.answers[index].image : video.answers[index].text
                                })
                            }}
                            style={[styles.pollOptions, { borderColor: "#89B4B6", borderWidth: isPollSelected === index ? 3 : 0, width: pollButtonWidth }]}>
                            {this.renderPollOptions(video.answers[index])}
                        </TouchableOpacity>
                        <View style={{ height: 30, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Text style={{ fontSize: 15, paddingTop: 20, color: utility.changeFontColor('#000000') }}>100%</Text> */}
                            {video.users_answer !== '' &&
                                <Text style={{ fontSize: utility.normalize(15), flexDirection: 'column', color: utility.changeButtonColor('#93b1b4') }}>{video.answers[index].percentage}%</Text>
                            }

                            {/* pollAnswers[0].percentage */}
                        </View>
                    </ View>
                }
                numColumns={2}

            />
        )
    }
     renderBottomSheet() {
       
        return (
            <View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={ 200}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}>
                        <TouchableOpacity style={styles.rowContainer}
                        onPress={() => {
                            this.RBSheet.close()
                            setTimeout(() => {
                                this.loadInBrowser()
                                // this.sharingOptions()
                            }, 1000);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.icon} source={images.SHARE}></FastImage>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ textAlignVertical: 'center' }}>{Platform.OS === 'ios' ? language.BrowserIOS: language.Browser}</Text>
                        </View>
                        <View style={styles.saperator} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer}
                        onPress={() => {
                            this.RBSheet.close()
                            setTimeout(() => {
                                this.sharingOptions()
                            }, 1000);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.icon} source={images.SHARE}></FastImage>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ textAlignVertical: 'center' }}>{language.Share}</Text>
                        </View>
                        <View style={styles.saperator} />
                    </TouchableOpacity>

                    
                       
                        

                   
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.RBSheet.close()}>
                        <Text>{language.Cancel}</Text>
                    </TouchableOpacity>
                </RBSheet>
            </View >
        )
    }
 loadInBrowser = () => {
     let video = this.props.video
        let url = ''
        if (video.file_url) {
            url = video.file_url
        } else if (video.shareable_link) {
            url = video.shareable_link
        } else if (video.image) {
            url = video.image
        }
    //   let newUrl = this.state.data.file_url.replace(" ", '');
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

    render() {
        const TYPE = {
            VIDEO: "video",
            POLL: "poll",
            DISCOVER: "flyer",
            NEWS: 'news',
            PDF: 'pdf',
            SURVEY: 'survey',
        }

        // let type = this.props.type
        let video = this.props.video;
        let top = [styles.topLabelForVideo,
        { color: utility.changeFontColor("#8bb2b5") }]
        let middle = [styles.middleLabelForVideo,
        { color: utility.changeFontColor("#000") }]
        let last = [styles.lastLabelForVideo,
        { color: utility.changeFontColor("#000") }]
        if (this.props.list === TYPE.DISCOVER) {
            top = [styles.topLabelForDiscover,
            {
                color: utility.changeFontColor("#233746")
            }]
            middle = [styles.middleLabelForDiscover,
            {
                color: utility.changeFontColor("#233746")
            }]
            last = [styles.lastLabelForDiscover,
            {
                color: utility.changeFontColor("#233746"),
            }]
        }
        let width = Dimensions.get("screen").width
        let pollButtonWidth = ((Dimensions.get('screen').width - 50) / 3)
        let isPollSelected = -1
        let isPollEnable = false
        if (video.type == TYPE.POLL) {
            //console.log(JSON.stringify(this.props.pollAnswers))
            let answer = video.users_answer ? video.users_answer : ''
            video.poll_answers.map((value, index) => {
                let pValue = value.image ? value.image : value.text
                if (pValue === this.state.selectedPoll.text || answer === pValue) {
                    isPollSelected = index
                }
            })
            if (video.users_answer) {
                isPollEnable = true
            }
        }
        let isClickable = false
        if (video.type === TYPE.NEWS || video.type === TYPE.DISCOVER || video.type === TYPE.PDF) {
            isClickable = true
        }
        return (
            <View style={{ backgroundColor: utility.changeBackgroundColor("#FFFFFF"), marginBottom: 5 }}>

                {video.type == TYPE.VIDEO ?
                    <TouchableOpacity
                        style={styles.videoContainer}
                        onPress={() => {
                            this.props.onPress()
                            this.trackMethod('Video plat button pressed')
                        }}>
                        <FastImage source={{ uri: video.video_thumbnail }} style={{ height: 200, width: '100%', backgroundColor: COLOR.BG_COLOR }} resizeMode={FastImage.resizeMode.cover} />
                        <FastImage source={require('../../../resources/play.png')} style={styles.playButton} resizeMode={FastImage.resizeMode.cover} />
                    </TouchableOpacity>
                    :
                    <View style={styles.imageContainer}>
                        <FastImage resizeMode={FastImage.resizeMode.contain} source={{ uri: video.image }} style={{ height: 200, width: '100%' }} resizeMode={FastImage.resizeMode.cover} />
                        <LinearGradient ref={r => this.gradiant = r} locations={[0, 1.0]} colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.7)']} style={{ position: 'absolute', width: '100%', height: '100%' }} />
                        {
                            isClickable &&
                            <TouchableOpacity
                                style={{ position: 'absolute', height: '100%', width: '100%' }}
                                onPress={() => {
                                    this.props.onPress()
                                }}
                            >
                            </TouchableOpacity>
                        }

                    </View>
                }


                <View style={styles.descContainer}>
                    {video.type == TYPE.VIDEO &&
                        <TouchableOpacity onPress={() => {
                            this.props.onPress()
                        }}>
                            <Text style={top}>{video.category}</Text>
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={middle}>{video.title}</Text>
                                <Text style={last}>{video.short_description}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {video.type == TYPE.DISCOVER &&
                        <TouchableOpacity onPress={() => {
                            this.props.onPress()
                        }}>
                            <Text style={top}>{video.category}</Text>
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={middle}>{video.title}</Text>
                                <Text style={last}>{video.short_description}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {video.type == TYPE.NEWS &&
                        <TouchableOpacity onPress={() => {
                            this.props.onPress()
                        }}>
                            <Text style={top}>{video.category}</Text>
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={middle}>{video.title}</Text>
                                <Text style={last}>{video.short_description}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {video.type == TYPE.PDF &&
                        <TouchableOpacity onPress={() => {
                            this.props.onPress()
                        }}>
                            <Text style={top}>{video.category}</Text>
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={middle}>{video.title}</Text>
                                <Text style={last}>{video.short_description}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {/* {video.type == TYPE.VIDEO ?  : <Text style={top}>{video.category}</Text>}
                    <View style={styles.videoDetails}>
                        {video.type == TYPE.VIDEO ? <Text numberOfLines={2} style={middle}>{video.title}</Text> : <Text numberOfLines={2} style={middle}>{video.title}</Text>}
                        {video.type == TYPE.VIDEO ? <Text style={last}>{video.short_description}</Text> : <Text style={last}>{video.short_description}</Text>}
                    </View> */}
                    {this.renderBottomSheet()}
                    {video.type == TYPE.SURVEY &&
                        < View style={{ marginHorizontal: 15 }}>
                            <Text style={[top, { paddingHorizontal: 1 }]}>{video.category}</Text>
                            <Text numberOfLines={2} style={middle}>{video.title}</Text>
                            <Text style={last}>{video.question}</Text>
                            <Text style=
                                {[
                                    styles.pollTitle,
                                    { color: utility.changeFontColor("#B7B7B7") }
                                ]}
                            >{video.expiry_date}</Text>
                            <View style={styles.pollOptionsContainer}>
                                {this.pollOptions(video)}

                            </View>
                            <TouchableOpacity
                                disabled={video.users_answer == '' ? false : true}
                                activeOpacity={this.state.submitedOption != '' ? 1 : 0}
                                onPress={() =>
                                    this.voteAction(video.type)
                                }
                                style=
                                {[
                                    styles.buttonVote,
                                    { backgroundColor: utility.changeButtonColor("#3E4950") }
                                ]}>
                                {
                                    <Text style={styles.voteText}>{video.users_answer == '' ? language.Submit : language.Submited}</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                    {video.type == TYPE.POLL &&
                        < View style={{ marginHorizontal: 15 }}>

                            {/* {alert(video.expiry_date)} */}
                            <Text style={[top, { paddingHorizontal: 1 }]}>{video.category}</Text>
                            <Text numberOfLines={2} style={middle}>{video.title}</Text>
                            <Text style={last}>{video.question}</Text>
                            <Text style=
                                {[
                                    styles.pollTitle,
                                    { color: utility.changeFontColor("#B7B7B7") }
                                ]}
                            >{video.expiry_date}</Text>
                            <View style={styles.pollOptionsContainer}>
                                {this.pollOptions(video)}

                            </View>
                            <TouchableOpacity
                                disabled={video.users_answer == '' ? false : true}
                                activeOpacity={this.state.submitedOption != '' ? 1 : 0}
                                onPress={() => {
                                    //alert(JSON.stringify(this.props.pollAnswers))
                                    this.voteAction(video.type)
                                }
                                }
                                style=
                                {[
                                    styles.buttonVote,
                                    { backgroundColor: utility.changeButtonColor("#3E4950") }
                                ]}>
                                {/* <Text style={styles.voteText}>{isPollEnable === false ? language.Vote : language.Voted}</Text> */}
                                {
                                    <Text style={styles.voteText}>{video.users_answer === '' ? language.Vote : language.Voted}</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                {
                    video.type != TYPE.POLL && video.type != TYPE.SURVEY && video.type != TYPE.VIDEO &&
                    <TouchableOpacity style={{ backgroundColor: 'transparent', height: 40, width: 40, position: 'absolute', top: 160, right: 0, justifyContent: 'center', alignItems: 'center' }} onPress={() =>  this.RBSheet.open()} >
                        <FastImage resizeMode={FastImage.resizeMode.contain} 
                        source={require('../../../resources/uploadWhite.png')} 
                        style={styles.uploadButton} />
                    </TouchableOpacity>
                }
            </View >
        )
    }
}



const mapStateToProps = state => {
    const { loading, isSuccess, pollAnswers } = state.discover
    return {
        loading,
        isSuccess,
        pollAnswers
    }
};

export default connect(mapStateToProps, { pollVote, surveyVote, shareData })(index)