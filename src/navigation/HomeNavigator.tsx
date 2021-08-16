import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, MenuScreen } from "@screens";
import React from "react";

export type HomeStackParamsList = {
  [SCREENS.HOME_SCREEN]: undefined;
  [SCREENS.MENU_SCREEN]: undefined;
};

const HomeStackNavigator = createStackNavigator<HomeStackParamsList>();

export function HomeStackNavigation() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName={SCREENS.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
      mode="modal"
    >
      <HomeStackNavigator.Screen
        name={SCREENS.HOME_SCREEN}
        component={HomeScreen}
      />
      <HomeStackNavigator.Screen
        name={SCREENS.MENU_SCREEN}
        component={MenuScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}
