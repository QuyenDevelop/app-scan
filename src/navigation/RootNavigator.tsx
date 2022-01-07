import { SCREENS } from "@configs";
import {
  AuthStackNavigation,
  BottomTabNavigator,
  CheckAndScanStackNavigation,
  FeedbackStackNavigation,
  HomeStackNavigation,
  InventoryStack,
  ReceiveStack,
  ScanCodStackNavigation,
  ShipmentManagementStackNavigation,
  ShipmentStackNavigation,
} from "@navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { LaunchScreen, LaunchScreenRouteParams } from "@screens";
import React from "react";

const RootStack = createStackNavigator<RootParamList>();

export type RootParamList = {
  [SCREENS.LAUNCH_SCREEN]: LaunchScreenRouteParams;
  [SCREENS.BOTTOM_TAB_NAVIGATION]: undefined;
  [SCREENS.AUTH_STACK]: undefined;
  [SCREENS.SHIPMENT_STACK]: undefined;
  [SCREENS.HOME_STACK]: undefined;
  [SCREENS.CHECK_AND_SCAN_STACK]: undefined;
  [SCREENS.SCAN_COD_STACK]: undefined;
  [SCREENS.SHIPMENT_MANAGEMENT_STACK]: undefined;
  [SCREENS.RECEIVE_STACK]: undefined;
  [SCREENS.INVENTORY_STACK]: undefined;
  [SCREENS.FEEDBACK_STACK]: undefined;
};

export function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={SCREENS.LAUNCH_SCREEN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <RootStack.Screen name={SCREENS.LAUNCH_SCREEN} component={LaunchScreen} />
      <RootStack.Screen
        name={SCREENS.HOME_STACK}
        component={HomeStackNavigation}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={SCREENS.CHECK_AND_SCAN_STACK}
        component={CheckAndScanStackNavigation}
      />
      <RootStack.Screen
        name={SCREENS.SCAN_COD_STACK}
        component={ScanCodStackNavigation}
      />
      <RootStack.Screen
        name={SCREENS.BOTTOM_TAB_NAVIGATION}
        component={BottomTabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={SCREENS.AUTH_STACK}
        component={AuthStackNavigation}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={SCREENS.SHIPMENT_STACK}
        component={ShipmentStackNavigation}
      />
      <RootStack.Screen
        name={SCREENS.SHIPMENT_MANAGEMENT_STACK}
        component={ShipmentManagementStackNavigation}
      />
      <RootStack.Screen name={SCREENS.RECEIVE_STACK} component={ReceiveStack} />
      <RootStack.Screen
        name={SCREENS.INVENTORY_STACK}
        component={InventoryStack}
      />
      <RootStack.Screen
        name={SCREENS.FEEDBACK_STACK}
        component={FeedbackStackNavigation}
      />
    </RootStack.Navigator>
  );
}
