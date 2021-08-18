import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AddServicePhotosScreen,
  AddServicePhotosScreenParams,
  PhotoLibraryScreen,
  PhotoLibraryScreenParams,
  ShipmentDetailCODScreen,
  ShipmentDetailCODScreenParams,
  ShipmentDetailScreen,
  ShipmentDetailScreenParams,
  UpdateCODScreen,
  UpdateCODScreenParams,
  UploadScreen,
  UploadScreenParams,
} from "@screens";
import React from "react";

export type ShipmentStackParamsList = {
  [SCREENS.SHIPMENT_DETAIL_SCREEN]: ShipmentDetailScreenParams;
  [SCREENS.UPLOAD_SCREEN]: UploadScreenParams;
  [SCREENS.PHOTO_LIBRARY_SCREEN]: PhotoLibraryScreenParams;
  [SCREENS.UPDATE_COD_SCREEN]: UpdateCODScreenParams;
  [SCREENS.SHIPMENT_DETAIL_COD_SCREEN]: ShipmentDetailCODScreenParams;
  [SCREENS.ADD_SERVICE_PHOTOS_SCREEN]: AddServicePhotosScreenParams;
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
      <ShipmentStackNavigator.Screen
        name={SCREENS.UPLOAD_SCREEN}
        component={UploadScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShipmentStackNavigator.Screen
        name={SCREENS.PHOTO_LIBRARY_SCREEN}
        component={PhotoLibraryScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShipmentStackNavigator.Screen
        name={SCREENS.UPDATE_COD_SCREEN}
        component={UpdateCODScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShipmentStackNavigator.Screen
        name={SCREENS.SHIPMENT_DETAIL_COD_SCREEN}
        component={ShipmentDetailCODScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShipmentStackNavigator.Screen
        name={SCREENS.ADD_SERVICE_PHOTOS_SCREEN}
        component={AddServicePhotosScreen}
        options={{
          headerShown: false,
        }}
      />
    </ShipmentStackNavigator.Navigator>
  );
}
