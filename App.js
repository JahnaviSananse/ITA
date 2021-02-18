import React from "react";
import Home from "./Home";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

// class App extends PureComponent<IAppProps> {
//   componentDidMount() {
//     Orientation.lockToPortrait();
//   }
//   render() {
//     return <Root />;
//   }
// }

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  return <Home />;
};

export default App;
