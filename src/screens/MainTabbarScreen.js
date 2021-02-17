import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import * as ICONS from "../resources";
import * as utility from "./../Utility/util";
import Discover from "./Discover";
import Library from "./Library";
import Profile from "./Profile";
import Resources from "./Resources/index";
const Tab = createBottomTabNavigator();
const Icon = (name, focused) => {
  let icon = null;
  if (name === "Discover") {
    icon = focused ? ICONS.TB_IC_DISCOVER_SELECTED : ICONS.TB_IC_DISCOVER;
  } else if (name == "Library") {
    icon = focused ? ICONS.TB_IC_LIBRARY_SELECTED : ICONS.TB_IC_LIBRARY;
  } else if (name === "Resources") {
    icon = focused ? ICONS.TB_IC_RESOURCES_SELECTED : ICONS.TB_IC_RESOURCES;
  } else if (name === "Profile") {
    icon = focused ? ICONS.TB_IC_PROFILE_SELECTED : ICONS.TB_IC_PROFILE;
  }
  return (
    <FastImage
      style={{ height: 22, width: 22 }}
      source={icon}
      resizeMode={"contain"}
    />
  );
};
const MainTabbarScreen = (props) => {
  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName={Discover}
      backBehavior="initialRoute"
      tabBarOptions={{
        style: {
          backgroundColor: utility.changeBackgroundColor("#FFFFFF"),
        },
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size, focused }) => Icon("Discover", focused),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ color, size, focused }) => Icon("Library", focused),
        }}
      />
      <Tab.Screen
        name="Resources"
        component={Resources}
        options={{
          tabBarIcon: ({ color, size, focused }) => Icon("Resources", focused),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        v
        options={{
          tabBarIcon: ({ color, size, focused }) => Icon("Profile", focused),
        }}
      />
    </Tab.Navigator>
  );
};
const { height } = Dimensions.get("window");
// const MainTabbarScreen = createBottomTabNavigator(
//   {
//     Discover: Discover,
//     Library: Library,
//     Resources: Resources,
//     Profile: Profile,
//   },
//   {
//     swipeEnabled: true,
//     animationEnabled: false,
//     gesturesEnabled: false,
//     defaultNavigationOptions: ({navigation}) => ({
//       tabBarIcon: ({focused, horizontal, tintColor}) => {
//         const {routeName} = navigation.state;
//         let icon = null;
//         if (routeName === 'Discover') {
//           icon = focused ? ICONS.TB_IC_DISCOVER_SELECTED : ICONS.TB_IC_DISCOVER;
//         } else if (routeName == 'Library') {
//           icon = focused ? ICONS.TB_IC_LIBRARY_SELECTED : ICONS.TB_IC_LIBRARY;
//         } else if (routeName === 'Resources') {
//           icon = focused
//             ? ICONS.TB_IC_RESOURCES_SELECTED
//             : ICONS.TB_IC_RESOURCES;
//         } else if (routeName === 'Profile') {
//           icon = focused ? ICONS.TB_IC_PROFILE_SELECTED : ICONS.TB_IC_PROFILE;
//         }
//         return (
//           <FastImage
//             style={{height: 22, width: 22}}
//             source={icon}
//             resizeMode={'contain'}
//           />
//         );
//       },
//     }),
//     tabBarOptions: {
//       showLabel: false,
//       style: {
//         backgroundColor: '#FFFFFF',
//       },
//     },
//   },
// );
export default MainTabbarScreen;
