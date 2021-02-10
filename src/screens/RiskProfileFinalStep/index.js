import React, {Component} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Pie from 'react-native-pie';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import Header from '../../components/atoms/Header/index';
import {default as language, default as LANGUAGE} from '../../Localization';
import {shareData} from '../../store/Auth/actions';
import {riskProfileDetail, uploadImage} from '../../store/RiskProfile/actions';
import * as utility from '../../Utility/util';
import * as helpRiskData from '../RiskProfile/helpRisk.json';
import * as chartHelper from './chartHelper.json';
import styles from './style';

class RiskProfileFinalStep extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      chartList: JSON.parse(JSON.stringify(chartHelper.data)),
      helpRisJson: JSON.parse(JSON.stringify(helpRiskData.data)),
      riskDetail: '',
      clientName: this.props.navigation.getParam('clientName', ''),
      resourceId: 0,
      profileName: '',
      night_mode: false,
      current_language: 'en',
      total: this.props.navigation.getParam('totalCount', 0),
      chartColors: [
        {
          borderColor: '#dadada',
        },
        {
          borderColor: '#a7a7a7',
        },
        {
          borderColor: '#366072',
        },
        {
          borderColor: '#2fbac6',
        },
        {
          borderColor: '#334850',
        },
        {
          borderColor: '#8cb4b7',
        },
      ],
      localImage: '',
      image: '',
      uploadImage: false,
      imgURL: '',
    };
  }
  sharingOptions() {
    this.takeAScreenshots();
    return;
  }
  componentDidMount() {
    //alert(this.state.total)
    let riskDetailsRequest = {};
    (riskDetailsRequest.resource_id = this.props.resourceId),
      (riskDetailsRequest.total_score = parseInt(this.state.total));
    this.props.riskProfileDetail(riskDetailsRequest);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData && this.props.userData) {
      if (this.props.loading !== true) {
        this.setState({
          night_mode: this.props.userData.night_mode === 1 ? true : false,
          current_language: this.props.userData.current_language,
        });
      }
    }
  }
  componentWillMount() {
    utility.recordScreen('Risk Profile Final Step Screen');
  }

  componentDidUpdate() {
    // if (this.props.riskDetail != null) {
    //     this.setState({
    //         profileName: JSON.stringify(riskProfileDetail.profile_name)
    //     })
    // }
  }
  handleBackButtonClick() {
    this.props.navigation.navigate('Resources');
    return true;
  }
  renderquestionAns() {
    return this.state.helpRisJson.map((item) => (
      <View>
        <Text
          style={[
            styles.modalQuestionText,
            {color: utility.changeFontColor('#253647')},
          ]}>
          {item.question}
        </Text>
        <Text
          style={[
            styles.modalText,
            {color: utility.changeFontColor('#253647')},
          ]}>
          {item.ans}
        </Text>
      </View>
    ));
  }
  renderText() {
    if (this.props.riskDetail != null) {
      return this.props.riskDetail[0].funds.map((item, index) => (
        <View style={styles.chartItemView}>
          <View
            style={[
              styles.chartItems,
              {borderColor: this.state.chartColors[index].borderColor},
            ]}></View>
          <Text
            style={[
              styles.chartListText,
              {
                width: '75%',
                marginLeft: 10,
                color: utility.changeFontColor('#000000'),
              },
            ]}>
            {item.fund_detail.title}
          </Text>
          <Text
            style={[
              styles.chartListText,
              {
                width: '75%',
                marginLeft: 10,
                color: utility.changeFontColor('#000000'),
              },
            ]}>
            {item.weightage + '%'}
          </Text>
        </View>
      ));
    }
  }

  takeAScreenshots() {
    captureRef(this.refs.viewRef, {
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => {
        // this.setState({
        //     localImage: uri,
        //     image: { uri: uri, name: 'photo.jpg', type: 'image/jpeg' },
        // })
        setTimeout(() => {
          // this.uploadImage()
          let options = {
            type: 'application/jpeg',
            url: Platform.OS === 'android' ? 'file://' + uri : uri,
          };
          Share.open(options);
        }, 200);
      },
      (error) => console.error('Oops, snapshot failed', error),
    );

    // this.refs.viewShot.capture().then(uri => {
    //     this.setState({
    //         localImage: uri
    //     })
    //     console.log("Do something with ", uri);
    //   });
  }
  renderItems = ({item, index}) => {
    return (
      <TouchableOpacity //activeOpacity={data.pdf !== '' ? 0.8 : 1.0}
        onPress={() => {
          utility.recordEvent(
            'RiskProfileFinalStep :' + item.fund_detail.isin + ' Pressed',
          );
          // if (item.fund_detail.pdf !== '') {
          //     this.props.navigation.navigate("WebViewScreen", { "title": "Fund Platform" })
          // }

          if (item.fund_detail.pdf !== '') {
            let data = JSON.parse(JSON.stringify(item.fund_detail));
            data.file_url = data.pdf;
            this.props.navigation.navigate('WebViewScreen', {
              data: data,
              isFund: true,
            });
          }
        }}
        style={styles.containerFundList}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.fund_detail.isin}</Text>
          <Text style={styles.currencyText}>{item.fund_detail.fund_code}</Text>
        </View>

        <View style={styles.imageContainer}>
          <FastImage
            style={styles.imageStyle}
            source={{uri: item.fund_detail.image}}
          />
          <Text style={styles.descText} numberOfLines={1}>
            {item.fund_detail.title}
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.countryText}>
            {item.fund_detail.investmentuniverse}
          </Text>
          <View style={styles.verticalLineContainer} />
          <Text style={styles.categoryText}>{item.fund_detail.assetclass}</Text>
        </View>
        {item.fund_detail.pdf !== '' && (
          <FastImage
            style={styles.cornerImage}
            source={require('../../resources/corner.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  // ReplaceTextFunction(profileName) {

  //     var SampleText = language.RiskProfileResult

  //     var NewText = SampleText.replace("XXXXXX", profileName);

  //     this.setState({ TextHolder: NewText });

  // }
  render() {
    //
    let profileName = '';
    let profile_description = '';
    let fundsData = [];
    let pieChartdata = [];
    let pierChartColors = [];
    if (this.props.riskDetail != null) {
      (profileName = this.props.riskDetail[0].profile_name),
        (profile_description = this.props.riskDetail[0].profile_description),
        (fundsData = this.props.riskDetail[0].funds);
      fundsData.map((item) => {
        pieChartdata.push(item.weightage);
      });
      this.state.chartColors.map((value) => {
        //item.color = value.borderColor
        pierChartColors.push(value.borderColor);
      });
    }
    var OriginalText = language.RiskProfileResult;
    let ReplacedText = OriginalText.replace('XXXXXX', profileName);
    ReplacedText = ReplacedText.replace('XXXXXX', profileName);
    return (
      !this.props.loading && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: utility.changeHeaderColor('#FFFFFF'),
          }}>
          <View
            style={[
              styles.container,
              {backgroundColor: utility.changeHeaderColor('#f3f3f3f3')},
            ]}>
            <Header
              title={LANGUAGE.RiskProfile}
              leftImage={utility.changeCloseButton()}
              rightImage={utility.changeUploadButton()}
              backgroundColor={utility.changeHeaderColor('#ffffff')}
              redirectLeft={() =>
                this.props.navigation.navigate('MainTabbarScreen')
              }
              redirectRight={() => this.sharingOptions()}
              // onRightImagePress={this.setModalVisible}
              navigation={this.props.navigation}
            />
            <ScrollView
              style={[
                styles.viewContainer,
                {backgroundColor: utility.changeBackgroundColor('#f3f3f3')},
              ]}>
              <View
                ref="viewRef"
                collapsable={false}
                style={[
                  styles.viewScrennShot,
                  {backgroundColor: utility.changeBackgroundColor('#f3f3f3')},
                ]}>
                <Text
                  style={[
                    styles.text,
                    {
                      marginTop: 15,
                      color: utility.changeFontColor('#8bb2b5'),
                    },
                  ]}>
                  {this.state.clientName}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {color: utility.changeFontColor('#000000')},
                  ]}>
                  {language.YourRiskToleranceProfile}
                </Text>

                <Text
                  style={[
                    styles.moderateText,
                    {color: utility.changeFontColor('#8bb2b5')},
                  ]}>
                  {profileName}
                </Text>

                <View
                  style={[
                    styles.borderContainer,
                    {
                      borderBottomColor:
                        this.props.userData.night_mode === 1
                          ? '#8bb2b5'
                          : '#000',
                    },
                  ]}
                />
                <View style={{height: 20}} />
                <Text
                  style={[
                    styles.normalText,
                    {color: utility.changeFontColor('#253647')},
                  ]}>
                  {profile_description}
                  {/* based on your answers, you have a {profileName} risk tolerance investment profile. Below you can see a sample investment portfolio in USD following a {profileName.toLowerCase()} strategy. */}
                </Text>

                <View style={styles.chartView}>
                  {/* <Image source={images.CHART} style={styles.chartImg} /> */}
                  <Pie
                    radius={100}
                    innerRadius={60}
                    series={pieChartdata}
                    colors={pierChartColors}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  {this.renderText()}
                  <View style={{marginTop: 20, flex: 1}}>
                    {/* <FundList data={fundsData}
                                        navigation={this.props.navigation} /> */}
                    <FlatList data={fundsData} renderItem={this.renderItems} />
                  </View>
                  {/* {this.renderquestionAns()} */}
                  <View style={{height: 20}}></View>
                </View>
              </View>
            </ScrollView>

            {/* {
                        this.state.localImage !== '' &&
                        <View  style={{width:'100%', height:'80%',position:'absolute',  backgroundColor:'red', marginTop:70}}>
                        <Image 
                        style={{width:'60%', height:'60%', backgroundColor:'red'}}
                        resizeMode={'contain'}
                        source={{uri:this.state.localImage}}
                        />
                        </View>
                    }       */}
            <ATOMS.Loader
              isLoading={this.props.loading && this.state.uploadImage}
            />
          </View>
          <ATOMS.Loader isLoading={this.props.loadingShare} />
          <ATOMS.OfflineBar />
        </SafeAreaView>
      )
    );
  }
}
const mapStateToProps = (state) => {
  const {loading, riskProfileDetail, resourceId} = state.riskProfile;
  const {userId, userData, current_language} = state.user;
  return {
    loadingShare: state.auth.loadingShare,
    current_language,
    loading,
    resourceId,
    riskDetail: riskProfileDetail,
    userId,
    userData,
  };
};
export default connect(mapStateToProps, {
  riskProfileDetail,
  uploadImage,
  shareData,
})(RiskProfileFinalStep);
