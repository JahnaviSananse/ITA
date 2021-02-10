import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import styles from './style';
import language from '../../../Localization';
import * as IMAGE from '../../../resources/index';
import * as utility from '../../../Utility/util';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			expanded: true,
			selectedIndex: 0
		};
	}
	onItemSelect = (index) => {
		this.trackMethod(JSON.stringify(index));
		this.props.onPress(index);
	};

	trackMethod(str) {
		let value = `Accordian: ${str}`;
		utility.recordEvent(value);
	}

	toggleExpand = () => {
		this.trackMethod('toggleExpand');
		this.setState({ expanded: !this.state.expanded });
	};
	render() {
		return (
			<View>
				<TouchableOpacity
					style={[styles.row, { backgroundColor: utility.changeBackgroundColor('#FFFFFF') }]}
					onPress={() => this.toggleExpand()}
				>
					<Text style={[styles.fontParent, styles.font, { color: utility.changeFontColor('#000000') }]}>
						{this.props.title}
					</Text>
					{this.state.expanded ? (
						<FastImage
							source={utility.changeAccordianupButton()}
							style={styles.iconStyle}
							resizeMode={FastImage.resizeMode.contain}
						/>
					) : (
							<FastImage
								source={utility.changeAccordianDownButton()}
								style={styles.iconStyle}
								resizeMode={FastImage.resizeMode.contain}
							/>
						)}
				</TouchableOpacity>
				<View style={styles.parentHr} />
				{this.state.expanded && (
					<View style={{}}>
						<FlatList
							data={this.props.data}
							numColumns={1}
							scrollEnabled={false}
							renderItem={({ item, index }) => (
								<View>
									<TouchableOpacity
										style={[
											styles.childRow,
											styles.button,
											item.value ? styles.btnInActive : styles.btnActive,
											{ backgroundColor: utility.changeBackgroundColor('#FFFFFF') }
										]}
										onPress={() => this.onItemSelect(index)}
									>
										{this.props.title == language.FundFamily && (
											<View style={{ flexDirection: 'row' }}>
												<Image
													style={styles.selectionRowLogo}
													resizeMode={'contain'}
													source={{ uri: item.image }}
												/>
												<Text
													style={[
														styles.fontChild,
														styles.itemInActive,
														{ color: utility.changeFontColor('#000000') }
													]}
												>
													{item.name}
												</Text>
											</View>
										)}

										{this.props.title == language.AssetClass && (
											<View style={{ flexDirection: 'row' }}>
												<Text
													style={[
														styles.fontChild,
														styles.itemInActive,
														{ color: utility.changeFontColor('#000000') }
													]}
												>
													{item.name}
												</Text>
											</View>
										)}

										{this.props.title == 'Investment Universe' && (
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'stretch',
													flex: 1,
													flexWrap: 'wrap'
												}}
											>
												{
													<FlatList
														data={this.state.data}
														numColumns={2}
														renderItem={({ item, index }) => (
															<View>
																<Text style={{ padding: 10, width: '50%' }}>
																	{item.name}
																</Text>
															</View>
														)}
													/>
												}
											</View>
										)}
										<FastImage
											style={styles.iconStyle}
											resizeMode={FastImage.resizeMode.contain}
											source={item.value ? IMAGE.FILTER_CHECK : IMAGE.FILTER_UNCHECK}
										/>
									</TouchableOpacity>
									<View style={styles.childHr} />
								</View>
							)}
						/>
					</View>
				)}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { userData } = state.user;
	return {
		userData
	};
};

export default connect(mapStateToProps, null)(index);
