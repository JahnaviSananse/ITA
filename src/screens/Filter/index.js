import React, { Component } from "react";
import {
  Image,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Accordian from "../../components/atoms/Accordian";
import Header from "../../components/atoms/Header/index";
import * as images from "../../resources/index";
import * as TITLE from "../../constants/titles";
import language from "../../Localization";
import styles from "./style";
import * as utility from "../../Utility/util";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      isUpdate: false,
      night_mode: false,
      clearFilter: false,
      current_language: "en",
      data: [
        {
          title: "Asset Class",
          data: [],
        },
        {
          title: "Investment Universe",
          data: [],
        },
        {
          title: "Fund Family",
          data: [],
        },
      ],
    };
    this.setCurrentValue();
  }

  setCurrentValue() {
    console.log("this.props", this.props);
    const {
      assestClass,
      investmentUniverse,
      fundFamily,
    } = this.props.route.params;
    let fundCat = this.props.configData["fund-categories"];
    let assestClassLocal = JSON.parse(JSON.stringify(fundCat["asset-class"]));
    assestClassLocal.map((value, index) => {
      value.value = assestClass.includes(value.id);
    });
    let investmentUniverseLocal = JSON.parse(
      JSON.stringify(fundCat["investment-universe"])
    );
    investmentUniverseLocal.map((value, index) => {
      value.value = investmentUniverse.includes(value.id);
    });
    let fundFamilyLocal = JSON.parse(JSON.stringify(fundCat["fund-family"]));
    fundFamilyLocal.map((value, index) => {
      value.value = fundFamily.includes(value.id);
    });
    let data = this.state.data;
    data.map((value, index) => {
      if (index === 0) {
        value.data = assestClassLocal;
      } else if (index === 1) {
        value.data = investmentUniverseLocal;
      } else {
        value.data = fundFamilyLocal;
      }
    });

    this.setState({
      data,
    });
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
    utility.recordScreen("Filter Screen");
    this.setState({ isUpdate: true });
  }
  componentWillUnmount() {
    if (this.state.isUpdate) {
      let data = this.state.data;
      let asset = [];
      let investment = [];
      let fundFamily = [];
      data[0].data.map((value, index) => {
        if (value.value) {
          asset.push(value.id);
        }
      });
      data[1].data.map((value, index) => {
        if (value.value) {
          investment.push(value.id);
        }
      });
      data[2].data.map((value, index) => {
        if (value.value) {
          fundFamily.push(value.id);
        }
      });

      let finalObject = {};
      finalObject.asset = asset;
      finalObject.investment = investment;
      finalObject.fundFamily = fundFamily;

      if (
        this.props.route &&
        this.props.route.params &&
        this.props.route.params.callback
      ) {
        this.props.route.params.callback(finalObject);
      }
    }
  }
  onClick(index) {
    utility.recordEvent(
      "Filter: Option selection from dropdown(Investment universe)"
    );
    const temp = this.state.data[1].data.slice();
    temp[index].value = !temp[index].value;
    let data = this.state.data;
    data[1].data = temp;
    this.setState({
      data,
      isUpdate: true,
    });
  }
  updateSelection(dataIndex, objectIndex) {
    let classname = dataIndex == 0 ? "Asset Class" : "Fund Family";
    utility.recordEvent(`Filter: Option selection from dropdown(${classname}`);
    const temp = this.state.data[dataIndex].data.slice();
    temp[objectIndex].value = !temp[objectIndex].value;
    let data = this.state.data;
    data[dataIndex].data = temp;
    this.setState({
      data,
      isUpdate: true,
    });
  }
  clearFilterData() {
    const {
      assestClass,
      investmentUniverse,
      fundFamily,
    } = this.props.route.params;
    let fundCat = this.props.configData["fund-categories"];
    let assestClassLocal = JSON.parse(JSON.stringify(fundCat["asset-class"]));
    assestClassLocal.map((value, index) => {
      value.value = false;
    });
    let investmentUniverseLocal = JSON.parse(
      JSON.stringify(fundCat["investment-universe"])
    );
    investmentUniverseLocal.map((value, index) => {
      value.value = false;
    });
    let fundFamilyLocal = JSON.parse(JSON.stringify(fundCat["fund-family"]));
    fundFamilyLocal.map((value, index) => {
      value.value = false;
    });
    let data = this.state.data;
    data.map((value, index) => {
      if (index === 0) {
        value.data = assestClassLocal;
      } else if (index === 1) {
        value.data = investmentUniverseLocal;
      } else {
        value.data = fundFamilyLocal;
      }
    });

    this.setState({
      data,
    });
    // this.props.navigation.goBack()
  }
  renderHeader() {
    const {
      redirectLeft,
      redirectRight,
      filterButton,
      backgroundColor,
    } = this.props;
    let bgColor = utility.changeHeaderColor("#F3F3F3");
    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: utility.changeHeaderColor("#F3F3F3"),
            // backgroundColor: bgColor
          },
        ]}
      >
        <StatusBar
          backgroundColor={utility.changeHeaderColor("#F3F3F3")}
          barStyle={
            this.props.userData.night_mode ? "light-content" : "dark-content"
          }
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.ButtonTouch}
        >
          <Text
            style={{
              color: utility.changeFontColor("#233746"),
              paddingLeft: 15,
            }}
          >
            {language.Done}
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.text, { color: utility.changeFontColor("#233746") }]}
        >
          {language.Filter}
        </Text>
        <TouchableOpacity
          onPress={() => this.clearFilterData()}
          style={styles.ButtonTouch}
        >
          <Text
            style={{
              color: utility.changeFontColor("#233746"),
              paddingRight: 15,
            }}
          >
            {language.Clear}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: utility.changeBackgroundColor("#FFFFFF") },
          ]}
        >
          {/* <Header
                        title={language.Filter}
                        backgroundColor={utility.changeHeaderColor('#F3F3F3')}
                        leftImage={utility.changeDownButton()}
                        rightImage={utility.changeDownButton()}
                        redirectLeft={() => this.props.navigation.goBack()}
                        redirectRight={() => { this.clearFilterData() }}
                    /> */}
          {this.renderHeader()}
          <ScrollView
            style={{
              backgroundColor: utility.changeBackgroundColor("transparent"),
            }}
          >
            {/* {this.renderAccordians()} */}
            <Accordian
              title={language.AssetClass}
              data={this.state.data[0].data}
              onPress={(index) => {
                this.updateSelection(0, index);
              }}
            />
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={styles.accordianHeader}
                onPress={() =>
                  this.setState({ expanded: !this.state.expanded })
                }
              >
                <Text
                  style={[
                    styles.accordianHeaderTitle,
                    {
                      backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
                      color: utility.changeFontColor("#000000"),
                    },
                  ]}
                >
                  {language.InvestmentUniverse}
                </Text>
                {this.state.expanded ? (
                  <Image
                    source={utility.changeAccordianupButton()}
                    style={styles.iconStyle}
                    resizeMode={"contain"}
                  />
                ) : (
                  <Image
                    source={utility.changeAccordianDownButton()}
                    style={styles.iconStyle}
                    resizeMode={"contain"}
                  />
                )}
              </TouchableOpacity>
              {this.state.expanded && (
                <View style={styles.countryContainer}>
                  {this.state.data[1].data.map((value, index) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.countrySelection,
                          {
                            backgroundColor:
                              value.value == false ? "#FFFFFF" : "#8cb4b6",
                          },
                        ]}
                        onPress={() => {
                          this.onClick(index);
                        }}
                      >
                        <Text
                          style={{
                            color: value.value == false ? "#6a6a6a" : "#FFFFFF",
                          }}
                        >
                          {value.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
            <Accordian
              title={language.FundFamily}
              data={this.state.data[2].data}
              onPress={(index) => {
                this.updateSelection(2, index);
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  renderAccordians = () => {
    const items = [];
    for (item of this.state.data) {
      items.push(<Accordian title={item.title} data={item.data} />);
    }
    return items;
  };
}

const mapStateToProps = (state) => {
  const { configData } = state.auth;
  const { loading, userId, userData, current_language } = state.user;
  return {
    current_language,
    configData,
    loading,
    userId,
    userData,
  };
};

export default connect(mapStateToProps, null)(Filter);
