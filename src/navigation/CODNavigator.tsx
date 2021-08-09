import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ScanCODScreen } from "@screens";
import React from "react";

export type CODStackParamsList = {
  [SCREENS.COD_SCAN_SCREEN]: undefined;
};

export const CODStackNavigator = createStackNavigator<CODStackParamsList>();
export const CODStack = () => {
  return (
    <CODStackNavigator.Navigator initialRouteName={SCREENS.COD_SCAN_SCREEN}>
      <CODStackNavigator.Screen
        name={SCREENS.COD_SCAN_SCREEN}
        component={ScanCODScreen}
        options={{
          headerShown: false,
        }}
      />
    </CODStackNavigator.Navigator>
  );
};
