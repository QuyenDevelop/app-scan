import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ReceivePhotoLibraryScreen,
  ReceivePhotoLibraryScreenParams,
  ReceiveScreen,
  ReceiveUploadImagesScreen,
  ReceiveUploadScreenParams,
  ScanScreenParams,
} from "@screens";
import React from "react";

export type ReceiveParamsList = {
  [SCREENS.RECEIVE_SCREEN]: ScanScreenParams;
  [SCREENS.RECEIVE_UPLOAD_SCREEN]: ReceiveUploadScreenParams;
  [SCREENS.RECEIVE_PHOTOS_SCREEN]: ReceivePhotoLibraryScreenParams;
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
      <ReceiveStackNavigator.Screen
        name={SCREENS.RECEIVE_UPLOAD_SCREEN}
        component={ReceiveUploadImagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <ReceiveStackNavigator.Screen
        name={SCREENS.RECEIVE_PHOTOS_SCREEN}
        component={ReceivePhotoLibraryScreen}
        options={{
          headerShown: false,
        }}
      />
    </ReceiveStackNavigator.Navigator>
  );
};
