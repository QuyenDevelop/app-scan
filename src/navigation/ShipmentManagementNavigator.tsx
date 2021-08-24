import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ShipmentManagementScreen } from "@screens";
import React from "react";

export type ShipmentManagementStackParamsList = {
  [SCREENS.SHIPMENT_MANAGEMENT_SCREEN]: undefined;
};

const ShipmentManagementStackNavigator =
  createStackNavigator<ShipmentManagementStackParamsList>();

export function ShipmentManagementStackNavigation() {
  return (
    <ShipmentManagementStackNavigator.Navigator
      initialRouteName={SCREENS.SHIPMENT_MANAGEMENT_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ShipmentManagementStackNavigator.Screen
        name={SCREENS.SHIPMENT_MANAGEMENT_SCREEN}
        component={ShipmentManagementScreen}
      />
    </ShipmentManagementStackNavigator.Navigator>
  );
}
