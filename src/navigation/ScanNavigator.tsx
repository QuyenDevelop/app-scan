import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ScanScreen } from "@screens";
import React from "react";

export type ScanParamsList = {
  [SCREENS.SCAN_SCREEN]: undefined;
};

const ScanStackNavigator = createStackNavigator<ScanParamsList>();

export const ScanStack = () => {
  return (
    <ScanStackNavigator.Navigator initialRouteName={SCREENS.SCAN_SCREEN}>
      <ScanStackNavigator.Screen
        name={SCREENS.SCAN_SCREEN}
        component={ScanScreen}
        options={{
          headerShown: false,
        }}
      />
    </ScanStackNavigator.Navigator>
  );
};
