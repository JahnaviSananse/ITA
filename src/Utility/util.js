import { Dimensions, Platform, PixelRatio, AsyncStorage, Alert } from 'react-native';
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import * as images from '../resources/index'
import * as key from '../constants/keys';
export const GOOGLE_ANALYTICS = 'UA-143344339-1'


export const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('screen');

// based on iphone x scale
const scale = SCREEN_WIDTH / 375;

export function getVideoID(url) {
    let id = '';
    if (url.indexOf('v=') > -1) {
        id = url.split('v=')[1].split('&')[0]
    } else {
        id = url.split('/').reverse()[0]
    }
    return id;
}

export function normalize(size) {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

//Google Analytics

let tracker = new GoogleAnalyticsTracker(GOOGLE_ANALYTICS);

export const recordScreen = (screenname) => {
    tracker.trackScreenView(screenname);
};

export const recordEvent = (eventname, paraString) => {
    try {
        AsyncStorage.getItem(key.kEventList)
            .then((value) => {
                let previousEventList = value ? JSON.parse(value) : [];
                let obj = `${previousEventList} --> ${eventname}`
                AsyncStorage.setItem(key.kEventList, JSON.stringify(obj));
            }).done();
    } catch (error) {
    }
    let str = " "
    if (paraString) {
        str = paraString
    }
    tracker.trackEvent(eventname, str, {
        label: JSON.stringify(Platform.OS),
        value: '22'
    });
};

//Night Mode
let nightMode = false

export function updateNightModeFlag(isTrue) {
    nightMode = isTrue
    // AsyncStorage.getItem('userData').then((userdata) => {
    //     if (userdata) {
    //         let dataUser = JSON.parse(userdata)
    //         if(dataUser.night_mode === 0){
    //             nightMode = false
    //         }else{
    //             night_mode = true
    //         }
    //     }
    // })
}
// AsyncStorage.getItem('nighMode').then((value) =>
//     value == true ? nightMode = true : nightMode = false
// )

export function changeBackgroundColorNew(currentColor, isNightMode) {
    nightMode = isNightMode
    let bgColor = isNightMode ? '#404A51' : currentColor
    return bgColor;
}

export function changeBackgroundColor(currentColor) {
    let bgColor = nightMode ? "#404A51" : currentColor
    return bgColor;
}

export function changeHeaderColor(currentColor) {
    return nightMode ? "#30383D" : currentColor
}

export function changeFontColor(currentColor) {
    let fontColor = nightMode ? "#E6E7E8" : currentColor
    return fontColor;
}

export function changeButtonColor(currentColor) {
    let buttonColor = nightMode ? "#97BCBE" : currentColor
    return buttonColor;
}

export function changeHelpButton() {
    let img = nightMode ? images.DARK_HELP : images.HELP
    return img;
}

export function refreshIcon() {
    let img = nightMode ? images.REFRESH_WHITE : images.REFRESH
    return img
}
export function changeCloseButton() {
    let img = nightMode ? images.DARK_CLOSE : images.CLOSE
    return img;
}

export function changeDownButton() {
    let img = nightMode ? images.DARK_DOWN_ARROW : images.DOWN_ARROW
    return img;
}

export function changeUploadButton() {
    let img = nightMode ? images.DARK_UPLOAD : images.UPLOAD
    return img;
}

export function changeThreeDots() {
    let img = nightMode ? images.THREEDOTS_WHITE : images.THREEDOTS
    return img;
}
export function changeBackButton() {
    let img = nightMode ? images.DARK_BACK : images.BACK
    return img;
}
export function changeForwardButton() {
    let img = nightMode ? images.DARK_FORWARD : images.FORWARD
    return img;
}
export function changeShareButton() {
    let img = nightMode ? images.SHARE_WHITE : images.SHARE
    return img;
}
export function changeSettingButton() {
    let img = nightMode ? images.DARK_SETTING : images.SETTING
    return img;
}
export function changeSearchButton() {
    let img = nightMode ? images.DARK_SEARCH : images.SEARCH
    return img;
}

export function changeFilterButton() {
    let img = nightMode ? images.DARK_FILTER : images.FILTER
    return img;
}

export function changeAccordianupButton() {
    let img = nightMode ? images.DARK_FILTER_UP : images.FILTER_UP
    return img;
}

export function changeAccordianDownButton() {
    let img = nightMode ? images.DARK_FILTER_DOWN : images.FILTER_DOWN
    return img;
}

export function changeNextButton() {
    let img = nightMode ? img = images.DARK_NEXT : images.NEXT
    return img;
}

export function changeChatButton() {
    let img = nightMode ? images.DARK_CHAT : images.CHAT
    return img;
}
