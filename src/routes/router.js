// import { NavigationContainerRef } from '@react-navigation/native';
import React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export function replace(name, params) {
  alert("NAVIGATION Ref", JSON.stringify(navigationRef.current));
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name }],
  });
}
export function goBack() {
  return navigationRef.current?.goBack();
}
