import React, {Component} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import * as ATOMS from '../../components/atoms';
import Header from '../../components/atoms/Header';
import SelectionView from '../../components/atoms/SelectView';
import * as color from '../../constants/colors';
import LANGUAGE from '../../Localization';
import * as images from '../../resources/index';
import {riskProfileQuestionList} from '../../store/RiskProfile/actions';
import * as utility from '../../Utility/util';
import * as data from './data.json';
import * as helpRiskData from './helpRisk.json';
import styles from './style';

const LIST_WIDTH = Dimensions.get('window').width;
var ITEM_WIDTH = (Dimensions.get('window').width * 30) / 100;
var ITEM_WIDTH_IOS = (Dimensions.get('window').width * 26) / 100;
var ITEM_HEIGHT = (Dimensions.get('window').height * 17) / 100;
var ITEM_HEIGHT_IOS = (Dimensions.get('window').height * 15) / 100;
const ITEM_WIDTH_NEW = (Dimensions.get('window').width * 45) / 100;
const ITEM_HEIGHT_NEW = (Dimensions.get('window').height * 25) / 100;

var k = 0;
class RiskProfile extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      modalVisible: false,
      currentindex: 1,
      isHorizintal: true,
      localArray: [],
      newIndex: '',
      isSelected: 0,
      btnOpacity: 0.5,
      gender: '',
      verticalItemAns: '',
      questionList: [],
      newquestionList: [],
      allData: JSON.parse(JSON.stringify(data.items)),
      helpRisJson: JSON.parse(JSON.stringify(helpRiskData.data)),
      step2Ans: '',
      step10Ans: '',
      fullname: '',
      position: '',
      night_mode: false,
      current_language: 'en',
    };
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

  setModalVisible = () => {
    let data = {};
    data.title = '';
    data.file_url = this.props.configData.risk_profile_help;
    this.props.navigation.navigate('WebViewScreen', {data});
    // utility.recordEvent("Risk Profile : Modal open/close")
    // this.setState({ modalVisible: !this.state.modalVisible });
  };
  componentDidMount() {
    this.props.riskProfileQuestionList();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    utility.recordScreen('Risk Profile Screen');
  }

  onButtonPress = () => {
    //alert("back")
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    // then navigate
    //navigate('Resources');
  };
  handleBackButtonClick = () => {
    //this.props.navigation.navigate('Resources')
    this._renderSignoutAlert();
    return false;
  };
  _renderSignoutAlert() {
    Alert.alert(
      '',
      LANGUAGE.CancelRiskProfileTest,
      [
        {
          text: LANGUAGE.Cancel,
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: LANGUAGE.Yes,
          onPress: () => {
            utility.recordEvent('Risk Profile : On Close Button Pressed');
            //this.props.navigation.navigate("Resources")
            this.props.navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  }
  onChanged(text) {
    //let newText = '';
    const reg = /^([0-9])+$/;
    if (reg.test(text) === true) {
      return false;
    } else {
      //alert(text)
      this.setState({fullname: text});
    }
    //return true;
  }
  //step 10 items with grid
  renderGridItems1 = ({item, index}) => {
    //const { allData } = this.state
    let isSelected = false;
    if (allData[this.state.currentindex - 1].answer !== '') {
      let answerId = allData[this.state.currentindex - 1].answer;
      if (answerId === item.id) {
        isSelected = true;
      }
    }
    return (
      <View
        style={[
          styles.gridItemViewContainer,
          {backgroundColor: utility.changeBackgroundColor('#f3f3f3')},
        ]}>
        <SelectionView
          onPress={() => {
            let allData = this.state.allData;
            allData[this.state.currentindex - 1].answer = item.id;
            this.setState({
              allData,
              step10Ans: item.id,
            });
          }}
          bgColor={isSelected ? this.renderSelectionColor() : color.WHITE}
          txtColor={isSelected ? color.WHITE : color.BLUE}
          itemWidth={ITEM_WIDTH_NEW}
          itemHeight={ITEM_HEIGHT_NEW}
          text={item.answer}
        />
      </View>
    );
  };
  renderGridItems = ({item, index}) => {
    let isSelected = false;
    let answerId = this.props.questionList[this.state.currentindex - 1].ans;
    if (answerId === item.id) {
      isSelected = true;
    }
    //}
    return (
      <View style={styles.gridItemViewContainer}>
        <SelectionView
          onPress={() => {
            utility.recordEvent(
              'Risk Profile : ' + item.answer + ' ' + 'Pressed',
            );
            this.props.questionList[this.state.currentindex - 1].ans = item.id;
            this.setState({
              step10Ans: item.id,
            });
          }}
          bgColor={isSelected ? this.renderSelectionColor() : color.WHITE}
          txtColor={isSelected ? color.WHITE : color.BLUE}
          itemWidth={ITEM_WIDTH_NEW}
          itemHeight={ITEM_HEIGHT_NEW}
          text={item.answer}
        />
      </View>
    );
  };
  renderBottomComponentGrid() {
    let data = this.props.questionList[this.state.currentindex - 1];
    return (
      <View style={[styles.gridItemContainer, {width: '90%'}]}>
        <ATOMS.Button
          title={LANGUAGE.Calculate}
          isDisable={data.ans === 0 ? true : false}
          onPress={() => {
            utility.recordEvent(
              'Risk Profile : ' +
                this.state.currentindex +
                ' ' +
                LANGUAGE.Calculate +
                ' button Pressed',
            );
            //
            if (this.state.currentindex == this.props.questionList.length) {
              let total = 0;
              this.props.questionList.map((item) => {
                item.answers.map((value) => {
                  if (value.id == item.ans) {
                    total = value.weightage + total;
                    //console.log("ID ==>  " + value.id + "count ===>" + value.weightage)
                  }
                });
              });
              //console.log("Total count ===>" + total)
              //AsyncStorage.setItem('totlaCount', total)
              this.props.navigation.navigate('RiskProfileFinalStep', {
                totalCount: total,
                clientName: this.state.fullname,
              });
            } else {
              this.state.newIndex = this.state.newIndex + 1;
              this.flatListRef.scrollToIndex({
                index: this.state.currentindex,
                animated: true,
              });
              this.setState({
                isHorizintal: false,
                currentindex: this.state.newIndex + 1,
              });
            }
          }}
        />
        <View style={styles.addView}></View>
      </View>
    );
  }
  renderBottomComponent() {
    let data = this.props.questionList[this.state.currentindex - 1];
    return (
      <View style={styles.childItemsContainer}>
        <ATOMS.Button
          title={LANGUAGE.Continue}
          isDisable={data.ans === 0 ? true : false}
          onPress={() => {
            utility.recordEvent(
              'Risk Profile : ' +
                this.state.currentindex +
                ' ' +
                LANGUAGE.Continue +
                ' button Pressed',
            );
            if (this.state.currentindex !== this.props.questionList.length) {
              this.state.newIndex = this.state.newIndex + 1;
              this.flatListRef.scrollToIndex({
                index: this.state.currentindex,
                animated: true,
              });
              this.setState({
                isHorizintal: false,
                currentindex: this.state.newIndex + 1,
              });
            }
          }}
        />
        <View style={styles.addView}></View>
      </View>
    );
  }
  renderSelectionColor() {
    let color1 = color.BLUE;
    if (this.props.userData.night_mode === 1) {
      color1 = '#97BCBE';
    }
    return color1;
  }

  //step 4 ,6 ,7 8, 9 vertical items
  renderchildItems1 = ({item, index}) => {
    const isSelected = false;
    let answerId = this.props.questionList[this.state.currentindex - 1].ans;
    if (answerId === item.id) {
      isSelected = true;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          //let allData = this.props.questionList
          this.props.questionList[this.state.currentindex - 1].ans = item.id;
          this.setState({
            verticalItemAns: item.id,
          });
        }}
        style={[
          styles.verticalItemContainer,
          {
            backgroundColor: isSelected
              ? this.renderSelectionColor()
              : color.WHITE,
          },
        ]}>
        <Text
          style={[
            styles.verticalFlatListTextContainer,
            {
              color: isSelected ? color.WHITE : color.BLUE,
            },
          ]}>
          {item.answer}
        </Text>
      </TouchableOpacity>
    );
    // }
  };
  renderchildItems = ({item, index}) => {
    let isSelected = false;
    let answerId = this.props.questionList[this.state.currentindex - 1].ans;
    if (answerId === item.id) {
      isSelected = true;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          utility.recordEvent(
            'Risk Profile : ' + item.answer + ' ' + 'Pressed',
          );
          this.props.questionList[this.state.currentindex - 1].ans = item.id;
          this.setState({
            verticalItemAns: item.id,
          });
        }}
        style={[
          styles.verticalItemContainer,
          {
            backgroundColor: isSelected
              ? this.renderSelectionColor()
              : color.WHITE,
          },
        ]}>
        <Text
          style={[
            styles.verticalFlatListTextContainer,
            {
              color: isSelected ? color.WHITE : color.BLUE,
            },
          ]}>
          {item.answer}
        </Text>
      </TouchableOpacity>
    );
    // }
  };

  //step 1, 2, 3, 5 items are rendering
  renderItems = ({item, index}) => {
    var weightage = 0;
    // setTimeout(() => {
    //     alert(JSON.stringify(tempticket))
    // }, 1000)
    // this.setState({
    //     answers: tempticket
    // })

    //  set the direction of data which will be set vertically or horizontally,
    // if vertically set than flatlist render otherwise set row data
    if (item.options_display === 'small_square') {
      var direction = 'row';
    } else if (item.options_display === 'rectangle') {
      var direction = 'column';
    }

    if (item.options_display === 'textField') {
      //item.answer = this.state.gender
      return (
        <View style={[styles.headerViewContainer, {width: LIST_WIDTH}]}>
          <Text
            style={[
              styles.titleContainer,
              {color: utility.changeFontColor('#000000')},
            ]}>
            {item.question}
          </Text>
          <View style={styles.borderContainer} />

          <View style={styles.firstStepContainer}>
            <View style={{width: '80%'}}>
              <ATOMS.TextField
                style={{fontSize: 20}}
                label={LANGUAGE.EnterClientName}
                labelTextStyle={styles.placeHolderContainer}
                titleTextStyle={styles.textContainer}
                value={this.state.fullname}
                onChangeText={(text) => this.onChanged(text)}
                tintColor={color.BLUE}
                textColor={color.BLUE}
                inputContainerPadding={10}
              />
            </View>

            <View style={styles.buttonViewContainer}>
              <ATOMS.Button
                title={LANGUAGE.Continue}
                isDisable={this.state.fullname === '' ? true : false}
                onPress={() => {
                  index = index + 1;
                  this.flatListRef.scrollToIndex({
                    index: this.state.currentindex,
                    animated: true,
                  });
                  this.setState({
                    isHorizintal: false,
                    currentindex: index + 1,
                    newIndex: index,
                  });
                }}
              />
            </View>
          </View>
        </View>
      );
    }

    //if ((item.options_display) === 'small_square') {

    if (item.options_display === 'small_square') {
      return (
        <View style={[styles.headerViewContainer, {width: LIST_WIDTH}]}>
          <Text
            style={[
              styles.titleContainer,
              {color: utility.changeFontColor('#000000')},
            ]}>
            {item.question}
          </Text>
          <View style={styles.borderContainer} />
          <View
            style={[
              styles.viewRowContainer,
              {
                flexDirection: direction,
              },
            ]}>
            <SelectionView
              onPress={() => {
                item.ans = item.answers[0].id;
                this.setState({
                  isSelected: item.answers[0].id,
                  step2Ans: item.answers[0].id,
                });
                utility.recordEvent(
                  'Risk Profile : ' + item.answers[0].answer + ' Pressed',
                );
              }}
              bgColor={
                item.ans === item.answers[0].id
                  ? this.renderSelectionColor()
                  : color.WHITE
              }
              txtColor={
                item.ans === item.answers[0].id ? color.WHITE : color.BLUE
              }
              itemWidth={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              itemHeight={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              text={item.answers[0].answer}
              // middletext={item.answers[0].answer}
              // bottomText={item.answers[0].answer}
            />
            <View style={{width: 7}} />
            <SelectionView
              onPress={() => {
                item.ans = item.answers[1].id;
                this.setState({
                  isSelected: item.answers[1].id,
                  step2Ans: item.answers[1].id,
                });
                utility.recordEvent(
                  'Risk Profile : ' + item.answers[1].answer + ' Pressed',
                );
              }}
              bgColor={
                item.ans === item.answers[1].id
                  ? this.renderSelectionColor()
                  : color.WHITE
              }
              txtColor={
                item.ans === item.answers[1].id ? color.WHITE : color.BLUE
              }
              itemWidth={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              itemHeight={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              text={item.answers[1].answer}
              // middletext={item.data[1].age}
              // bottomText={item.data[1].old}
            />
            <View style={{width: 7}} />
            <SelectionView
              onPress={() => {
                item.ans = item.answers[2].id;
                this.setState({
                  isSelected: item.answers[2].id,
                  step2Ans: item.answers[2].id,
                });
                utility.recordEvent(
                  'Risk Profile : ' + item.answers[2].answer + ' Pressed',
                );
              }}
              bgColor={
                item.ans === item.answers[2].id
                  ? this.renderSelectionColor()
                  : color.WHITE
              }
              txtColor={
                item.ans === item.answers[2].id ? color.WHITE : color.BLUE
              }
              itemWidth={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              itemHeight={Platform.OS === 'ios' ? ITEM_WIDTH_IOS : ITEM_WIDTH}
              text={item.answers[2].answer}
              // middletext={item.data[2].age}
              // bottomText={item.data[2].old}
            />
          </View>
          <View style={styles.buttonViewContainer}>
            <ATOMS.Button
              title={LANGUAGE.Continue}
              isDisable={item.ans === 0 ? true : false}
              onPress={() => {
                utility.recordEvent(
                  'Risk Profile : ' +
                    item.question +
                    ' ' +
                    LANGUAGE.Continue +
                    ' button Pressed',
                );
                //if (index < data.items.length - 1) {

                index = index + 1;
                this.flatListRef.scrollToIndex({
                  index: this.state.currentindex,
                  animated: true,
                });
                this.setState({
                  isHorizintal: false,
                  currentindex: index + 1,
                  newIndex: index,
                  step2Ans: '',
                });
                //}
              }}
            />
          </View>
        </View>
      );
    }
    if (item.options_display === 'rectangle') {
      return (
        <View style={[styles.headerViewContainer, {width: LIST_WIDTH}]}>
          <Text
            style={[
              styles.titleContainer,
              {color: utility.changeFontColor('#000000')},
            ]}>
            {item.question}
          </Text>
          <View style={styles.borderContainer} />
          <ScrollView>
            <View style={{flex: 1}}>
              <FlatList
                style={styles.flatListContainer}
                data={item.answers}
                scrollEnabled={true}
                ListFooterComponent={this.renderBottomComponent(item.answers)}
                renderItem={this.renderchildItems}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
    // }

    if (item.options_display === 'large_square') {
      return (
        <View style={[styles.headerViewContainer, {width: LIST_WIDTH}]}>
          <Text
            style={[
              styles.titleContainer,
              {color: utility.changeFontColor('#000000')},
            ]}>
            {item.question}
          </Text>
          <View style={styles.borderContainer} />
          <ScrollView>
            <View style={{width: '100%'}}>
              <FlatList
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginRight: 10,
                }}
                style={styles.gridFlatListContainer}
                data={item.answers}
                renderItem={this.renderGridItems}
                ListFooterComponent={this.renderBottomComponentGrid()}
                numColumns={2}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  renderText() {
    return this.state.helpRisJson.map((item) => (
      <View style={{backgroundColor: utility.changeBackgroundColor('#FFFFFF')}}>
        <Text
          style={[
            styles.modalQuestionText,
            {color: utility.changeFontColor('#000000')},
          ]}>
          {item.question}
        </Text>
        <Text
          style={[
            styles.modalText,
            {color: utility.changeFontColor('#000000')},
          ]}>
          {item.ans}
        </Text>
      </View>
    ));
  }
  renderModal() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle={'fullScreen'}
          visible={this.state.modalVisible}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: utility.changeHeaderColor('#F3F3F3'),
            }}>
            <View>
              <Header
                leftImage={images.FILTER_DOWN}
                redirectLeft={this.setModalVisible}
                navigation={this.props.navigation}
                backgroundColor={utility.changeHeaderColor('#F3F3F3')}
              />
              <ScrollView
                style={[
                  styles.modalContainer,
                  {backgroundColor: utility.changeBackgroundColor('#FFFFFF')},
                ]}
                contentContainerStyle={{paddingBottom: 50}}>
                {this.renderText()}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }

  render() {
    //alert(JSON.stringify(this.props.questionList.questions))
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor('#ffffff'),
        }}>
        <View
          style={[
            styles.container,
            {backgroundColor: utility.changeHeaderColor('#f3f3f3f3')},
          ]}>
          <Header
            title={LANGUAGE.RiskProfile}
            leftImage={utility.changeCloseButton()}
            rightImage={utility.changeHelpButton()}
            backgroundColor={utility.changeHeaderColor('#ffffff')}
            redirectLeft={() => this._renderSignoutAlert()}
            redirectRight={this.setModalVisible}
            navigation={this.props.navigation}
          />

          {this.renderModal()}
          <View style={{flex: 1}}>
            <FlatList
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              style={{width: LIST_WIDTH, height: '100%'}}
              data={this.props.questionList.questions}
              horizontal={true}
              renderItem={this.renderItems}
              legacyImplementation={true}
              scrollEnabled={false}
              keyExtractor={(value, index) => String(index)}
            />
          </View>

          <View style={styles.viewContainer}>
            <Text
              style={[
                styles.text,
                {color: utility.changeFontColor('#000000')},
              ]}>
              {LANGUAGE.Step +
                ' ' +
                this.state.currentindex +
                ' / ' +
                this.props.questionList.length}
            </Text>
            {this.state.currentindex === 1 ? (
              <View></View>
            ) : (
              <TouchableOpacity
                style={styles.actionButtonIcon}
                onPress={() => {
                  utility.recordEvent('Risk Profile : Back button Pressed');
                  this.setState({
                    currentindex: this.state.currentindex - 1,
                    newIndex: this.state.currentindex - 2,
                  });
                  this.flatListRef.scrollToIndex({
                    index: this.state.currentindex - 2,
                    animated: true,
                  });
                }}>
                <FastImage
                  source={images.FLOATING}
                  style={styles.actionButtonImg}></FastImage>
              </TouchableOpacity>
            )}
            <FlatList
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              style={{width: LIST_WIDTH, height: '100%'}}
              data={this.props.questionList}
              horizontal={true}
              renderItem={this.renderItems}
              legacyImplementation={true}
              scrollEnabled={false}
              keyExtractor={(value, index) => String(index)}
            />
          </View>
          <ATOMS.Loader isLoading={this.props.loading} />
        </View>
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {loading, riskProfileQuestionList, resourceId} = state.riskProfile;
  const {userId, userData, current_language} = state.user;
  const {configData} = state.auth;
  return {
    configData,
    current_language,
    loading,
    questionList: riskProfileQuestionList,
    resourceId,
    userId,
    userData,
  };
};
export default connect(mapStateToProps, {riskProfileQuestionList})(RiskProfile);
