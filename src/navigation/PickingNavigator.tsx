import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DeliveryBillDetailParams,
  DeliveryBillDetailScreen,
  DeliveryBillManagementScreen,
  PickingScreen,
} from "@screens";
import React from "react";

export type PickingParamsList = {
  [SCREENS.DELIVERY_BILL_MANAGEMENT_SCREEN]: undefined;
  [SCREENS.DELIVERY_BILL_DETAIL_SCREEN]: DeliveryBillDetailParams;
  [SCREENS.PICKING_SCREEN]: undefined;
};

const PickingStackNavigator = createStackNavigator<PickingParamsList>();

export const PickingStack = () => {
  return (
    <PickingStackNavigator.Navigator
      initialRouteName={SCREENS.DELIVERY_BILL_MANAGEMENT_SCREEN}
    >
      <PickingStackNavigator.Screen
        name={SCREENS.DELIVERY_BILL_MANAGEMENT_SCREEN}
        component={DeliveryBillManagementScreen}
        options={{
          headerShown: false,
        }}
      />
      <PickingStackNavigator.Screen
        name={SCREENS.DELIVERY_BILL_DETAIL_SCREEN}
        component={DeliveryBillDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <PickingStackNavigator.Screen
        name={SCREENS.PICKING_SCREEN}
        component={PickingScreen}
        options={{
          headerShown: false,
        }}
      />
    </PickingStackNavigator.Navigator>
  );
};
