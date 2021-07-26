import { SCREENS } from "@configs";
import { AuthStackNavigation, BottomTabNavigator } from "@navigation";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const RootStack = createStackNavigator<RootParamList>();

export type RootParamList = {
  [SCREENS.BOTTOM_TAB_NAVIGATION]: undefined;
  [SCREENS.AUTH_STACK]: undefined;
};

export function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
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
    </RootStack.Navigator>
  );
}
