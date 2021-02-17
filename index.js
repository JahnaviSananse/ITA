/**
 * @format
 */
import React from "react";
import { AppRegistry, YellowBox } from "react-native";
import { Provider } from "react-redux";
// import {store} from './src/store';
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
// import thunk from 'redux-thunk';
import { name as appName } from "./app.json";
import Root from "./src/Root";
import rootReducer from "./src/store";
import logger from "redux-logger";

/**
 * Store configuration
 */
export const configureStore = () => {
  const middleware = [];
  middleware.push(thunkMiddleware);
  middleware.push(logger);

  if (__DEV__) {
    const loggerMiddleware = createLogger({ collapsed: true });
    middleware.push(loggerMiddleware);
  }

  const composer = compose(applyMiddleware(...middleware));

  const store = createStore(rootReducer, {}, composer);

  return store;
};
// export const configureStore;
export const store = configureStore();

let ITA = () => {
  console.log("Store", store);
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => ITA);
YellowBox.ignoreWarnings([
  "Warning: Async Storage has been extracted from react-native core",
]);
