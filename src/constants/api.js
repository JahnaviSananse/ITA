// const BASE_URL = 'https://varomatic.agency/investors-trust/wp-json/'
const BASE_URL = 'https://investors-trust.app/itaconnect/wp-json/';

export const API_EXCEPTION = `${BASE_URL}commonconfiguration/errorhandling`;
// Auth APIS
export const API_GET_INVESTOR = `${BASE_URL}auth/checkintroducercode`;
export const API_NEW_PASSWORD_SETUP = `${BASE_URL}auth/newpasswordsetup`;
export const API_CHECK_INTRODUCER_FORGOT = `${BASE_URL}auth/checkintroducerforgot`;
export const API_CONFIRM_CODE = `${BASE_URL}auth/confirmcode`;
export const API_RESET_PASSWORD = `${BASE_URL}auth/forgotpassword`;
export const API_LOGIN = `${BASE_URL}auth/login`;
export const API_REQUEST_NEW_ONE = `${BASE_URL}auth/resendconfirmcode`;
export const API_LOGOUT = `${BASE_URL}user/logout`;

export const API_CHANGE_PASSWORD = `${BASE_URL}user/changepassword`;
export const API_UPDATE_TOKEN = `${BASE_URL}user/setdevicetoken`;
export const API_UPDATE_NOTIFICATION = `${BASE_URL}user/updatenotification`;
export const API_UPDATE_NOTI_LANGUAGE = `${BASE_URL}user/changenotificationlanguage`;
export const API_UPDATE_NIGHTMODE = `${BASE_URL}user/updatenightmode`;
export const API_CHANGE_LANGUAGE = `${BASE_URL}user/changelanguage`;
export const API_SIGN_OUT = `${BASE_URL}user/signout`;
export const API_SET_RECENT = `${BASE_URL}user/setrecentflyer`;
export const API_USER_CHECK = `${BASE_URL}user/getuserstatus`;

//Discover List
export const API_DISCOVER_LIST = `${BASE_URL}discover/getdiscoverlist`;
export const API_DISCOVER_DETAIL = `${BASE_URL}discover/getdiscoverdetail`;
export const API_POLL_VOTE = `${BASE_URL}discover/addpollanswers`;
export const API_SURVEY_VOTE = `${BASE_URL}discover/addsurveyanswers`;

//Library List
export const API_LIBRARY_DATA = `${BASE_URL}library/getlibrary`;
export const API_LIBRARY_SEARCH = `${BASE_URL}library/getsearchdata`;
export const API_ADD_REMOVE_FAVORITE = `${BASE_URL}user/addremovebookmark`;
export const API_GET_LIST_FAV = `${BASE_URL}user/getfavoritelist`;
export const API_ALL_VIDEOS = `${BASE_URL}library/getallvideos`;
export const API_CONFIGURE_DATA = `${BASE_URL}commonconfiguration/getconfiguration`;
export const API_VERSION_CHECK = `${BASE_URL}commonconfiguration/versioncontroller`;
export const API_SET_SESSIONDATA = `${BASE_URL}commonconfiguration/sessionmanagement`;

// FUND LIST
export const API_FUND = `${BASE_URL}resources/getsearchfund`;

// ViewAll
export const API_GET_ALL_DATA = `${BASE_URL}library/viewalldata`;

// Get All video
export const API_GET_ALL_VIDEO = `${BASE_URL}library/getallvideos`;

// Report
export const API_GET_ALL_REPORT = `${BASE_URL}support/getlistreport`;
export const API_GENERATE_A_REPORT = `${BASE_URL}support/generatenewreport`;
export const API_GET_ALL_COMMENT = `${BASE_URL}support/getmessagedata`;

// Recent & Fav
export const API_FAVORITE = `${BASE_URL}user/getfavorite`;
export const API_GET_ALL_RECENT = `${BASE_URL}user/getRecent`;
//Risk Profile
export const RISK_PROFILE_GET_QUESTIONS = `${BASE_URL}resources/getriskquestion`;
export const RISK_PROFILE_GET_DETAIL = `${BASE_URL}resources/getriskdetail`;
export const RISK_UPLOAD_IMAGE = `${BASE_URL}resources/uploadImage`;
export const GET_RESOURCES = `${BASE_URL}resources/getresources`;
