import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ShipmentDetailScreen, ShipmentDetailScreenParams } from "@screens";
import React from "react";

export type ShipmentStackParamsList = {
  [SCREENS.SHIPMENT_DETAIL_SCREEN]: ShipmentDetailScreenParams;
};

const ShipmentStackNavigator = createStackNavigator<ShipmentStackParamsList>();

export function ShipmentStackNavigation() {
  return (
    <ShipmentStackNavigator.Navigator
      initialRouteName={SCREENS.SHIPMENT_DETAIL_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ShipmentStackNavigator.Screen
        name={SCREENS.SHIPMENT_DETAIL_SCREEN}
        component={ShipmentDetailScreen}
      />
    </ShipmentStackNavigator.Navigator>
  );
}
