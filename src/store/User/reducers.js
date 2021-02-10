import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,

  USER_LOGIN_SUCCESS,

  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,

  NIGHTMODE_REQUEST,
  NIGHTMODE_SUCCESS,
  NIGHTMODE_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SET_DEFAULT_LANG,
  SET_GUEST_LANGUAGE,
  SET_GUEST_NIGHT_MODE,
  STORE_DEVICE_TOKEN
} from './actionTypes';


const intialState = {
  loading: false,
  userId: null,
  authToken: '',
  current_language: 'en',
  userData: {},
  error: null,
  isSuccess: true,
  isUpdateLanguage: false
}

export default (state = intialState, action) => {
  switch (action.type) {
    case STORE_DEVICE_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case SET_DEFAULT_LANG: {
      return {
        ...state,
        current_language: 'en'
      }
    };
    case SET_GUEST_LANGUAGE: {
      return {
        ...state,
        current_language: action.payload.language_code
      }
    };
    case SET_GUEST_NIGHT_MODE: {
      return {
        ...state,
        userData: {
          ...state.userData,
          night_mode: action.payload.night_mode
        }
      }
    };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        userData: action.payload,
        isUpdateLanguage: true,
        current_language: action.payload.current_language,
        userId: action.payload.user_id ? action.payload.user_id : null
      };
    case NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case NIGHTMODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NIGHTMODE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case NIGHTMODE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    default:
      return state
  }
}