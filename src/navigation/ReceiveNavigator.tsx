import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { ReceiveScreen, ScanScreenParams } from "@screens";
import React from "react";

export type ReceiveParamsList = {
  [SCREENS.RECEIVE_SCREEN]: ScanScreenParams;
};

const ReceiveStackNavigator = createStackNavigator<ReceiveParamsList>();

export const ReceiveStack = () => {
  return (
    <ReceiveStackNavigator.Navigator initialRouteName={SCREENS.RECEIVE_SCREEN}>
      <ReceiveStackNavigator.Screen
        name={SCREENS.RECEIVE_SCREEN}
        component={ReceiveScreen}
        options={{
          headerShown: false,
        }}
      />
    </ReceiveStackNavigator.Navigator>
  );
};
