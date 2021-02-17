import {
  CATEGORY_DATA_FAILURE,
  CATEGORY_DATA_REQUEST,
  CATEGORY_DATA_SUCCESS,
  CHECK_VERSION_FAILURE,
  CHECK_VERSION_REQUEST,
  CHECK_VERSION_SUCCESS,
  CODE_FAILURE,
  CODE_REQUEST,
  CODE_SUCCESS,
  FORGET_FAILURE,
  FORGET_REQUEST,
  FORGET_SUCCESS,
  INTERNET_STATE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESET_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  SHAREING_FAILURE,
  SHAREING_OPEN,
  SHAREING_REQUEST,
  SHAREING_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FAILURE_INTORDUCER,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_INTORDUCER,
  SIGNUP_SUCCESS,
  SIGNUP_SUCCESS_INTORDUCER,
} from "./actionTypes";

const intialState = {
  loading: false,
  userId: null,
  email_address: "",
  authToken: "",
  userData: {},
  signupData: {},
  passwordData: {},
  introducerCode: {},
  newPassword: {},
  code: {},
  error: null,
  isSuccess: false,
  configData: {},
  checkVersion: {
    loading: false,
    success: false,
    data: {},
  },
  loadingShare: false,
  isConnected: true,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case INTERNET_STATE:
      return {
        ...state,
        isConnected: action.payload,
      };
    case SHAREING_REQUEST:
      return {
        ...state,
        loadingShare: true,
      };
    case SHAREING_SUCCESS:
      return {
        ...state,
        loadingShare: false,
      };
    case SHAREING_OPEN:
      return {
        ...state,
        loadingShare: false,
      };
    case SHAREING_FAILURE:
      return {
        ...state,
        loadingShare: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isLogin: true,
        userData: action.payload,
        userId: action.payload.user_id,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        passwordData: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case SIGNUP_REQUEST_INTORDUCER:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS_INTORDUCER:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        signupData: action.payload,
        userId: action.payload.user_id,
      };
    case SIGNUP_FAILURE_INTORDUCER:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case FORGET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        email_address: action.payload.email_address
          ? action.payload.email_address
          : "",
        introducerCode: action.payload,
        userId: action.payload.user_id,
      };
    case FORGET_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        code: action.payload,
      };
    case CODE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
      };
    case RESET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        newPassword: action.payload,
      };
    case RESET_FAILURE:
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
    case CATEGORY_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        configData: {},
      };

    case CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        configData: action.payload,
      };
    case CATEGORY_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        configData: {},
      };

    case CHECK_VERSION_REQUEST:
      return {
        ...state,
        checkVersion: {
          ...state.checkVersion,
          loading: true,
          success: false,
          data: {},
        },
      };

    case CHECK_VERSION_SUCCESS:
      return {
        ...state,
        checkVersion: {
          ...state.checkVersion,
          loading: false,
          success: true,
          data: action.payload,
          // data: {}
        },
      };
    case CHECK_VERSION_FAILURE:
      return {
        ...state,
        checkVersion: {
          ...state.checkVersion,
          loading: false,
          success: true,
          data: {},
        },
      };
    default:
      return state;
  }
};
