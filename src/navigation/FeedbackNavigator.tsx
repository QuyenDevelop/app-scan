import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AddExploitPhotosScreenParams,
  ExploitShipmentUploadScreen,
  FeedbackParams,
  FeedbackScreen,
  ScanShipmentCodeScreen,
} from "@screens";
import React from "react";

export type FeedbackStackList = {
  [SCREENS.SCAN_SHIPMENT_CODE]: undefined;
  [SCREENS.FEED_BACK_SCREEN]: FeedbackParams;
  [SCREENS.EXPLOIT_UPLOAD_SCREEN]: AddExploitPhotosScreenParams;
};

const FeedbackStackNavigator = createStackNavigator<FeedbackStackList>();

export function FeedbackStackNavigation() {
  return (
    <FeedbackStackNavigator.Navigator
      initialRouteName={SCREENS.SCAN_SHIPMENT_CODE}
      screenOptions={{
        headerShown: false,
      }}
    >
      <FeedbackStackNavigator.Screen
        name={SCREENS.SCAN_SHIPMENT_CODE}
        component={ScanShipmentCodeScreen}
      />
      <FeedbackStackNavigator.Screen
        name={SCREENS.FEED_BACK_SCREEN}
        component={FeedbackScreen}
      />
      <FeedbackStackNavigator.Screen
        name={SCREENS.EXPLOIT_UPLOAD_SCREEN}
        component={ExploitShipmentUploadScreen}
        options={{
          headerShown: false,
        }}
      />
    </FeedbackStackNavigator.Navigator>
  );
}
