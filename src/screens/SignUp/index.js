import React from 'react';
import { Dimensions, Image, ImageBackground, Keyboard, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as ATOMS from '../../components/atoms';
import * as fonts from '../../constants/fonts/index';
import * as VALIDATE from '../../constants/validation';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import { signupIntroducer } from '../../store/Auth/actions';
import { clearRecentData } from '../../store/RecentFav/actions';
import { updateUserInfo } from '../../store/User/actions';
import * as utility from '../../Utility/util';
import styles from './style';
const className = 'SignUp'

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            introducerCode: '',
            isKeyboardShow: false
        };
        this.fncSignup = this.fncSignup.bind(this)
        this.fncIsValidate = this.fncIsValidate.bind(this)

        this.props.updateUserInfo()
        this.props.clearRecentData()

    };

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.signupData !== this.props.signupData) {
            // alert(JSON.stringify(this.props.signupData))
            if (this.props.loading === false && this.props.isSuccess) {
                setTimeout(() => {
                    this.clearState()
                    this.props.navigation.navigate("SignupPassword")
                }, 50);

            }
        }
    }
    clearState() {
        this.setState({
            email: '',
            name: '',
            introducerCode: '',
        })
    }
    componentWillMount() {
        Keyboard.addListener('keyboardDidShow', () => {
            this.setState({ isKeyboardShow: true })
        });
        Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ isKeyboardShow: false })
        });
        utility.recordScreen("Signup Screen")
    }
    fncIsValidate() {
        utility.recordEvent("SignUp: Form Validation")
        let isValidate = false
        let messageText = ''
        if (VALIDATE.isBlank(this.state.name)) {
            messageText = language.ER_ENTER_NAME
        } else if (!VALIDATE.isValidEmail(this.state.email)) {
            messageText = language.ER_VALID_EMAIL
        } else if (this.state.introducerCode.trim() == '') {
            messageText = language.PH_INTRODUCER_CODE
        } else {
            utility.recordEvent("SignUp: Redirect to Signup Password Screen")
            // this.props.navigation.push('SignupPassword')
            isValidate = true
        }

        if (isValidate === false) {
            alert(messageText)
        }
        return isValidate
    }
    fncSignup() {
        utility.recordEvent("SignUp: fncSignup")
        if (this.fncIsValidate()) {
            let loginRequest = {}
            loginRequest.email_address = this.state.email
            loginRequest.client_name = this.state.name
            loginRequest.introducer_code = this.state.introducerCode
            this.props.signupIntroducer(loginRequest)
        }
    }
    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        this.setState({ introducerCode: newText });
    }
    render() {
        let height = Dimensions.get("screen").height
        let width = Dimensions.get("screen").width
        let textFieldWidth = (width / 2)
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#F3F3F3"
                    barStyle="dark-content"
                />
                <ImageBackground style={styles.imageBackground} source={IMAGE.BACKGROUND_IMAGE}>
                    <FastImage
                        style={{ width: '100%', height: Platform.OS === 'android' ? 300 : '50%', position: 'absolute' }}
                        resizeMode={FastImage.resizeMode.cover}
                        source={IMAGE.BACKGROUND_DOT_IMAGE}></FastImage>
                    {/* <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'> */}
                    <KeyboardAwareScrollView
                        contentContainerStyle={{ height: height }}
                        extraHeight={100}
                        extraScrollHeight={100}
                        keyboardShouldPersistTaps='handled'
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}
                    >
                        <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{ width: (width - 80), height: 100 }}
                                resizeMode={'contain'}
                                source={IMAGE.LOGO}
                            />
                        </View>
                        {/* <KeyboardAwareScrollView
                            keyboardShouldPersistTaps='handled'> */}
                        <View style={{ flex: 3, justifyContent: "center", alignItems: "center", }}>

                            <View style={{ height: "90%", width: '90%', borderRadius: 5 }}>
                                <View style={styles.loginFormContainer}>
                                    <Text style={styles.financeText}>{language.financiallogin}</Text>
                                <View style={styles.formContainer}>

                                    <ATOMS.TextField
                                        labelHeight={30}
                                        label={language.PH_NAME}
                                        labelTextStyle={styles.placeHolderContainer}
                                        titleTextStyle={styles.textContainer}
                                        value={this.state.name}
                                        keyboardType={'default'}
                                        onChangeText={(name) => { this.setState({ name }) }}
                                        tintColor={"#696969"}
                                        textColor={"#233746"}
                                        lineWidth={2}
                                        labelPadding={10}
                                        inputContainerPadding={10}
                                    />

                                    <ATOMS.TextField
                                        labelHeight={25}
                                        label={language.PH_EMAIL}
                                        labelTextStyle={styles.placeHolderContainer}
                                        titleTextStyle={styles.textContainer}
                                        value={this.state.email}
                                        keyboardType={'email-address'}
                                        onChangeText={(email) => { this.setState({ email }) }}
                                        tintColor={"#696969"}
                                        textColor={"#233746"}
                                        lineWidth={2}
                                        labelPadding={10}
                                        inputContainerPadding={10}
                                    />

                                    <ATOMS.TextField
                                        labelHeight={25}
                                        label={language.PH_INTRODUCER_CODE}
                                        labelTextStyle={styles.placeHolderContainer}
                                        titleTextStyle={styles.textContainer}
                                        value={this.state.introducerCode}
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => this.onChanged(text)}
                                        tintColor={"#696969"}
                                        textColor={"#233746"}
                                        lineWidth={2}
                                        labelPadding={10}
                                        maxLength={8}
                                        inputContainerPadding={10}
                                    />
                                    <ATOMS.Button
                                        style={{ alignSelf: "center", fontFamily: fonts.FONT_SFPRO_REGULAR, }}
                                        title={'Next'}
                                        onPress={() => this.fncSignup()}
                                    />

                                </View>
                                </View>
                            </View>
                        </View>
                        {/* {!this.state.isKeyboardShow && */}
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ height: '50%', justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.financeText}>{language.financial}</Text>
                               <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.returnToSignInButton}>
                                <Text style={styles.returnToSignInText}>{language.ReturnToLogin}</Text>
                            </TouchableOpacity>
                            </View>
                            
                        </View>
                        {/* } */}
                    </KeyboardAwareScrollView>
                    <ATOMS.Loader
                        isLoading={this.props.loading}
                    />
                </ImageBackground>
                <ATOMS.OfflineBar />
            </View >

        )
    }
}

const mapStateToProps = state => {
    const { loading, signupData, isSuccess } = state.auth
    return {
        loading,
        signupData,
        isSuccess
    }
};

export default connect(mapStateToProps, { signupIntroducer, updateUserInfo, clearRecentData })(SignUp)