import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "react-native-underline-tabbar";
import * as ATOMS from "../../components/atoms";
import FundList from "../../components/atoms/FundList";
import styles from "./style";
import Header from "../../components/atoms/Header/index";
import language from "../../Localization";
import * as utility from "../../Utility/util";
import { connect } from "react-redux";
import { getFund } from "../../store/Fund/actions";
import FastImage from "react-native-fast-image";
import * as IMG from "../../resources/index";

class Fund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency_code: "",
      paged: 1,
      currencies: [],
      assestClass: [],
      investmentUniverse: [],
      fundFamily: [],
      searchText: "",
      isSearchEnable: false,
    };
    setTimeout(() => {
      this.getCurrency();
    }, 100);
  }
  getCurrency() {
    let currencies = this.props.configData.currencies;
    console.log("Currencies", this.props.configData);
    this.state.currency_code = currencies[0].currency_code;
    this.setState({
      currency_code: currencies[0].currency_code,
      currencies,
    });
  }
  componentDidUpdate(prevProps, prevState) {}
  getFund() {
    const {
      assestClass,
      investmentUniverse,
      fundFamily,
      currency_code,
      paged,
    } = this.state;

    let request = {};
    request.currency_code = currency_code;
    request.paged = paged;
    if (assestClass.length > 0) {
      request.asset_class = assestClass.toString();
    }
    if (investmentUniverse.length > 0) {
      request.investment_universe = investmentUniverse.toString();
    }
    if (fundFamily.length > 0) {
      request.fund_family = fundFamily.toString();
    }

    if (this.state.searchText.trim().length > 0) {
      request.search_string = this.state.searchText;
    }
    this.props.getFund(request);
  }
  componentWillMount() {
    utility.recordScreen("Fund Platform Screen");
  }
  updateFilter(filter) {
    utility.recordEvent("FundPlafform : updateFilter");
    let assestClass = JSON.parse(JSON.stringify(filter.asset));
    let investmentUniverse = JSON.parse(JSON.stringify(filter.investment));
    let fundFamily = JSON.parse(JSON.stringify(filter.fundFamily));

    this.state.assestClass = assestClass;
    this.state.investmentUniverse = investmentUniverse;
    this.state.fundFamily = fundFamily;
    this.state.paged = 0;
    this.getFund();
  }
  onFilterClick() {
    const { assestClass, investmentUniverse, fundFamily } = this.state;

    utility.recordEvent("FundPlafform : On Filter button click");
    this.props.navigation.push("Filter", {
      callback: this.updateFilter.bind(this),
      assestClass,
      investmentUniverse,
      fundFamily,
    });
  }

  renderSearchbar() {
    if (this.state.isSearchEnable === false) return null;

    return (
      <View
        style={[
          styles.viewStyle,
          { backgroundColor: utility.changeHeaderColor("#E7E8E9") },
        ]}
      >
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: utility.changeHeaderColor("#E7E8E9") },
          ]}
        >
          <View style={styles.searchbarContainer}>
            <View style={styles.iconContainer}>
              <FastImage source={IMG.SEARCH} style={styles.icon} />
            </View>
            <TextInput
              placeholder={language.SEARCHINFUND}
              style={styles.textFieldContainer}
              onChangeText={(searchText) => this.setState({ searchText })}
              value={this.state.searchText}
              returnKeyType="search"
              onSubmitEditing={() => {
                this.state.paged = 0;
                this.getFund();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ searchText: "" });
              }}
              style={styles.clearButton}
            >
              {this.state.searchText !== "" && (
                <Image style={{ height: 20, width: 20 }} source={IMG.CLEAR} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isSearchEnable: false,
                searchText: "",
              });
              setTimeout(() => {
                this.state.paged = 0;
                this.getFund();
              }, 100);
            }}
            style={styles.cancelButtonContainer}
          >
            <Text style={styles.cancelText}>{language.Cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    let filterCount =
      this.state.assestClass.length +
      this.state.investmentUniverse.length +
      this.state.fundFamily.length;
    let top = Platform.OS === "ios" ? 58 : 61;
    if (this.state.isSearchEnable) {
      top = top + 60;
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: utility.changeHeaderColor("#F3F3F3"),
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              backgroundColor: utility.changeBackgroundColor("#E2E2E2"),
            }}
          >
            <Header
              title={language.FundPlatform}
              leftImage={utility.changeBackButton()}
              rightImage={utility.changeSearchButton()}
              backgroundColor={utility.changeHeaderColor("#F3F3F3")}
              redirectLeft={() => this.props.navigation.goBack()}
              redirectRight={() => {
                this.setState({ isSearchEnable: !this.state.isSearchEnable });
                this.setState({ searchText: "" });
              }}
            />
            {this.renderSearchbar()}
            <ScrollableTabView
              onChangeTab={(index, ref) => {
                let current = index.i;
                this.state.paged = 1;
                let currencies = this.props.configData.currencies;
                this.state.currency_code = currencies[current].currency_code;
                this.setState({
                  currency_code: currencies[current].currency_code,
                });

                this.getFund();
              }}
              style={{ margintop: 0, marginHorizontal: 5 }}
              tabBarActiveTextColor={utility.changeFontColor("#000000")}
              tabBarInactiveTextColor={utility.changeFontColor("#696969")}
              renderTabBar={() => (
                <TabBar
                  style={{ borderBottomWidth: 0 }}
                  underlineColor={utility.changeFontColor("#93b1b4")}
                />
              )}
            >
              {this.state.currencies.map((value, index) => {
                return (
                  <View tabLabel={{ label: `${value.display_name}` }}>
                    <View
                      style={[
                        styles.containerList,
                        {
                          backgroundColor: utility.changeBackgroundColor(
                            "#E2E2E2"
                          ),
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.fundCell,
                          {
                            backgroundColor: utility.changeBackgroundColor(
                              "#E2E2E2"
                            ),
                          },
                        ]}
                      >
                        <FundList
                          data={this.props.fund}
                          navigation={this.props.navigation}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollableTabView>
            {this.props.loading === false && this.props.fund.length === 0 && (
              <View
                pointerEvents={"none"}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ATOMS.PlaceholderView bgColor={"transparent"} />
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  top,
                },
              ]}
              onPress={() => this.onFilterClick()}
            >
              <FastImage
                style={{ height: 22, width: 22 }}
                source={utility.changeFilterButton()}
              />
              {filterCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    top: 5,
                    left: 5,
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {filterCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <ATOMS.Loader isLoading={this.props.loading} />
        <ATOMS.OfflineBar />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { configData } = state.auth;
  const { fund, loading } = state.fund;
  const { userId } = state.user;
  console.log("congifDAta", configData);
  return {
    configData,
    userId,
    fund,
    loading,
  };
};

export default connect(mapStateToProps, {
  getFund,
})(Fund);
