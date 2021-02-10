import { Dimensions, Platform } from 'react-native';

export const IS_IPHONE = Platform.OS === 'ios' ? true : false
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const BUTTON_HEIGHT = 50;
export const MIN_PASS_LENGHT = 6;
export const SELECTE_PIC_IMAGE = 130;

//String
export const LANGUAGE = "Language";
export const SECURITY = "Security";
export const NOTIFICATION = "Notification";
export const NIGHT_MODE = "Night Mode";
export const REPORT_ISSUE = "Report an Issue";
export const FAQ = "FAQ";
export const PRIVACY = "Privacy";
export const GETTING_STARTED = "Getting Started"
export const SIGNOUT = "Sign out"

//Font

export const HEADING_FONT = 18;
export const ITEMS_FONT = 16;
export const DESCRIPTION = 14;
export const FONT_SMALL = 12
