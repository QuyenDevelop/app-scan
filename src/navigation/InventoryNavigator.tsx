import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { InventoryScreen } from "@screens";
import React from "react";

export type InventoryParamsList = {
  [SCREENS.INVENTORY_SCREEN]: undefined;
};

const InventoryStackNavigator = createStackNavigator<InventoryParamsList>();

export const InventoryStack = () => {
  return (
    <InventoryStackNavigator.Navigator
      initialRouteName={SCREENS.INVENTORY_SCREEN}
    >
      <InventoryStackNavigator.Screen
        name={SCREENS.INVENTORY_SCREEN}
        component={InventoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStackNavigator.Navigator>
  );
};
