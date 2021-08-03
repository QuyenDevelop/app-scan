import { SCREENS } from "@configs";
import {
  AuthStackNavigation,
  BottomTabNavigator,
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
    </RootStack.Navigator>
  );
}
