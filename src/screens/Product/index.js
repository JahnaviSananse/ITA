import React, { Component } from 'react';
import { Dimensions, SafeAreaView, View, Text } from 'react-native';
import * as COLOR from '../../constants/colors';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import * as ATOMS from '../../components/atoms';
import Grid from '../../components/atoms/FlatGrid';
import Header from '../../components/atoms/Header/index';
import * as images from '../../resources/index';
import * as TITLE from '../../constants/titles';
import * as fonts from '../../constants/fonts/index';
import language from '../../Localization';
import * as utility from '../../Utility/util';
import styles from './style';
import { getProduct, getProductLoadMore, getProductPullToRefresh } from '../../store/Products/actions';
import { setRecent } from '../../store/User/actions';
import { connect } from 'react-redux';
class Product extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			category_id: '',
			paged: 1,
			category: [],
			night_mode: false,
			isLoadMore: false,
			current_language: 'en'
		};
		setTimeout(() => {
			this.state.category = this.props.navigation.getParam('category');
			this.state.title = this.props.navigation.getParam('headerTitle');
			this.state.paged = 1;
			this.state.category_id = this.state.category[0].id;
			this.getProduct();
		}, 100);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.userData !== this.props.userData) {
			if (this.props.loading !== true) {
				this.setState({
					night_mode: this.props.userData.night_mode === 1 ? true : false,
					current_language: this.props.userData.current_language
				});
			}
		}
	}
	componentWillMount() {
		utility.recordScreen('Product List Screen');
	}

	getPullToRefresh() {
		utility.recordEvent('ProductList : getProductPullToRefresh');
		let request = {};
		request.category_id = this.state.category_id;
		request.paged = this.state.paged;
		this.props.getProductPullToRefresh(request);
	}
	getProduct() {
		utility.recordEvent('ProductList : getProduct');
		let request = {};
		request.category_id = this.state.category_id;
		request.paged = this.state.paged;
		this.props.getProduct(request);
	}
	getProductLoadMore() {
		utility.recordEvent('SocialPost : getProduct');
		let request = {};
		request.category_id = this.state.category_id;
		request.paged = this.state.paged;
		this.props.getProductLoadMore(request);
	}
	render() {
		const TYPE = {
			SOCIAL: 'socialPosts',
			PRODUCTS: 'products',
			PROFILE: 'profile'
		};
		const headerTitle = this.props.headerTitle;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View style={{ flex: 1, backgroundColor: utility.changeBackgroundColor('#FFFFFF') }}>
					<Header
						title={this.state.title}
						leftImage={utility.changeBackButton()}
						rightImage={utility.changeSearchButton()}
						backgroundColor={utility.changeHeaderColor('#F3F3F3')}
						redirectLeft={() => this.props.navigation.goBack()}
						redirectRight={() =>
							this.props.navigation.navigate('SearchScreen', { placeholder: language.Products })}
					/>
					<View style={{ backgroundColor: utility.changeBackgroundColor('#FFFFFF'), flex: 1 }}>
						<ScrollableTabView
							onChangeTab={(index, ref) => {
								let current = index.i;
								this.state.paged = 1;
								this.state.category_id = this.state.category[current].id;
								this.getProduct();
								this.state.paged = 2;
								this.state.isLoadMore = false;
							}}
							tabBarActiveTextColor={utility.changeFontColor('#000000')}
							tabBarInactiveTextColor={utility.changeFontColor('#696969')}
							renderTabBar={() => (
								<TabBar
									underlineColor={utility.changeFontColor('#93b1b4')}
									style={{ borderBottomWidth: 0 }}
								/>
							)}
						>
							{this.state.category.map((item) => (
								<View tabLabel={{ label: item.name }}>
									<View
										style={{
											height: '100%',
											backgroundColor: utility.changeBackgroundColor('#FFFFFF')
										}}
									>
										{this.props.product == '' ? (
											<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
										) : (
											<Grid
												type={TYPE.PRODUCTS}
												data={this.props.product}
												allowedLoadMore={true}
												enablePull={true}
												loadingPull={this.props.pullToRefresh}
												pullToRefresh={() => {
													this.state.paged = 1;
													this.getPullToRefresh();
													this.state.paged = 2;
													this.state.isLoadMore = false;
												}}
												onLoadMore={() => {
													if (this.state.isLoadMore) {
														return;
													}
													this.state.isLoadMore = true;
													setTimeout(() => {
														if (!this.props.loading && this.props.isLoadMore) {
															this.getProductLoadMore();
															setTimeout(() => {
																this.state.paged = this.state.paged + 1;
																this.state.isLoadMore = false;
															}, 100);
														} else {
															this.state.isLoadMore = false;
														}
													}, 1000);
												}}
												onPress={(item) => {
													this.props.setRecent({ post_id: item.post_id });
													this.props.navigation.navigate('WebViewScreen', { data: item });
												}}
											/>
										)}
									</View>
								</View>
							))}
						</ScrollableTabView>
						{this.props.loading === false &&
						this.props.product.length === 0 && (
							<View
								pointerEvents={'none'}
								style={{
									position: 'absolute',
									width: '100%',
									height: '100%',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<ATOMS.PlaceholderView bgColor={'transparent'} />
							</View>
						)}
					</View>

					<ATOMS.Loader isLoading={this.props.loading} />
				</View>
				<ATOMS.OfflineBar />
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => {
	const { configData } = state.auth;
	const { product, loading, isLoadMore, pullToRefresh } = state.product;
	const { userId, userData, current_language } = state.user;
	return {
		pullToRefresh,
		isLoadMore,
		current_language,
		configData,
		product,
		loading,
		userId,
		userData
	};
};

export default connect(mapStateToProps, {
	getProduct,
	getProductLoadMore,
	getProductPullToRefresh,
	setRecent
})(Product);
