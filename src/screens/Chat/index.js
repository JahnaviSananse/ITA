import 'prop-types';
import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import Header from '../../components/atoms/Header/index';
import * as color from '../../constants/colors';
import language from '../../Localization';
import * as images from '../../resources/index';
import {
  getAllComment,
  getUpdatedComment,
  sendMessage,
  setPostId,
  setReportScreen,
} from '../../store/Report/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      image: '',
    };
    AsyncStorage.setItem('isChat', '1');
    setTimeout(() => {
      this.getAllComment();
    }, 500);
  }
  getLoadMore() {
    if (this.props.post_id && this.props.commentList.length > 0) {
      let lastObject = this.props.commentList[0];
      this.getAllComment(lastObject.createdAt);
      utility.recordEvent('Chat: Load more');
    }
  }
  getAllComment(lastTime) {
    if (this.props.post_id) {
      let request = {};
      request.post_id = this.props.post_id;
      if (lastTime) {
        request.last_message_date = lastTime;
        this.props.getUpdatedComment(request);
      } else {
        this.props.getAllComment(request);
        utility.recordEvent('Chat: all comments');
      }
    }
  }
  componentWillUnmount() {
    AsyncStorage.removeItem('isChat');
    this.props.setPostId('');
    this.props.setReportScreen(false);
  }

  componentDidMount() {
    this.props.setReportScreen(true);
    // firebase.notifications().removeAllDeliveredNotifications();
  }
  componentWillMount() {}

  onSend(messages = []) {
    let request = {};
    request.message = messages[0].text;
    if (this.props.post_id) {
      request.post_id = this.props.post_id;
    }

    this.props.sendMessage(request);
  }

  onImageSend(messages = []) {
    let request = {};
    request.attachment_image = this.state.image;
    if (this.props.post_id) {
      request.post_id = this.props.post_id;
    }
    this.props.sendMessage(request);
  }

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        this.setState({
          //image: image.path
          image: {uri: image.path, name: 'photo.jpg', type: 'image/jpeg'},
        });
        setTimeout(() => {
          //alert(JSON.stringify(this.state.image))
          this.onImageSend();
        }, 500);
      })
      .catch((e) => {});
  }
  openGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeExif: true,
    })
      .then((image) => {
        console.log(image);
        this.setState({
          //image: image.path
          image: {uri: image.path, name: 'photo.jpg', type: 'image/jpeg'},
        });
        setTimeout(() => {
          //alert(JSON.stringify(this.state.image))
          this.onImageSend();
        }, 500);
      })
      .catch((e) => {});
  }
  renderAlert() {
    return Alert.alert(
      '',
      language.ChooseImageFrom,
      [
        {text: language.Close, onPress: () => console.log('close pressed')},
        {
          text: language.Camera,
          onPress: () => {
            this.openCamera();
          },
          style: 'cancel',
        },
        {
          text: language.Gallary,
          onPress: () => {
            this.openGallery();
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor('#F3F3F3'),
        }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              title={language.ReportAnIssue}
              leftImage={utility.changeCloseButton()}
              rightImage={
                this.props.commentList.length === 0
                  ? null
                  : utility.refreshIcon()
              }
              bgColor={color.BG_COLOR}
              backgroundColor={utility.changeHeaderColor('#F3F3F3')}
              redirectLeft={() => this.props.navigation.goBack()}
              redirectRight={() => {
                if (this.props.commentList.length === 0) {
                  return;
                }
                this.getLoadMore();
              }}
            />
          </View>
          <GiftedChat
            placeholder={language.TypeMessage}
            messages={this.props.commentList}
            onSend={(messages) => this.onSend(messages)}
            renderAvatar={null}
            showUserAvatar={false}
            alwaysShowSend={true}
            isAnimated
            textInputProps={styles.messageContainer}
            alignTop={true}
            inverted={true}
            renderSystemMessage={(props) => {
              return (
                //    this.props.commentList.
                <Text
                  style={{
                    color: utility.changeFontColor('#253647'),
                    width: '100%',
                    textAlign: 'center',
                    padding: 10,
                    fontWeight: '500',
                    fontSize: 14,
                  }}>
                  {language.SystemMessage}
                </Text>
              );
            }}
            //renderBubble={this.renderBubble()}
            showAvatarForEveryMessage={true}
            renderAvatar={(props) => {
              <Image
                source={{uri: this.state.image}}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'contain',
                }}></Image>;
            }}
            renderActions={(props) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.renderAlert();
                  }}>
                  <Image
                    source={images.ATTACHMENT}
                    style={{
                      height: 50,
                      width: 30,
                      resizeMode: 'contain',
                      marginLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></Image>
                </TouchableOpacity>
              );
            }}
            renderSend={(props) => {
              utility.recordEvent('Chat: Message sent button pressed');
              return (
                <Send {...props}>
                  <Text
                    style={{
                      color: '#8bb2b5',
                      paddingRight: 15,
                      paddingBottom: 15,
                      fontSize: 20,
                      alignItems: 'center',
                    }}>
                    {language.Send}
                  </Text>
                </Send>
              );
            }}
            renderBubble={(props) => {
              return (
                <Bubble
                  {...props}
                  textStyle={{
                    right: {
                      color: '#000',
                      fontSize: 14,
                      maxWidth: 150,
                    },
                    left: {
                      color: '#000',
                      fontSize: 14,
                      maxWidth: 150,
                    },
                  }}
                  bottomContainerStyle={{
                    right: {
                      display: 'none',
                    },
                    left: {
                      display: 'none',
                    },
                  }}
                  wrapperStyle={{
                    right: {
                      backgroundColor: '#b8d0d2',
                      borderRadius: 10,
                      borderTopEndRadius: 10,
                      borderBottomEndRadius: 10,
                      padding: 5,
                    },
                    left: {
                      backgroundColor: '#eaeaea',
                      borderRadius: 10,
                      borderTopEndRadius: 10,
                      borderBottomEndRadius: 10,
                      borderBottomLeftRadius: 10,
                      //borderColor: 'red',
                      //borderWidth: 2,
                      padding: 5,
                    },
                  }}
                />
              );
            }}
            user={{
              _id: this.props.userId,
            }}
            image={{
              image: {uri: this.state.image},
            }}
            parsePatterns={(linkStyle) => [
              {
                pattern: /#(\w+)/,
                style: {...linkStyle, color: '#0645AD'},
                onPress: (props) => alert(`press on ${props}`),
              },
            ]}
          />

          <ATOMS.Loader isLoading={this.props.loadingComment} />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    post_id,
    loadingComment,
    isSuccess,
    loading,
    commentList,
  } = state.report;

  const {userId} = state.user;
  return {
    userId,
    post_id,
    loadingComment,
    loading,
    isSuccess,
    commentList,
  };
};
export default connect(mapStateToProps, {
  setPostId,
  setReportScreen,
  getAllComment,
  sendMessage,
  getUpdatedComment,
})(Chat);
