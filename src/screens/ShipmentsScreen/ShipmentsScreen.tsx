import { Header } from "@components";
import { SCREENS } from "@configs";
import { ShipmentResponse } from "@models";
import { CheckAndScanStackParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { ListShipment } from "./components/ListShipment";
import styles from "./styles";
type NavigationRoute = RouteProp<
  CheckAndScanStackParamsList,
  SCREENS.SHIPMENTS_SCREEN
>;

export interface ShipmentsScreenParams {
  refNumber: string;
  shipments: Array<ShipmentResponse>;
}

export const ShipmentsScreen: FunctionComponent = () => {
  const routeNavigation = useRoute<NavigationRoute>();
  const navigation = useNavigation();
  const { refNumber, shipments } = routeNavigation?.params;
  return (
    <View style={styles.container}>
      <Header
        title={refNumber}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <ListShipment shipments={shipments} />
    </View>
  );
};
