import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { UpdateLocationScreen } from "@screens";
import React from "react";

export type UpdateLocationParamsList = {
  [SCREENS.UPDATE_lOCATION_SCREEN]: undefined;
};

const UpdateLocationNavigator =
  createStackNavigator<UpdateLocationParamsList>();

export const UpdateLocationStack = () => {
  return (
    <UpdateLocationNavigator.Navigator
      initialRouteName={SCREENS.UPDATE_lOCATION_SCREEN}
    >
      <UpdateLocationNavigator.Screen
        name={SCREENS.UPDATE_lOCATION_SCREEN}
        component={UpdateLocationScreen}
        options={{
          headerShown: false,
        }}
      />
    </UpdateLocationNavigator.Navigator>
  );
};
