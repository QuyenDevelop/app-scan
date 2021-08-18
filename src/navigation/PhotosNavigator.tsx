import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import { PhotoLibraryScreen, PhotoLibraryScreenParams } from "@screens";
import React from "react";

export type PhotosStackParamsList = {
  [SCREENS.PHOTO_LIBRARY_SCREEN]: PhotoLibraryScreenParams;
};

const PhotosStackNavigator = createStackNavigator<PhotosStackParamsList>();

export function PhotosStackNavigation() {
  return (
    <PhotosStackNavigator.Navigator
      initialRouteName={SCREENS.PHOTO_LIBRARY_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <PhotosStackNavigator.Screen
        name={SCREENS.PHOTO_LIBRARY_SCREEN}
        component={PhotoLibraryScreen}
      />
    </PhotosStackNavigator.Navigator>
  );
}
