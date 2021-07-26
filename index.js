/**
 * @format
 */

import { store } from "@redux";
import React from "react";
import { AppRegistry, LogBox } from "react-native";
import { Provider } from "react-redux";
import { name as appName } from "./app.json";
import App from "./src/App";
LogBox.ignoreAllLogs(true);
console.reportErrorsAsExceptions = false;

const EfexMobileApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => EfexMobileApp);
