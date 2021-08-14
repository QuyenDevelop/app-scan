import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens";
import React from "react";

export type HomeStackParamsList = {
  [SCREENS.HOME_SCREEN]: undefined;
};

const HomeStackNavigator = createStackNavigator<HomeStackParamsList>();

export function HomeStackNavigation() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName={SCREENS.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStackNavigator.Screen
        name={SCREENS.HOME_SCREEN}
        component={HomeScreen}
      />
    </HomeStackNavigator.Navigator>
  );
}
