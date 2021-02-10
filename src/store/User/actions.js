import {Alert, AsyncStorage} from 'react-native';
import * as API from '../../constants/api';
import language from '../../Localization';
import {updateNightModeFlag} from '../../Utility/util';
import {LOGIN_SUCCESS} from '../Auth/actionTypes';
import {serverCall} from '../mainAction';
import * as ROUTER from './../../routes/router';
import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  NIGHTMODE_FAILURE,
  NIGHTMODE_REQUEST,
  NIGHTMODE_SUCCESS,
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  SET_DEFAULT_LANG,
  SET_GUEST_LANGUAGE,
  SET_GUEST_NIGHT_MODE,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  STORE_DEVICE_TOKEN,
  USER_LOGIN_SUCCESS,
} from './actionTypes';

export const updateUserInfo = (request) => (dispatch) => {
  returnToDispatch(dispatch, LOGOUT_SUCCESS, {});
  updateNightModeFlag(0);
  let data = {};
  data.night_mode = 0;
  data.current_language = 'en';
  AsyncStorage.setItem('currentLan', 'en');
  language.setLanguage('en');
  returnToDispatch(dispatch, USER_LOGIN_SUCCESS, data);
};
export const updateDeviceToken = (request) => (dispatch) => {
  const url = API.API_UPDATE_TOKEN;
  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      returnToDispatch(dispatch, STORE_DEVICE_TOKEN, request.device_token);
    })
    .catch((error) => {});
};

export const setRecent = (request) => (dispatch) => {
  const url = API.API_SET_RECENT;
  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {})
    .catch((error) => {});
};

export const changePassword = (request) => (dispatch) => {
  returnToDispatch(dispatch, CHANGE_PASSWORD_REQUEST);
  const url = API.API_CHANGE_PASSWORD;

  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      returnToDispatch(dispatch, CHANGE_PASSWORD_SUCCESS, '');
      setTimeout(() => {
        showAlert(response.data.message);
        setTimeout(() => {
          dispatch(ROUTER.back());
        }, 50);
      }, 50);
    })
    .catch((error) => {
      returnToDispatch(dispatch, CHANGE_PASSWORD_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};

export const signout = (request) => (dispatch) => {
  returnToDispatch(dispatch, SIGN_OUT_REQUEST);
  const url = API.API_SIGN_OUT;
  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      returnToDispatch(dispatch, SIGN_OUT_SUCCESS, '');
    })
    .catch((error) => {
      returnToDispatch(dispatch, SIGN_OUT_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};

export const updateNotification = (request) => (dispatch) => {
  returnToDispatch(dispatch, NOTIFICATION_REQUEST);
  const url = API.API_UPDATE_NOTIFICATION;

  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      updateNightModeFlag(response.data.data.night_mode);
      AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
      returnToDispatch(dispatch, LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, USER_LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, NOTIFICATION_SUCCESS, '');
    })
    .catch((error) => {
      returnToDispatch(dispatch, NOTIFICATION_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};
export const changeNightMode = (request) => (dispatch) => {
  updateNightModeFlag(request.night_mode);
  returnToDispatch(dispatch, SET_GUEST_NIGHT_MODE, request);
};
export const changeLanguageGuestAccess = (request) => (dispatch) => {
  AsyncStorage.setItem('currentLan', request.language_code);
  // Set language
  language.setLanguage(request.language_code);
  returnToDispatch(dispatch, SET_GUEST_LANGUAGE, request);
};

export const changeLanguageNotification = (request) => (dispatch) => {
  // returnToDispatch(dispatch, NOTIFICATION_REQUEST)
  const url = API.API_UPDATE_NOTI_LANGUAGE;

  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      updateNightModeFlag(response.data.data.night_mode);
      AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
      returnToDispatch(dispatch, LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, USER_LOGIN_SUCCESS, response.data.data);
      // returnToDispatch(dispatch, NOTIFICATION_SUCCESS, '')
    })
    .catch((error) => {
      // returnToDispatch(dispatch, NOTIFICATION_FAILURE)
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};
export const changeLanguage = (request) => (dispatch) => {
  const url = API.API_CHANGE_LANGUAGE;
  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      // updateNightModeFlag(response.data.data.night_mode)
      AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
      // returnToDispatch(dispatch, LOGIN_SUCCESS, response.data.data)
      // returnToDispatch(dispatch, USER_LOGIN_SUCCESS, response.data.data)
      // setTimeout(() => {
      //     let newReq = {}
      //     newReq.language_code = response.data.data.current_language
      //     returnToDispatch(dispatch, SET_GUEST_LANGUAGE, newReq)
      // }, 1000);
    })
    .catch((error) => {
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};

export const updateNightMode = (request) => (dispatch) => {
  returnToDispatch(dispatch, NIGHTMODE_REQUEST);
  const url = API.API_UPDATE_NIGHTMODE;

  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      updateNightModeFlag(response.data.data.night_mode);
      AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
      returnToDispatch(dispatch, LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, USER_LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, NIGHTMODE_SUCCESS, '');
    })
    .catch((error) => {
      returnToDispatch(dispatch, NIGHTMODE_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 50);
    });
};

export const logout = (request) => (dispatch) => {
  let isKeep = request.isKeep ? request.isKeep : 0;
  returnToDispatch(dispatch, LOGOUT_REQUEST);
  const url = API.API_SIGN_OUT;
  serverCall({url: url, request: request, method: 'post'})
    .then((response) => {
      // AsyncStorage.clear();
      if (isKeep === 0) {
        AsyncStorage.removeItem('userLogin');
      }
      AsyncStorage.removeItem('userId');
      // AsyncStorage.removeItem('biometryType');
      updateNightModeFlag(0);
      returnToDispatch(dispatch, LOGOUT_SUCCESS, {});
      returnToDispatch(dispatch, SET_DEFAULT_LANG, 'en');
      AsyncStorage.setItem('currentLan', 'en');
      language.setLanguage('en');
      AsyncStorage.removeItem('userData').then(() => {
        const resetLogin = ROUTER.reset({
          index: 0,
          actions: [ROUTER.navigate({routeName: 'Login'})],
        });
        dispatch(resetLogin);
      });
    })
    .catch((error) => {
      returnToDispatch(dispatch, LOGOUT_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
showAlert = (msg) => {
  Alert.alert('', msg);
};
returnToDispatch = (dispatch, type, payload) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
