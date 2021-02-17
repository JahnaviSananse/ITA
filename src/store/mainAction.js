import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import language from "../Localization";
import * as utility from "../Utility/util";

const version = DeviceInfo.getVersion();
export const serverCall = ({ url, request, method }) => {
  // NetInfo.isConnected.fetch().then(isConnected => {
  //     if (isConnected === false) {
  //         return null

  //     }
  // });
  return new Promise(function (success, failure) {
    NetInfo.fetch().then((isConnected) => {
      // if (isConnected === true) {
      AsyncStorage.getItem("currentLan").then((currentLan) => {
        let methodName = method ? method : "post";

        if (request === undefined || request === null) {
          request = {};
        }
        request.version = version;
        request.os_type = Platform.OS === "ios" ? 1 : 2;
        request.lang = currentLan ? currentLan : "en";

        AsyncStorage.getItem("userData").then((userdata) => {
          if (userdata) {
            let dataUser = JSON.parse(userdata);
            if (methodName === "post") {
              request.user_id = dataUser.user_id;
              request.lang = dataUser.current_language;
            }
          }

          // Record Event
          utility.recordEvent(
            `API: ${url} ${methodName} ${JSON.stringify(request)}`
          );

          let allKeys = Object.keys(request);
          let allValues = Object.values(request);

          const formData = new FormData();
          allKeys.map((currentKey, index) => {
            formData.append(currentKey, allValues[index]);
          });

          // Set language
          language.setLanguage(request.lang);

          let axios = require("axios");
          // axios.defaults.timeout = 1000 * 5;

          axios({
            method: methodName,
            data: methodName === "post" ? formData : null,
            params: methodName === "get" ? request : null,
            url: url,
            timeout: 1000 * 5,
          })
            .then((response) => {
              success(response);
            })
            .catch((error) => {
              if (error.response) {
                failure(error.response.data.message);
                //failure(language.InternetConnection);
              } else {
                // alert(error.code + '\n' + error.message);
                failure(
                  error.message === "Network Error"
                    ? language.InternetConnection
                    : language.InternetConnection
                );
              }
            });
        });
      });
      // } else {
      //   failure(language.InternetConnection);
      // }
    });
  });
};
