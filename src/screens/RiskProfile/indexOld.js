
import React, { Component } from './node_modules/react';
import { Dimensions, View, Text, SectionList, FlatList, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from './node_modules/react-redux';
import { login } from '../../store/Auth/actions';
import styles from './style';
import Header from '../../components/atoms/Header'
import * as images from '../../resources/index'
import * as data from './data.json.js.js.js'
import * as ATOMS from '../../components/atoms';
import * as language from '../../constants/message';
import SelectionView from '../../components/atoms/SelectView/index'

const LIST_WIDTH = Dimensions.get('window').width
var ITEM_WIDTH = (Dimensions.get('window').width - 30) / 3
const ITEM_WIDTH_NEW = (Dimensions.get('window').width - 30) / 2
const ITEM_WIDTH_NEW_3 = (Dimensions.get('window').width - 40) / 3
var ITEM_HEIGHT = (Dimensions.get('window').height)



class Statistic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentindex: 1,
            isHorizintal: true,
            allData: JSON.parse(JSON.stringify(data.items)),

        }
    }

    componentDidMount() {

        // this.state.allData.items.map((value) => {

        //     setTimeout(() => {
        //         this.setState({
        //             stepCount: value.celldisplay,
        //             headerTitle: value.title
        //         })
        //         //alert(this.state.headerTitle)
        //     }, 1000)


        // })

    }
    componentWillMount() {

    }

    componentDidUpdate(prevProps, prevState) {
    }



    renderHorizontalItem = ({ item }) => {
        return (
            <SelectionView
                image={images.TB_IC_USER}
                imgWidth={70}
                imgHeight={70}
                topMargin={10}
                text={item.name} />
            // <TouchableOpacity style={{
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     marginHorizontal: 5,
            // }}
            //     onPress={() => {
            //         this.setState({
            //             selectedGender: item.id
            //         })
            //         alert(item.id)

            //     }}
            //     style={[styles.genderViewContainer, { backgroundColor: this.state.selectedGender === item.id ? '#253647' : '#fff' }]}>
            //     <View
            //         style={[styles.genderViewContainer, { backgroundColor: this.state.selectedGender === item.id ? '#253647' : '#fff' }]}>
            //         <Image source={images.TB_IC_USER} style={{ width: 70, height: 70, }}></Image>
            //         <Text
            //             style={[styles.genderText, {
            //                 color: this.state.selectedGender === item.id ? 'white' : 'black'
            //             }]}>
            //             {item.name}
            //         </Text>
            //     </View>
            // </TouchableOpacity>
        )

    }

    renderItems = ({ item, index }) => {
        if (index === 0) {
            return <Text>item.data[0].name</Text>
        }
    }

    renderMainItems = ({ item, index }) => {

        let wComponent = ITEM_WIDTH_NEW_3

        if ((item.celltype) === 1) {
            var direction = 'row'
            ITEM_HEIGHT = 50
            ITEM_WIDTH = (Dimensions.get('window').width - 30) / 3
        } else {
            var direction = 'column'
            wComponent = '80%'
            ITEM_HEIGHT = 50

        }

        if (item.celldisplay === 1) {
            return (
                <View style={[styles.headerViewContainer, { width: LIST_WIDTH }]}>
                    <Text style={styles.titleContainer} >{item.title}</Text>
                    <View style={styles.borderContainer} />
                    <View
                        style={{
                            flexDirection: direction,
                            marginTop: 10,
                            backgroundColor: 'red',
                            width: '100%',
                            justifyContent: 'center',
                        }}>
                        <SelectionView
                            image={images.TB_IC_USER}
                            itemWidth={ITEM_WIDTH_NEW}
                            text={item.data[0].name} />
                        <View style={{ width: 10 }} />
                        <SelectionView
                            image={images.TB_IC_USER}
                            itemWidth={ITEM_WIDTH_NEW}
                            text={item.data[1].name} />
                    </View>
                    <ATOMS.TextField
                        maxLength={30}
                        fontSize={20}
                        value={this.state.name}
                        placeholder={language.ENTER_NAME}
                        style={{ width: '90%', height: 40, backgroundColor: 'white', marginTop: 10, }}
                        onChangeText={(name) => {
                            this.setState({
                                name
                            })
                        }}
                    />
                    <View style={{ marginTop: 20, width: '90%', alignItems: 'center' }}>
                        <ATOMS.Button
                            title={'Continue'}
                            txtSize={20}
                            onPress={() => {
                                if (index < data.items.length - 1) {
                                    index = index + 1
                                    this.flatListRef.scrollToIndex({ index: this.state.currentindex, animated: true });
                                    this.setState({
                                        isHorizintal: false,
                                        currentindex: index + 1,
                                    })
                                    //alert(currentindex)
                                }
                            }
                            }
                        />
                    </View>
                </View>
            )
        } else if (item.celldisplay === 2) {

            // return (
            //     <HorizonalSelction
            //         data={item}
            //         selectedAnswer={(id) => {

            //         }}
            //     />
            // )
            //alert(ITEM_HEIGHT)
            return (
                <View style={[styles.headerViewContainer, { width: LIST_WIDTH }]}>
                    <Text
                        style={styles.titleContainer}>
                        {item.title}</Text>
                    <View
                        style={styles.borderContainer}>
                    </View>
                    <View
                        style={{ flexDirection: direction, marginTop: 10, }}>
                        <SelectionView
                            itemWidth={wComponent}
                            imgHeight={ITEM_HEIGHT}
                            text={item.data[0].name} />
                        <View
                            style={{ width: 10 }}
                        />
                        <SelectionView
                            itemWidth={wComponent}
                            imgHeight={ITEM_HEIGHT}
                            text={item.data[1].name} />
                        <View style={{ width: 10 }} />
                        <SelectionView
                            itemWidth={wComponent}
                            imgHeight={ITEM_HEIGHT}
                            text={item.data[2].name} />
                    </View>
                    <View style={{ marginTop: 20, width: '90%', alignItems: 'center' }}>
                        <ATOMS.Button
                            title={'Continue'}
                            txtSize={20}
                            onPress={() => {
                                //alert(data.items.length)
                                if (index < data.items.length - 1) {
                                    index = index + 1
                                    this.flatListRef.scrollToIndex({ index: this.state.currentindex, animated: true });
                                    this.setState({
                                        isHorizintal: false,
                                        currentindex: index + 1,
                                    })
                                }
                            }
                            }
                        />
                    </View>
                </View>
            )
        }

        // return (

        //     <View style={[styles.headerViewContainer, { width: LIST_WIDTH }]}>
        //         <Text style={styles.titleContainer} >{item.title}</Text>
        //         <View style={styles.borderContainer}></View>


        //         <View style={{ flexDirection: 'row', marginTop: 10 }}>

        //             <SelectionView
        //                 image={images.TB_IC_USER}
        //                 imgWidth={70}
        //                 imgHeight={70}
        //                 topMargin={10}
        //                 text={item.data[0].name} />
        //             <View style={{ width: 10 }} />
        //             <SelectionView
        //                 image={images.TB_IC_USER}
        //                 imgWidth={70}
        //                 imgHeight={70}
        //                 topMargin={10}
        //                 text={item.data[1].name} />

        //         </View>

        //         <ATOMS.TextField
        //             maxLength={30}
        //             fontSize={20}
        //             value={this.state.name}
        //             placeholder={language.ENTER_NAME}
        //             style={{ width: '90%', height: 40, backgroundColor: 'white', marginTop: 10, }}
        //             onChangeText={(name) => {
        //                 this.setState({
        //                     name
        //                 })
        //             }}
        //         />
        //         <View style={{ marginTop: 20, width: '90%', alignItems: 'center' }}>
        //             <ATOMS.Button
        //                 title={'Continue'}
        //                 txtSize={20}
        //                 onPress={() => {
        //                     //alert(data.items.length)
        //                     if (index < data.items.length - 1) {
        //                         index = index + 1
        //                         this.flatListRef.scrollToIndex({ index: this.state.currentindex, animated: true });
        //                         this.setState({
        //                             isHorizintal: false,
        //                             currentindex: index + 1,

        //                         })
        //                         //alert(currentindex)
        //                     }
        //                 }
        //                 }
        //             />
        //         </View>




        //         {/* <SectionList
        //             horizontal={true}
        //             renderItem={this.renderItem}>

        //         </SectionList> */}



        //     </View>
        // )

    }

    onClick() {
        alert("clicked")
    }


    textStyle() {
        return this.state.selected ? styles.genderText : styles.textSelected;
    }
    render() {
        return (
            <View style={styles.container}>
                <Header title={'Risk Profile'}
                    leftImage={images.CLOSE}
                    rightImage={images.HELP} 
                    redirectLeft={() => this.props.navigation.goBack()}
                    />

                <View style={styles.viewContainer}>
                    <Text style={styles.text}>{'Step ' + this.state.currentindex + ' /10'}</Text>

                    <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        style={{ width: LIST_WIDTH, height: '100%', }}
                        horizontal
                        data={this.state.allData}
                        renderItem={this.renderMainItems}
                        scrollEnabled={false}
                        keyExtractor={(value, index) => String(index)}
                    />
                </View>

                {/* <View style={styles.headerViewContainer} >
                            <Text style={styles.titleContainer}>{this.state.headerTitle}</Text>
                            <View style={styles.borderContainer}></View>


                            <FlatList
                                horizontal={true}
                                data={this.state.dataSource} //{this.state.provincearray}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => String(index)} />


                            <ATOMS.TextField
                                maxLength={30}
                                fontSize={20}
                                value={this.state.name}
                                placeholder={language.ENTER_NAME}
                                style={{ width: '90%', height: 40, backgroundColor: 'white', marginTop: 10, }}
                                onChangeText={(name) => {
                                    this.setState({
                                        name
                                    })
                                }}
                            />
                            <View style={styles.headerViewContainer}>
                                <ATOMS.Button
                                    title={'Continue'}
                                    txtSize={20}
                                    onPress={this.onClick}
                                />
                            </View>





                        </View>
                        <View>

                        </View>
 */}

                {/* </View> */}


            </View >
        );
    }
}

const mapStateToProps = state => {
    const { loading, userData } = state.auth
    return {
        loading,
        userData
    }
};

export default connect(mapStateToProps, { login })(Statistic)
