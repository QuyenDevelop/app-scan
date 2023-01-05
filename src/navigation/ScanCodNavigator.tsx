import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ScanCODScreen } from "@screens";
import React from "react";

export type ScanCodStackParamsList = {
  [SCREENS.COD_SCAN_SCREEN]: undefined;
};

const ScanCodStackNavigator = createStackNavigator<ScanCodStackParamsList>();

export function ScanCodStackNavigation() {
  return (
    <ScanCodStackNavigator.Navigator
      initialRouteName={SCREENS.COD_SCAN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ScanCodStackNavigator.Screen
        name={SCREENS.COD_SCAN_SCREEN}
        component={ScanCODScreen}
      />
    </ScanCodStackNavigator.Navigator>
  );
}
