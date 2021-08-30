/**
 * @format
 */

import { store } from "@redux";
import React from "react";
import { AppRegistry, LogBox } from "react-native";
import codePush from "react-native-code-push";
import { Provider } from "react-redux";
import { name as appName } from "./app.json";
import App from "./src/App";
LogBox.ignoreAllLogs(true);
console.reportErrorsAsExceptions = false;

const EfexWarehouse = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const codePushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

AppRegistry.registerComponent(appName, () =>
  codePush(codePushOptions)(EfexWarehouse),
);
