import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Text, Alert, Image, AsyncStorage } from 'react-native';
import styles from './style';
import TabHeader from '../../components/atoms/TabHeader';
import * as ATOMS from '../../components/atoms';
import * as images from '../../resources/index';
import * as TITLE from '../../constants/titles';
import * as color from '../../constants/colors';

import language from '../../Localization';
import * as utility from '../../Utility/util';
import FastImage from 'react-native-fast-image';
import { getResources } from '../../store/GetResource/actions';
import { connect } from 'react-redux';

class Resources extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			night_mode: false,
			current_language: 'en'
		};
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.resourceData !== this.props.resourceData) {
			if (this.props.userLoading !== true) {
				this.setState({
					night_mode: this.props.userData.night_mode === 1 ? true : false,
					current_language: this.props.userData.current_language
				});
			}
		}
	}
	onTakeTestClick() {
		utility.recordEvent('Resources : take a test button pressed');
		this.props.navigation.push('RiskProfile');
	}
	onSearchClick() {
		utility.recordEvent('Resources : Search button pressed');
		this.props.navigation.push('Fund');
	}
	componentDidMount() {
		this.props.getResources();
	}
	componentWillUpdate(preProps, newProps) { }

	renderTakeTest() {
		let riskImage = '';
		let category = '';
		let title = '';
		let desc = '';

		if (this.props.data != null) {
			riskImage = this.props.data.risk_profile.banner;
			category = this.props.data.risk_profile.category;
			title = this.props.data.risk_profile.title;
			desc = this.props.data.risk_profile.short_desc;
		}
		return (
			<View style={{ flex: 1 }}>
				<FastImage
					style={{ width: '100%', height: 200 }}
					source={{ uri: riskImage }} //uri: this.props.resourceData.risk_profile.banner
				/>
				<View
					style={{
						width: '70%',
						height: 200,
						position: 'absolute',
						justifyContent: 'center',
						marginLeft: 10
					}}
				>
					<Text style={styles.imageTitle}>{category}</Text>
					<Text style={styles.imageCategory}>{title}</Text>
					<Text style={styles.imageDesc} numberOfLines={4}>
						{desc}
					</Text>
				</View>
				<View style={{ marginHorizontal: 15, marginTop: 10 }}>
					{this.renderImportantDiscolsure()}
					{/* <Text style={{ marginTop: 15 }}>
						<Text style={[ styles.fundPlatformText, { color: utility.changeFontColor('#000000') } ]}>
							PLEASE VIEW{' '}
						</Text>
						<Text
							onPress={() => {
								// this.props.navigation.navigate("RiskProfileModal")
								let data = {};
								data.title = '';
								data.file_url = this.props.configData.important_disclosure;
								this.props.navigation.navigate('WebViewScreen', { data });
							}}
							style={[
								styles.fundPlatformText,
								{
									textDecorationLine: 'underline',
									color: utility.changeFontColor('#000000'),
									paddingBottom: 3,
									fontWeight: 'bold'
								}
							]}
						>
							IMPORTANT DISCLOSURE
						</Text>
						<Text style={[ styles.fundPlatformText, { color: utility.changeFontColor('#000000') } ]}>
							{' '}
							REGARDING THIS TEST
						</Text>
					</Text> */}
				</View>
				<TouchableOpacity
					onPress={() => this.onTakeTestClick()}
					style={[
						styles.bottomView,
						{
							backgroundColor: utility.changeButtonColor('#56b5d0')
						}
					]}
				>
					<Text style={styles.buttonText}>{language.TakeTest}</Text>
				</TouchableOpacity>
				<ATOMS.OfflineBar />
			</View>
		);
	}
	renderImportantDiscolsure() {
		let lang = this.props.current_language;
		if (lang === 'en') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						PLEASE VIEW{' '}
					</Text>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						IMPORTANT DISCLOSURE
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						{' '}
						REGARDING THIS TEST
					</Text>
				</Text>
			);
		} else if (lang === 'es') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						AVISO IMPORTANTE
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						{' '}
						SOBRE ESTA PRUEBA
					</Text>
				</Text>
			);
		} else if (lang === 'zh-hant') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						請查看關於此測試的
					</Text>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						重要披露
					</Text>
				</Text>
			);
		} else if (lang === 'ja') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						診断に関する
					</Text>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						重要なお知らせ
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						をご確認ください
					</Text>
				</Text>
			);
		} else if (lang === 'ko') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						테스트 관련
					</Text>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold',
							}
						]}
					>
						중요 공지
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						를 열람하세요.
					</Text>
				</Text>
			); F
		} else if (lang === 'ru') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						ПОЖАЛУЙСТА, ОЗНАКОМЬТЕСЬ С {' '}
					</Text>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						ВАЖНЫМ РАСКРЫТИЕМ{' '}
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						ИНФОРМАЦИИ КАСАТЕЛЬНО ДАННОГО ТЕСТА.
					</Text>
				</Text>
			);
		} else if (lang === 'pt-pt') {
			return (
				<Text style={{ marginTop: 15 }}>
					<Text
						onPress={() => {
							let data = {};
							data.title = '';
							data.file_url = this.props.configData.important_disclosure;
							this.props.navigation.navigate('WebViewScreen', { data });
						}}
						style={[
							styles.fundPlatformText,
							{
								textDecorationLine: 'underline',
								color: utility.changeFontColor('#000000'),
								paddingBottom: 3,
								fontWeight: 'bold'
							}
						]}
					>
						AVISO IMPORTANTE{' '}
					</Text>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						SOBRE ESTE TESTE.
					</Text>
				</Text>
			);
		}
	}
	renderSearch = () => {
		let fundImage = '';
		let category = '';
		let title = '';
		let desc = '';
		let short_desc = '';
		if (this.props.data != null) {
			fundImage = this.props.data.fund_platform.banner;
			category = this.props.data.fund_platform.category;
			title = this.props.data.fund_platform.title;
			short_desc = this.props.data.fund_platform.short_desc;
			desc = this.props.data.fund_platform.description;
		}
		return (
			<View style={{ flex: 1 }}>
				<FastImage style={{ width: '100%', height: 200 }} source={{ uri: fundImage }} />
				<View
					style={{
						width: '60%',
						height: 200,
						position: 'absolute',
						justifyContent: 'center',
						right: 0
					}}
				>
					<Text style={styles.imageCategory}>{title}</Text>
					<Text style={styles.imageTitle}>{category}</Text>
					<Text style={styles.imageDesc} numberOfLines={4}>
						{short_desc}
					</Text>
				</View>
				<View style={{ marginHorizontal: 15, marginTop: 10 }}>
					<Text style={[styles.fundPlatformText, { color: utility.changeFontColor('#000000') }]}>
						{desc}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => this.onSearchClick()}
					style={[styles.bottomView, { backgroundColor: utility.changeButtonColor('#1D3444') }]}
				>
					<Text style={styles.buttonText}>{language.Search}</Text>
				</TouchableOpacity>
			</View>
		);
	};
	componentWillMount() {
		utility.recordScreen('Resources Screen');
	}
	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: utility.changeHeaderColor('#F3F3F3') }}>
				<View
					style={[
						styles.container,
						{ backgroundColor: utility.changeBackgroundColor('#FFFFFF'), paddingBottom: 50 }
					]}
				>
					<TabHeader title={language.Resource} backgroundColor={utility.changeHeaderColor('#F3F3F3')} />
					<ScrollView>
						{this.renderTakeTest()}
						{this.renderSearch()}
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
const mapStateToProps = (state) => {
	const { loading, resourceData } = state.resources;
	const { userId, userData, current_language } = state.user;
	const { configData } = state.auth;

	return {
		configData,
		current_language,
		loading,
		data: resourceData,
		userId,
		userData
	};
};
export default connect(mapStateToProps, { getResources })(Resources);
