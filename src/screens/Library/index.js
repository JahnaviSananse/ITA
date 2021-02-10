import React, {Component} from 'react';
import {
  Dimensions,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import YouTube from 'react-native-youtube';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import List from '../../components/atoms/ProductList';
import TabHeader from '../../components/atoms/TabHeader';
import language from '../../Localization';
import * as images from '../../resources/index';
import {getLibraryData, getLibraryDataPull} from '../../store/Library/actions';
import {setRecent} from '../../store/User/actions';
import * as utility from '../../Utility/util';
import styles from './style';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openVideo: false,
      url: '',
      night_mode: false,
      current_language: 'en',
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData) {
      if (this.props.userLoading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }
  onAllVideosClick() {
    utility.recordEvent('Library : All Videos Pressed');
    this.props.navigation.push('Video');
  }
  renderBanner(item) {
    return (
      <View
        style={{
          marginTop: 5,
          backgroundColor: utility.changeBackgroundColor('#F2F2F2'),
        }}>
        <TouchableOpacity
          style={styles.videoContainer}
          onPress={() => {
            // this.setState({ url: item.video_link, openVideo: true })
            let video_id = utility.getVideoID(item.video_link);
            this.props.navigation.navigate('YouTubeScreen', {
              video_id: video_id,
            });

            // if (item.video_link.indexOf('youtu') > -1) {
            //     Linking.openURL(item.video_link)
            // } else {
            //     this.setState({ url: item.video_link, openVideo: true })
            // }
          }}>
          <FastImage
            source={{uri: item.video_thumbnail}}
            style={{height: 230, width: '100%'}}
          />
          <FastImage
            source={require('../../resources/play.png')}
            style={styles.playButton}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.TextBannerTop,
            {
              color: utility.changeFontColor('black'),
            },
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.TextBannerBottom,
            {color: utility.changeFontColor('#757575')},
          ]}>
          {item.short_description}
        </Text>
        <View
          style={{
            height: 0.5,
            backgroundColor: '#E4E3E2',
            alignSelf: 'center',
            width: '92%',
          }}></View>

        <TouchableOpacity
          onPress={() => this.onAllVideosClick()}
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.textSeeAllVideo}>{language.SeeAllVideos}</Text>
          <FastImage
            style={{height: 13, width: 13, marginRight: 12}}
            source={require('../../resources/nextBlue.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderBrochure(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('WebViewScreen', {data: item})
        }
        style={[
          styles.bannerContainer,
          {backgroundColor: utility.changeBackgroundColor('#F2F2F2')},
        ]}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={{width: '100%', height: 240}}
          source={{uri: item.image}}
        />
        <Text
          style={[
            styles.bannerTitle,
            {
              color: utility.changeFontColor('black'),
            },
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.bannerDesc,
            {color: utility.changeFontColor('#757575')},
          ]}>
          {item.short_description}
        </Text>
      </TouchableOpacity>
    );
  }
  renderList(item) {
    return (
      <View>
        <List data={item} />
      </View>
    );
  }
  componentWillMount() {
    utility.recordScreen('Library Screen');
  }
  componentDidMount() {
    this.props.getLibraryData();
  }

  setRecent(post_id) {
    utility.recordEvent('Library : setRecent');
    let request = {};
    request.post_id = post_id;
    this.props.setRecent(request);
  }
  onRefresh() {
    this.props.getLibraryDataPull();
  }
  renderVideoPlayer() {
    if (this.state.url === '') return;

    let height = Dimensions.get('screen').height;
    let topMargin = height / 2 - 150;
    var video_id = utility.getVideoID(this.state.url);
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openVideo}
          onRequestClose={() => {}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: '#000000B3',
            }}
          />

          <ScrollView
            style={{backgroundColor: 'transparent'}}
            onLayout={({
              nativeEvent: {
                layout: {width},
              },
            }) => {
              if (!this.state.containerMounted)
                this.setState({containerMounted: true});
              if (this.state.containerWidth !== width)
                this.setState({containerWidth: width});
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({openVideo: false});
              }}
              style={{
                height: 40,
                width: 40,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderRadius: 20,
                right: 0,
                marginTop: topMargin - 45,
              }}>
              <FastImage
                style={{height: 15, width: 15}}
                source={images.VIDEO_CLOSE}
              />
            </TouchableOpacity>
            <YouTube
              ref={(component) => {
                this._youTubeRef = component;
              }}
              apiKey="AIzaSyARHAt8AayWJk1zRUD-fN068mIpUO20Y78"
              videoId={video_id}
              play={true}
              controls={1}
              style={{
                marginTop: topMargin,
                height: 300,
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </ScrollView>
        </Modal>
      </View>
    );
  }
  render() {
    const type = {
      PRESENTATION: 'presentation',
      SOCIAL: 'Social Post',
      FLYER: 'Flyer',
      PRODUCT: 'Product',
    };
    const navigation = this.props.navigation;
    let productCat = [];
    let socialPostCat = [];
    let flyerCat = [];
    if (this.props.cloading == false && this.props.cSuccess) {
      productCat = this.props.configData.category.product;
      socialPostCat = this.props.configData.category.social_post;
      flyerCat = this.props.configData.category.flyer;
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor('#FFFFFF'),
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#FFFFFF',
            paddingBottom: 50,
          }}>
          <TabHeader
            title={language.Library}
            img={utility.changeSearchButton()}
            backgroundColor={utility.changeHeaderColor('#F3F3F3')}
            redirectRight={() =>
              this.props.navigation.push('SearchScreen', {
                placeholder: language.Library,
              })
            }
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.loadingPull}
                onRefresh={this.onRefresh.bind(this)}
              />
            }>
            {this.props.data.posts &&
              this.props.data.posts.map((item) => (
                <View>
                  {item.type === 'brochure' && this.renderBrochure(item)}
                  {item.type === 'products' && (
                    <List
                      title={item.title}
                      data={item}
                      navigation={navigation}
                      viewAll={() =>
                        navigation.navigate('Product', {
                          category: productCat,
                          headerTitle: item.title,
                        })
                      }
                      postClick={(id) => this.setRecent(id)}
                    />
                  )}

                  {item.type === 'flyers' && (
                    <List
                      // title={'Flyers'}
                      data={item}
                      navigation={navigation}
                      viewAll={() =>
                        navigation.navigate('Product', {
                          category: flyerCat,
                          headerTitle: item.title,
                        })
                      }
                      headerTitle={item.title}
                      postClick={(id) => this.setRecent(id)}
                    />
                  )}
                  {item.type === 'socialpost' && (
                    <List
                      // title={'Social Posts'}
                      data={item}
                      navigation={navigation}
                      headerTitle={item.title}
                      viewAll={() =>
                        navigation.navigate('SocialPosts', {
                          category: socialPostCat,
                          headerTitle: item.title,
                        })
                      }
                      postClick={(id) => this.setRecent(id)}
                    />
                  )}
                  {item.type === 'presentation' && (
                    <List
                      // title={'Presentation'}
                      data={item}
                      navigation={navigation}
                      postClick={(id) => this.setRecent(id)}
                    />
                  )}
                  {item.type === 'video' && this.renderBanner(item)}
                </View>
              ))}
          </ScrollView>
          {this.renderVideoPlayer()}
          <ATOMS.Loader isLoading={this.props.loading} />
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const {isSuccess, libraryData, loading, loadingPull} = state.library;
  const {configData} = state.auth;
  const {userId, userData, userLoading, current_language} = state.user;
  return {
    current_language,
    loadingPull,
    loading,
    data: libraryData,
    isSuccess,
    configData,
    userId,
    cloading: state.auth.loading,
    cSuccess: state.auth.isSuccess,
    userData,
    userLoading,
  };
};

export default connect(mapStateToProps, {
  getLibraryData,
  getLibraryDataPull,
  setRecent,
})(Library);
