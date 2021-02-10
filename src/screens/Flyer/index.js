import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../store/Auth/actions';
import * as COLOR from '../../constants/colors';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import Grid from '../../components/atoms/FlatGrid';
import Header from '../../components/atoms/Header/index';
import * as images from '../../resources/index';
import * as TITLE from '../../constants/titles';
import language from '../../Localization';
import * as utility from '../../Utility/util';
import styles from './style';

export default class Flyer extends Component {
	constructor() {
		super();
		this.state = {
			data: [
				{ title: 'Access Portfolio' },
				{ title: 'Advanced  Online Platform' },
				{ title: 'Cayman Islands' },
				{ title: 'Port Rico Key Facts' },
				{ title: 'Fixed Income Regular Saving' }
			]
		};
	}
	componentWillMount() {
		utility.recordScreen('Flyer List Screen');
	}
	onFlyerClick() {
		utility.recordEvent('Flyers : On Flyer Selection');
		this.props.navigation.navigate('WebViewScreen', { title: language.Flyer });
	}
	render() {
		const TYPE = {
			SOCIAL: 'socialPosts',
			PRODUCTS: 'products',
			PROFILE: 'profile'
		};
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={{ flex: 1, backgroundColor: utility.changeBackgroundColor('#FFFFFF') }}>
					<Header
						title={language.Flyer}
						leftImage={utility.changeBackButton()}
						rightImage={utility.changeSearchButton()}
						navigation={this.props.navigation}
						backgroundColor={utility.changeHeaderColor('#F3F3F3')}
						redirectLeft={() => this.props.navigation.goBack()}
						redirectRight={() =>
							this.props.navigation.push('SearchScreen', { placeholder: language.Flyer })}
					/>
					<ScrollableTabView
						tabBarActiveTextColor={utility.changeFontColor('#000000')}
						tabBarInactiveTextColor={utility.changeFontColor('#696969')}
						renderTabBar={() => (
							<TabBar
								underlineColor={utility.changeFontColor('#93b1b4')}
								style={{ borderBottomWidth: 0 }}
							/>
						)}
					>
						<View tabLabel={{ label: language.SalesFlyer }}>
							<View style={{ height: '100%' }}>
								<Grid
									type={TYPE.PRODUCTS}
									img={require('../../resources/flyer.png')}
									data={this.state.data}
									onPress={() => this.onFlyerClick()}
								/>
							</View>
						</View>

						<View tabLabel={{ label: language.Adverts }}>
							<View style={{ height: '100%' }}>
								<Grid
									type={TYPE.PRODUCTS}
									img={require('../../resources/flyer.png')}
									data={this.state.data}
									onPress={() => this.onFlyerClick()}
								/>
							</View>
						</View>

						<View tabLabel={{ label: language.Guide }}>
							<View style={{ height: '100%' }}>
								<Grid
									type={TYPE.PRODUCTS}
									img={require('../../resources/flyer.png')}
									data={this.state.data}
									onPress={() => this.onFlyerClick()}
								/>
							</View>
						</View>
					</ScrollableTabView>
				</View>
				<ATOMS.OfflineBar />
			</SafeAreaView>
		);
	}
}
