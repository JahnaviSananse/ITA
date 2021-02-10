import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {NotSignIn} from '.';
import * as ICONS from '../resources';
import * as utility from '../Utility/util';
import Discover from './Discover';
import Profile from './Profile';
const Tab = createBottomTabNavigator();
const Icon = (name, focused) => {
  let icon = null;
  if (name === 'Discover') {
    icon = focused ? ICONS.TB_IC_DISCOVER_SELECTED : ICONS.TB_IC_DISCOVER;
  } else if (name == 'Library') {
    icon = focused ? ICONS.TB_IC_LIBRARY_SELECTED : ICONS.TB_IC_LIBRARY;
  } else if (name === 'Resources') {
    icon = focused ? ICONS.TB_IC_RESOURCES_SELECTED : ICONS.TB_IC_RESOURCES;
  } else if (name === 'Profile') {
    icon = focused ? ICONS.TB_IC_PROFILE_SELECTED : ICONS.TB_IC_PROFILE;
  }
  return (
    <FastImage
      style={{height: 22, width: 22}}
      source={icon}
      resizeMode={'contain'}
    />
  );
};
const GuestTabbarScreen = (props) => {
  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName={Discover}
      backBehavior="initialRoute"
      // screenOptions={{
      //   swipeEnabled: true,
      //   animationEnabled: false,
      //   gesturesEnabled: false,
      // }}
      tabBarOptions={{
        style: {
          backgroundColor: utility.changeBackgroundColor('#FFFFFF'),
        },
        showLabel: false,
      }}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({color, size, focused}) => Icon('Discover', focused),
        }}
      />
      <Tab.Screen
        name="Library"
        component={NotSignIn}
        options={{
          tabBarIcon: ({color, size, focused}) => Icon('Library', focused),
        }}
      />
      <Tab.Screen
        name="Resources"
        component={NotSignIn}
        options={{
          tabBarIcon: ({color, size, focused}) => Icon('Resources', focused),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        v
        options={{
          tabBarIcon: ({color, size, focused}) => Icon('Profile', focused),
        }}
      />
    </Tab.Navigator>
  );
};
// const GuestTabbarScreen = createBottomTabNavigator(
//   {
//     Discover: Discover,
//     Library: NotSignIn,
//     Resources: NotSignIn,
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
//           // icon = focused ? ICONS.TB_IC_DISCOVER_SELECTED : ICONS.TB_IC_TAB1
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
//             resizeMode={FastImage.resizeMode.contain}
//           />
//         );
//       },
//     }),
//     tabBarOptions: {
//       // activeTintColor: COLOR.TAB_SELECTED,
//       // inactiveTintColor: COLOR.TAB_NORMAL,
//       showLabel: false,
//       style: {
//         backgroundColor: utility.changeBackgroundColor('#FFFFFF'),
//       },
//     },
//   },
// );
export default GuestTabbarScreen;
