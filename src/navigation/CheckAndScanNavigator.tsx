import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ScanScreen,
  ScanScreenParams,
  ShipmentsScreen,
  ShipmentsScreenParams,
} from "@screens";
import React from "react";

export type CheckAndScanStackParamsList = {
  [SCREENS.SCAN_SCREEN]: ScanScreenParams;
  [SCREENS.SHIPMENTS_SCREEN]: ShipmentsScreenParams;
};

const CheckAndScanStackNavigator =
  createStackNavigator<CheckAndScanStackParamsList>();

export function CheckAndScanStackNavigation() {
  return (
    <CheckAndScanStackNavigator.Navigator
      initialRouteName={SCREENS.SCAN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <CheckAndScanStackNavigator.Screen
        name={SCREENS.SCAN_SCREEN}
        component={ScanScreen}
      />
      <CheckAndScanStackNavigator.Screen
        name={SCREENS.SHIPMENTS_SCREEN}
        component={ShipmentsScreen}
      />
    </CheckAndScanStackNavigator.Navigator>
  );
}
