/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
	StyleSheet,
	ActivityIndicator,
	View,
	FlatList,
	RefreshControl,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import * as CONSTANT from '../../../constants/constant';
import styles from './style';
import FastImage from 'react-native-fast-image';
import * as utility from '../../../Utility/util';
import { connect } from 'react-redux';
//import all the components we will need

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	renderTopGrid() {
		let gridWidth = (CONSTANT.SCREEN_WIDTH - 100)
		//let coverImgHeight = gridWidth
		let gridHeight = gridWidth / 2
		return (
			<View style={styles.SocialTopGrid}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					{
						this.props.data.length > 1 &&

						<TouchableOpacity
							onPress={() => {
								if (this.props.data[1]) {
									this.props.onPress(this.props.data[1]);
								}
							}}
							style={[styles.TopGridSmallImage, {
								height: gridHeight
							}]}
						>
							<View
								style={[
									styles.SocialTopGridImage,
									{
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute'
									}
								]}
							>
								<ActivityIndicator size="small" />
							</View>
							<FastImage style={styles.SocialTopGridImage} source={{ uri: this.props.data[1].image }} />
						</TouchableOpacity>
					}
					{
						this.props.data.length > 2 &&

						<TouchableOpacity
							onPress={() => {
								if (this.props.data[2]) {
									this.props.onPress(this.props.data[2]);
								}
							}}
							style={[styles.TopGridSmallImage, { height: gridHeight }]}
						>
							<View
								style={[
									styles.SocialTopGridImage,
									{
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute'
									}
								]}
							>
								<ActivityIndicator size="small" />
							</View>

							<FastImage style={styles.SocialTopGridImage} source={{ uri: this.props.data[2].image }} />
						</TouchableOpacity>
					}
				</View>
				<TouchableOpacity
					onPress={() => {
						if (this.props.data[0]) {
							this.props.onPress(this.props.data[0]);
						}
					}}
					style={{ flex: 2, margin: 1 }}
				>
					<View
						style={[
							styles.SocialTopGridImage,
							{
								justifyContent: 'center',
								alignItems: 'center',
								position: 'absolute'
							}
						]}
					>
						<ActivityIndicator size="small" />
					</View>
					<FastImage style={styles.SocialTopGridImage} source={{ uri: this.props.data[0].image }} />
				</TouchableOpacity>
			</View>
		);
	}
	renderProduct(item, index) {
		let gridWidth = (CONSTANT.SCREEN_WIDTH - 40) / 3;
		const { img } = this.props;
		let paddingTop = 0;
		return (
			<View style={{ paddingTop: 15 }}>
				<View
					style={[
						styles.imageThumbnail,
						{
							marginTop: paddingTop,
							width: gridWidth - 2,
							height: gridWidth + 30,
							position: 'absolute',
							justifyContent: 'center',
							alignItems: 'center'
						}
					]}
				>
					<ActivityIndicator size="small" />
				</View>
				<FastImage
					resizeMode={'stretch'}
					source={{ uri: item.thumbnail_image }}
					style={[
						styles.imageThumbnail,
						{ marginTop: paddingTop, width: gridWidth - 2, height: gridWidth + 30 }
					]}
				/>
				<Text style={[styles.itemTitle, { width: gridWidth, color: utility.changeFontColor('#1F3645') }]}>
					{item.title}
				</Text>
			</View>
		);
	}
	renderSocialPost(item, index) {
		const { type, img, isCoverImage } = this.props;
		let gridWidth = (CONSTANT.SCREEN_WIDTH - 40) / 3;
		let paddingTop = 0;
		let showTopGrid = false;
		let isCoverRow = false;
		if (isCoverImage === true && index < 3) {
			isCoverRow = true;
		}
		return (
			<View style={{ paddingTop: 2 }}>
				{isCoverRow ? (
					this.renderTopGrid()
				) : (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								this.props.onPress(item);
							}}
						>
							<View
								style={[
									styles.imageThumbnail,
									{
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute',
										paddingTop: paddingTop,
										width: gridWidth + 11,
										height: gridWidth + 10
									}
								]}
							>
								<ActivityIndicator size="small" />
							</View>
							<FastImage
								style={[
									styles.imageThumbnail,
									{ paddingTop: paddingTop, width: gridWidth + 11, height: gridWidth + 10 }
								]}
								source={{ uri: item.image }}
							/>
						</TouchableOpacity>
					)}
			</View>
		);
	}
	renderProfile(item, index) {
		const { type, img } = this.props;
		let gridWidth = (CONSTANT.SCREEN_WIDTH - 45) / 3;
		let paddingTop = 20
		return (
			<View>
				<View
					style={[
						styles.imageThumbnail,
						{
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							paddingTop: paddingTop,
							width: gridWidth + 11,
							height: gridWidth + 10
						}
					]}
				>
					<ActivityIndicator size="small" />
				</View>
				<FastImage
					style={[
						styles.imageThumbnail,
						{ margin: 5, width: gridWidth - 5, height: gridWidth + 5 }
					]}
					// source={img}
					source={{ uri: item.image }}
				/>
			</View>
		);
	}
	onRefresh() {
		this.props.pullToRefresh();
	}
	render() {
		//type: 1) product 2) Profile - Recent 3) Social Posts 4) Evolution
		const { type, data } = this.props;
		const TYPE = {
			SOCIAL: 'socialPosts',
			PRODUCTS: 'products',
			PROFILE: 'profile'
		};
		return (
			<View style={[styles.MainContainer, { marginHorizontal: type == TYPE.SOCIAL ? 2 : 15 }]}>
				<FlatList
					// style={{ paddingTop: 10 }}
					refreshControl={
						<RefreshControl refreshing={this.props.loadingPull} onRefresh={this.onRefresh.bind(this)} />
					}
					showsVerticalScrollIndicator={false}
					data={data}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							activeOpacity={type == TYPE.SOCIAL ? 1.0 : 0.8}
							onPress={() => {
								if (type == TYPE.SOCIAL) {
									return;
								}
								this.props.onPress(item);
							}}
						>
							{type == TYPE.SOCIAL ? (
								this.renderSocialPost(item, index)
							) : type == TYPE.PRODUCTS ? (
								this.renderProduct(item, index)
							) : (
										this.renderProfile(item, index)
									)}
						</TouchableOpacity>
					)}
					onEndReachedThreshold={0.4}
					onEndReached={() => {
						if (this.props.allowedLoadMore) {
							this.props.onLoadMore();
						}
					}}
					//Setting the number of column
					numColumns={3}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { userData } = state.user;
	return {
		userData,
	};
};

export default connect(mapStateToProps, null)(App);
