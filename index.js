/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import { name as appName } from "./app.json";
import EfexWarehouse from "./src/App";
LogBox.ignoreAllLogs(true);
console.reportErrorsAsExceptions = false;

AppRegistry.registerComponent(appName, () => EfexWarehouse);
