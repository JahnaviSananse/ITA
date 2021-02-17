import AsyncStorage from "@react-native-community/async-storage";
import { Alert, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import Share from "react-native-share";
// import { StackActions } from "@react-navigation/stack";
import RNFetchBlob from "rn-fetch-blob";
import * as API from "../../constants/api";
import * as key from "../../constants/keys";
import { navigationRef } from "../../routes/router";
// import navigationRef from "../../routes/router";
import { updateNightModeFlag } from "../../Utility/util";
import { DISCOVER_LIST_CLEAR } from "../Discover/actionTypes";
// import { NavigationActions } from "@react-navigation/native";
import { serverCall } from "../mainAction";
import { USER_LOGIN_SUCCESS } from "../User/actionTypes";
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
  REQEUST_NEW_ONE_SUCCESS,
  REQUEST_NEW_ONE_FAILURE,
  REQUEST_NEW_ONE_REQUEST,
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
// export const setSessionData = (request) => (dispatch) => {
//     AsyncStorage.getItem(kEventList).then((event) => {
//         alert("hello there")
//     }).done()
//     returnToDispatch(dispatch, CATEGORY_DATA_REQUEST)
//     const url = API.API_CONFIGURE_DATA
//     serverCall({ url: url, request: request, method: 'get' }).then((response) => {
//         AsyncStorage.setItem('configData', response.data.data)
//         returnToDispatch(dispatch, CATEGORY_DATA_SUCCESS, response.data.data)
//     }).catch((error) => {
//         returnToDispatch(dispatch, CATEGORY_DATA_FAILURE)
//         setTimeout(() => {
//             alert(error)
//         }, 100);
//     })
// }
export const checkLogin = (navigate) => (dispatch) => {
  console.log("inside logon===>>>", navigate);
  returnToDispatch(dispatch, DISCOVER_LIST_CLEAR, "");
  // dispatch(checkForNavigation())
  setTimeout(() => {
    try {
      AsyncStorage.getItem("userData")
        .then((userdata) => {
          if (userdata) {
            let dataUser = JSON.parse(userdata);
            let user_id = dataUser.user_id;
            serverCall({
              url: API.API_USER_CHECK,
              request: { user_id: user_id },
              method: "post",
            })
              .then((res) => {
                console.log("rereree");
                AsyncStorage.getItem(key.kEventList)
                  .then((event) => {
                    if (event) {
                      let sessionString = " Model :" + DeviceInfo.getModel();
                      sessionString =
                        sessionString +
                        " Device type :" +
                        DeviceInfo.getDeviceType();
                      sessionString =
                        sessionString + " Brand :" + DeviceInfo.getBrand();
                      sessionString =
                        sessionString +
                        " Build Number :" +
                        DeviceInfo.getBuildNumber();
                      sessionString =
                        sessionString +
                        " Device Locale :" +
                        DeviceInfo.getDevice().then((i) => {
                          console.log("j", i);
                        });
                      sessionString =
                        sessionString +
                        " Device Free Storage :" +
                        DeviceInfo.getFreeDiskStorage();
                      sessionString =
                        sessionString +
                        " Manufacturer :" +
                        DeviceInfo.getManufacturer();
                      sessionString =
                        sessionString +
                        " System Version :" +
                        DeviceInfo.getSystemVersion();
                      const url = API.API_SET_SESSIONDATA;
                      let request = {};
                      request.user_id = user_id;
                      request.current_version = DeviceInfo.getVersion();
                      request.device_info = sessionString;
                      request.session_data = event;
                      serverCall({ url: url, request: request, method: "post" })
                        .then((response) => {
                          // console.log("rEsponseLogin=====>>>>", response);
                          updateNightModeFlag(dataUser.night_mode);
                          AsyncStorage.setItem(key.kEventList, "");
                          // returnToDispatch(dispatch, LOGIN_SUCCESS, dataUser);
                          dispatch({
                            type: LOGIN_SUCCESS,
                            payload: dataUser,
                          });
                          dispatch({
                            type: USER_LOGIN_SUCCESS,
                            payload: dataUser,
                          });
                          // returnToDispatch(
                          //   dispatch,
                          //   USER_LOGIN_SUCCESS,
                          //   dataUser
                          // );
                          dispatch(checkForNavigation(navigate));
                        })
                        .catch((error) => {
                          updateNightModeFlag(dataUser.night_mode);
                          returnToDispatch(dispatch, LOGIN_SUCCESS, dataUser);
                          returnToDispatch(
                            dispatch,
                            USER_LOGIN_SUCCESS,
                            dataUser
                          );
                          dispatch(checkForNavigation(navigate));
                        });
                    } else {
                      updateNightModeFlag(dataUser.night_mode);
                      returnToDispatch(dispatch, LOGIN_SUCCESS, dataUser);
                      returnToDispatch(dispatch, USER_LOGIN_SUCCESS, dataUser);
                      dispatch(checkForNavigation(navigate));
                    }
                  })
                  .done();
              })
              .catch((error) => {
                AsyncStorage.setItem(key.kEventList, "");
                const resetLogin = navigationRef.navigate("Login");
                dispatch(resetLogin);
              });
          } else {
            console.log("inside else");
            // ROUTER?.navigate("Login");
            navigate.navigate("Login");
            // dispatch(
            //   ROUTER.navigate({
            //     routeName: "Login",
            //   })
            // );

            //show gettingstarted here
            // dispatch(checkForNavigation(JSON.parse()));
            // AsyncStorage.setItem(key.kEventList, "");
            // dispatch(checkForNavigationLogin());
            // const resetLogin = StackNavigator.reset({
            //   index: 0,
            //   actions: [ROUTER.navigate({ routeName: "Login" })],
            // });
            // dispatch(resetLogin);
          }
        })
        .done();
    } catch (error) {
      AsyncStorage.setItem(key.kEventList, "");
      // dispatch(checkForNavigationLogin());
      AsyncStorage.getItem("getStarted").then((response) => {
        if (response) {
          // ROUTER.replace("Login");
          // const resetLogin = ROUTER.replace("Login");
          // dispatch(resetLogin);

          dispatch(
            navigate.navigate({
              routeName: "Login",
            })
          );
        } else {
          AsyncStorage.setItem("getStarted", "getting started over");
          dispatch(
            navigate.navigate({
              routeName: "GettingStarted",
              params: {
                screen: "main",
                isLogin: "1",
              },
            })
          );
        }
      });
      // const resetLogin = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: "Login" })],
      // });
      // dispatch(resetLogin);
    }
  }, 500);
};
export const checkForNavigationLogin = (navigate) => (dispatch) => {
  dispatch(
    navigate.navigate({
      routeName: "Login",
    })
  );
  AsyncStorage.getItem("getStarted").then((response) => {
    if (response) {
      dispatch(
        navigate.navigate({
          routeName: "Login",
        })
      );
    } else {
      AsyncStorage.setItem("getStarted", "getting started over");
      dispatch(
        navigate.navigate({
          routeName: "GettingStarted",
          params: {
            screen: "main",
            isLogin: "1",
          },
        })
      );
    }
  });
};
export const checkForNavigation = (navigate) => (dispatch) => {
  // AsyncStorage.getItem('userGetStarted').then((response) => {
  //     let isTabbar = false
  //     if (response) {
  //         let userData = JSON.parse(response)
  //         if (userData.includes(mainUserData.user_id)) {
  //             isTabbar = true
  //         }
  //     }
  //     if (isTabbar) {
  //         const resetTabbar = StackActions.reset({
  //             index: 0,
  //             actions: [NavigationActions.navigate({ routeName: 'MainTabbarScreen' })],
  //         });
  //         dispatch(resetTabbar)
  //     } else {
  //         dispatch(NavigationActions.navigate({
  //             routeName: 'GettingStarted',
  //             params: {
  //                 'screen': 'main',
  //                 'isLogin': '1'
  //             }
  //         }))
  //     }
  // });
  AsyncStorage.getItem("getStarted").then((response) => {
    if (response) {
      // navigation.navigate("MainTabbarScreen");
      navigate.replace("MainTabbarScreen");
      // dispatch(resetTabbar);
    } else {
      AsyncStorage.setItem("getStarted", "getting started over");
      dispatch(
        navigate.navigate({
          routeName: "GettingStarted",
          params: {
            screen: "main",
            isLogin: "1",
          },
        })
      );
    }
  });
};
export const tabbarNavigation = () => (dispatch) => {
  const resetTabbar = navigationRef.replace("MainTabbarScreen");
  dispatch(resetTabbar);
};
export const getCommonConfig = (request) => (dispatch) => {
  returnToDispatch(dispatch, CATEGORY_DATA_REQUEST);
  const url = API.API_CONFIGURE_DATA;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      returnToDispatch(dispatch, CATEGORY_DATA_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, CATEGORY_DATA_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const resendCode = (request) => (dispatch) => {
  returnToDispatch(dispatch, REQUEST_NEW_ONE_REQUEST);
  const url = API.API_REQUEST_NEW_ONE;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      returnToDispatch(dispatch, REQEUST_NEW_ONE_SUCCESS, response.data.data);
      showAlert(response.data.message);
    })
    .catch((error) => {
      returnToDispatch(dispatch, REQUEST_NEW_ONE_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const checkAppVersion = () => (dispatch) => {
  returnToDispatch(dispatch, CHECK_VERSION_REQUEST);
  const url = API.API_VERSION_CHECK;
  let request = {};
  request.os_type = Platform.OS === "ios" ? 1 : 0;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      returnToDispatch(dispatch, CHECK_VERSION_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, CHECK_VERSION_FAILURE);
    });
};
export const login = (request) => (dispatch) => {
  console.log("hekkokoko");
  returnToDispatch(dispatch, DISCOVER_LIST_CLEAR, "");
  returnToDispatch(dispatch, LOGIN_REQUEST);
  const url = API.API_LOGIN;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      console.log("response1232312123", response.data);
      updateNightModeFlag(response.data.data.night_mode);
      AsyncStorage.setItem("userLogin", JSON.stringify(request));
      AsyncStorage.setItem("userData", JSON.stringify(response.data.data));
      AsyncStorage.setItem(
        "user_id",
        JSON.stringify(response.data.data.user_id)
      );
      returnToDispatch(dispatch, LOGIN_SUCCESS, response.data.data);
      returnToDispatch(dispatch, USER_LOGIN_SUCCESS, response.data.data);
      // setTimeout(() => {
      //   const resetTabbar = ROUTER.replace("MainTabbarScreen");
      //   dispatch(resetTabbar);
      // }, 50);
    })
    .catch((error) => {
      returnToDispatch(dispatch, LOGIN_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const clearShareData = (request) => (dispatch) => {
  try {
    returnToDispatch(dispatch, SHAREING_OPEN);
  } catch (err) {
    console.log("error", err);
  }
};
export const shareData = (request) => (dispatch) => {
  let isPDF = request.indexOf(".pdf") > -1 ? true : false;
  if (isPDF === false) {
    let isFile = /\.(gif|jpg|jpeg|tiff|png)$/i.test(request);
    if (isFile === false) {
      let options = {
        message: request,
      };
      try {
        Share.open(options);
      } catch (error) {
        console.log(error);
      }
      return;
    }
  }
  returnToDispatch(dispatch, SHAREING_REQUEST);
  let splitArray = request.split("/");
  let filename = "/" + splitArray.reverse()[0];
  let dirs = RNFetchBlob.fs.dirs;
  let type = isPDF ? "application/pdf" : "image/png";
  let fileUrl = request;
  let filePath = null;
  let file_url_length = fileUrl.length;
  const configOptions = {
    fileCache: true,
    path: dirs.DocumentDir + (type === "application/pdf" ? filename : filename),
  };
  if (Platform.OS === "ios") {
    RNFetchBlob.config(configOptions)
      .fetch("GET", fileUrl)
      .then(async (resp) => {
        filePath = resp.path();
        let options = {
          type: type,
          url: filePath,
          failOnCancel: false,
        };
        setTimeout(() => {
          returnToDispatch(dispatch, SHAREING_SUCCESS);
        }, 400);
        try {
        } catch (error) {}
        await Share.open(options)
          .then((res) => {})
          .catch((err) => {});
        // returnToDispatch(dispatch, SHAREING_SUCCESS)
        await RNFS.unlink(filePath);
      })
      .catch((error) => {
        //  setTimeout(() => {
        //        returnToDispatch(dispatch, SHAREING_FAILURE);
        //    }, 400)
      });
  } else {
    RNFetchBlob.config(configOptions)
      .fetch("GET", fileUrl)
      .then((resp) => {
        filePath = resp.path();
        return resp.readFile("base64");
      })
      .then(async (base64Data) => {
        base64Data = `data:${type};base64,` + base64Data;
        await Share.open({ url: base64Data });
        returnToDispatch(dispatch, SHAREING_SUCCESS);
        await RNFS.unlink(filePath);
      })
      .catch((error) => {
        returnToDispatch(dispatch, SHAREING_FAILURE);
      });
  }
  // .then((resp) => {
  //     filePath = resp.path();
  //     let options = {
  //         type: type,
  //         url: Platform.OS === 'android' ? 'file://' + filePath : filePath
  //     };
  //     setTimeout(() => {
  //         // alert(JSON.stringify(options))
  //         Share.open(options);
  //     }, 100);
  //     returnToDispatch(dispatch, SHAREING_SUCCESS)
  //     RNFS.unlink(filePath);
  // }).catch((error) => {
  //     returnToDispatch(dispatch, SHAREING_FAILURE)
  // });
};
export const signupIntroducer = (request) => (dispatch) => {
  returnToDispatch(dispatch, SIGNUP_REQUEST_INTORDUCER);
  const url = API.API_GET_INVESTOR;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      returnToDispatch(dispatch, SIGNUP_SUCCESS_INTORDUCER, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, SIGNUP_FAILURE_INTORDUCER);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const resetPassword = (request) => (dispatch) => {
  returnToDispatch(dispatch, RESET_REQUEST);
  const url = API.API_RESET_PASSWORD;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      // changePassword(dispatch, response.data.data)
      returnToDispatch(dispatch, RESET_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, RESET_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const signup = (request) => (dispatch) => {
  returnToDispatch(dispatch, SIGNUP_REQUEST);
  const url = API.API_NEW_PASSWORD_SETUP;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      // signupSuccess(dispatch, response.data.data)
      returnToDispatch(dispatch, SIGNUP_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, SIGNUP_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const forgetPassword = (request) => (dispatch) => {
  returnToDispatch(dispatch, FORGET_REQUEST);
  const url = API.API_CHECK_INTRODUCER_FORGOT;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      returnToDispatch(dispatch, FORGET_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, FORGET_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
export const confirmationCode = (request) => (dispatch) => {
  returnToDispatch(dispatch, CODE_REQUEST);
  const url = API.API_CONFIRM_CODE;
  serverCall({ url: url, request: request, method: "post" })
    .then((response) => {
      // checkConfirmCode(dispatch, response.data.data)
      returnToDispatch(dispatch, CODE_SUCCESS, response.data.data);
    })
    .catch((error) => {
      returnToDispatch(dispatch, CODE_FAILURE);
      setTimeout(() => {
        showAlert(error);
      }, 100);
    });
};
showAlert = (msg) => {
  Alert.alert("", msg);
};
returnToDispatch = (dispatch, type, payload) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
export const updateInternetStatus = (status) => (dispatch) => {
  dispatch({
    type: INTERNET_STATE,
    payload: status,
  });
};
