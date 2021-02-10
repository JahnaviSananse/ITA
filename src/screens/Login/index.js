import React from 'react';
import { Alert, Animated, AsyncStorage, Dimensions, ImageBackground, Keyboard, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchID from 'react-native-touch-id';
import { connect } from 'react-redux';
import * as ATOMS from '../../components/atoms';
import * as fonts from '../../constants/fonts/index';
import * as VALIDATE from '../../constants/validation';
import language from '../../Localization';
import * as IMAGE from '../../resources/index';
import { login } from '../../store/Auth/actions';
import { clearRecentData } from '../../store/RecentFav/actions';
import { updateUserInfo } from '../../store/User/actions';
import * as utility from '../../Utility/util';
import styles from './style';

const version = DeviceInfo.getVersion()

const className = 'Login'

class Login extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            y: new Animated.Value(100),
            viewY: new Animated.Value(500),
            viewBottomY: new Animated.Value(500),
            isAnimated: false,
            loginBio: false,
            typeBio: false,
            isFaceID: false,
            // email: 'neha@creolestudios.com',
            // password: 'Creole@123',
            email: '',
            password: '',
            rememberMe: false,
            isKeyboardShow: false,
            night_mode: false,
        };

        this.fncDoLogin = this.fncDoLogin.bind(this)
        this.fncIsValidate = this.fncIsValidate.bind(this)
        this.clearState = this.clearState.bind(this)

        this.props.updateUserInfo()
        this.props.clearRecentData()

        AsyncStorage.removeItem('currentLan')
        // AsyncStorage.removeItem('biometryType');

        AsyncStorage.getItem('userLogin').then((userLogin) => {
            if (userLogin) {
                let dataUser = JSON.parse(userLogin)
                this.setState({
                    email: dataUser.email_address,
                    //password: dataUser.password
                })
            }
        });

        AsyncStorage.getItem('userLogin').then((loginBio) => {
            if (loginBio) {

                const optionalConfigObject = {
                    unifiedErrors: false, // use unified error messages (default false)
                    passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
                }

                // AsyncStorage.getItem('biometryType').then((biometryType) => {
                //     if (biometryType === '1' || biometryType === '2') {
                //         let typeBio = true
                //         let isFaceID = true
                //         if (biometryType === '1') {
                //             isFaceID = true
                //             typeBio = false
                //         } else if (biometryType === '2') {
                //             isFaceID = false
                //             typeBio = true
                //         }
                //         this.setState({
                //             // typeBio,
                //             isFaceID
                //         })
                //     } else {
                //         this.setState({
                //             typeBio: false
                //         })
                //     }
                // });
                AsyncStorage.getItem("biometryType").then(biometryType => {
                    console.log("biometryType===>" + biometryType);
                    let typeBio = false;
                    if (biometryType === "1" || biometryType === "2") {
                        typeBio = true;
                        let isFaceID = false;
                        if (biometryType === "1") {
                            isFaceID = true;
                        } else if (biometryType === "2") {
                            isFaceID = false;
                        }
                        this.setState({
                            typeBio,
                            isFaceID
                        });
                    }
                });


                setTimeout(() => {
                    this.setState({
                        loginBio: true
                    })
                }, 2000);
            } else {
                this.setState({
                    loginBio: false
                })
            }
        });
        setTimeout(() => {
            this.setState({
                isAnimated: true
            })
            setTimeout(() => {
                this.startAni()
            }, 1000);
        }, 500);
    };

    checkforBio() {
        const optionalConfigObject = {
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
        }
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                let typeBio = false
                if (biometryType === 'FaceID') {
                } else if (biometryType === 'TouchID' || biometryType === true) {
                    typeBio = true
                }
                this.checkForTouchID()
            })
            .catch(error => {
                alert(JSON.stringify(error))
            });
    }
    checkForTouchID() {
        const ConfigObject = {
            title: language.FingerprintRequired,//Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };
        TouchID.authenticate('Lightly press against the sensor to verify your fingerprint', ConfigObject)
            .then((success) => {
                if (success) {
                    AsyncStorage.getItem('userLogin').then((loginBio) => {
                        if (loginBio) {
                            //remove time out if alert shows too late
                            setTimeout(() => {
                                let dd = JSON.parse(loginBio)
                                this.props.clearRecentData()
                                let loginRequest = {}
                                loginRequest.email_address = dd.email_address
                                loginRequest.password = dd.password
                                this.props.login(loginRequest)
                            }, 2000);
                        }
                    })
                }
            })
            .catch((error) => {
                // alert("Error\n" + error)
            });

    }
    startAni() {
        Animated.spring(this.state.y, {
            toValue: 0,
        }).start();
        Animated.spring(this.state.viewY, {
            toValue: 0,
        }).start();
        Animated.spring(this.state.viewBottomY, {
            toValue: 0,
        }).start();

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userData !== this.props.userData) {
            if (this.props.loading === false && this.props.isSuccess) {
                setTimeout(() => {
                    this.clearState()
                    // this.props.navigation.navigate("MainTabbarScreen")
                }, 500);
            }
        }
    }
    componentWillMount() {
        utility.recordScreen("Login");
    }
    // Clear state
    clearState() {
        this.setState({
            email: '',
            password: ''
        })
    }
    fncIsValidate() {
        utility.recordEvent("Login: On Login Button Pressed")
        // this.setState({ isDisable: true })
        let isValidate = false
        let messageText = ''
        if (VALIDATE.isBlank(this.state.email)) {
            messageText = language.ER_ENTER_EMAIL
        } else if (!VALIDATE.isValidEmail(this.state.email)) {
            messageText = language.ER_VALID_EMAIL
        } else if (VALIDATE.isBlank(this.state.password)) {
            messageText = language.ER_ENTER_PASS
        } else {
            utility.recordEvent("Login : Login Email", this.state.email)
            this.setState({ isDisable: true })
            isValidate = true
        }

        if (isValidate === false) {
            utility.recordEvent("Login: Login Fail")
            // this.setState({ isDisable: false })
            Alert.alert(
                'Sign In',
                messageText,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
            // alert(messageText)
        }

        return isValidate
    }

    fncDoLogin() {
        utility.recordEvent("Login: fncDoLogin")
        Keyboard.dismiss()

        // Check if all the validation will true then process with login api.
        if (this.fncIsValidate()) {
            this.props.clearRecentData()
            let loginRequest = {}
            loginRequest.email_address = this.state.email
            loginRequest.password = this.state.password
            this.props.login(loginRequest)
        }
    }

    hideSpinner() {
        this.setState({ visible: false });
    }
    renderSignUp() {
        return (
            <ATOMS.LinkButton
                clickableTitle={'SignUp'}
                onPress={() => {
                    this.props.navigation.navigate('SignUp')
                }}
            />
        )
    }
    rememberMe = () => {
        this.setState({ rememberMe: !this.state.rememberMe });
        setTimeout(() => {
            this._storeData()
        }, 100);
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('isRemember', this.state.rememberMe ? 1 : 0);
        } catch (error) {
            // Error saving data
        }
    };

    onContinueAsGuestClick() {
        utility.recordEvent("Login : Continue as guest pressed")
        this.props.updateUserInfo()
        this.props.clearRecentData()
        this.props.navigation.push("GuestTabbarScreen")
    }
    onPrivacyClick() {
        let data = {}
        data.title = ''
        data.file_url = this.props.configData.privacy_policy
        this.props.navigation.navigate("WebViewScreen", { data })

        // utility.recordEvent("Login : Privacy button pressed")
        // this.props.navigation.navigate("Privacy")
    }
    render() {
        let height = Dimensions.get("screen").height
        let width = Dimensions.get("screen").width
        if (this.state.isAnimated === false) {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="#F3F3F3" //F3F3F3
                        barStyle="dark-content"
                    />
                    <ImageBackground style={styles.imageBackground} source={IMAGE.BACKGROUND_IMAGE}>
                        <FastImage
                            style={{ width: '100%', height: Platform.OS === 'android' ? 300 : '50%', position: 'absolute', }}
                            resizeMode={FastImage.resizeMode.cover}
                            source={IMAGE.BACKGROUND_DOT_IMAGE}></FastImage>
                        <KeyboardAwareScrollView
                            contentContainerStyle={{ height: height }}
                            extraHeight={100}
                            extraScrollHeight={100}
                            keyboardShouldPersistTaps='handled'
                            enableOnAndroid={true}
                            enableAutomaticScroll={(Platform.OS === 'ios')}>
                            <View style={[styles.logoContainer, { height: height * 0.25 }]}>
                                <FastImage
                                    style={{ width: (width - 100), height: 100 }
                                    }
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={IMAGE.LOGO}
                                />
                            </View>

                        </KeyboardAwareScrollView>
                    </ImageBackground>
                </View >
            );
        }
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
                    <KeyboardAwareScrollView
                        contentContainerStyle={{ height: height }}
                        extraHeight={100}
                        extraScrollHeight={100}
                        keyboardShouldPersistTaps='handled'
                        enableOnAndroid={true}
                        enableAutomaticScroll={(Platform.OS === 'ios')}>
                        <Animated.View
                            style={[styles.logoContainer,
                            {
                                height: height * 0.25,
                                transform: [
                                    {
                                        translateY: this.state.y
                                    }
                                ]
                            }

                            ]}>
                            <FastImage
                                style={{ width: (width - 100), height: 100 }
                                }
                                resizeMode={FastImage.resizeMode.contain}
                                source={IMAGE.LOGO}
                            />
                        </Animated.View>
                        <Animated.View style={[styles.LoginContainer, {
                            height: 0.50,
                            transform: [
                                {
                                    translateY: this.state.viewY
                                }]
                        }]}>
                            <View style={styles.loginFormContainer}>
                                <Text style={styles.financeText}>{language.financiallogin}</Text>
                                <View style={styles.formContainer}>
                                    <ATOMS.TextField
                                        labelHeight={30}
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
                                        isBio={false}
                                    />

                                    <ATOMS.TextField
                                        labelHeight={25}
                                        label={language.PH_PASSWORD}
                                        labelTextStyle={styles.placeHolderContainer}
                                        titleTextStyle={styles.textContainer}
                                        value={this.state.password}
                                        keyboardType={'default'}
                                        onChangeText={(password) => { this.setState({ password }) }}
                                        tintColor={"#696969"}
                                        textColor={"#233746"}
                                        lineWidth={2}
                                        labelPadding={10}
                                        inputContainerPadding={10}
                                        secureTextEntry={true}
                                        // isBio={this.state.typeBio}
                                        // // isBio={true}
                                        // isFaceID={this.state.isFaceID}
                                        // onBioPress={() => {
                                        //     this.checkforBio()
                                        // }}
                                    />
                                    <ATOMS.Button
                                        style={{ alignSelf: "center", fontFamily: fonts.FONT_SFPRO_REGULAR, }}
                                        title={language.SignIn} //language.SignIn
                                        onPress={this.fncDoLogin}
                                    />
                                    <View style={styles.signupOptionContainer}>
                                        <TouchableOpacity style={styles.touchableButtonLeft} onPress={() => this.props.navigation.navigate("ForgotPassword")}>
                                            <Text style={styles.forgotPasswordText}>{language.ForgotPassword}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.touchableButtonRight} onPress={() => this.props.navigation.navigate("SignUp")}>
                                            <Text style={styles.signupText}>{language.Signup}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View style={{
                            flex: 1, transform: [
                                {
                                    translateY: this.state.viewBottomY
                                }]
                        }}>
                            <View style={{ height: '50%', justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.financeText}>{language.financial}</Text>
                                <TouchableOpacity style={styles.loginAsGuestContainer} onPress={() => this.onContinueAsGuestClick()}>
                                    <Text style={styles.loginAsGuestText}>{language.ContinueAsGuest}</Text>
                                    {/* <FastImage source={IMAGE.ARROW_ENTER} resizeMode={"contain"} style={{ height: 10, marginLeft: 5, width: 12, alignSelf: "center" }} /> */}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.copyRightContainer}>
                                <TouchableOpacity style={styles.privacyContainer} onPress={() => this.onPrivacyClick()}>
                                    <Text style={styles.privacyText}>{language.Privacy}</Text>
                                </TouchableOpacity>
                                <Text style={styles.copyRightText}>{language.CopyRight} Version {version}</Text>
                            </View>
                        </Animated.View>
                        <ATOMS.Loader
                            isLoading={this.props.loading}
                        />
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View >

        );
    }
}
// comment added 
//Hellozzz
const mapStateToProps = state => {
    const { loading, userData, isSuccess, configData } = state.auth
    return {
        configData,
        userLoading: state.user.loading,
        userDataLogin: state.user.userData,
        userData,
        loading,
        userData,
        isSuccess
    }
};

export default connect(mapStateToProps, { login, updateUserInfo, clearRecentData })(Login)


