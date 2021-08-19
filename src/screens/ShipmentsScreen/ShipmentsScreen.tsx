import { shipmentApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert } from "@helpers";
import { useShipmentInfo, useShow } from "@hooks";
import { ShipmentResponse } from "@models";
import { CheckAndScanStackParamsList } from "@navigation";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
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
  useShipmentInfo();
  const routeNavigation = useRoute<NavigationRoute>();
  const navigation = useNavigation();
  const { refNumber, shipments } = routeNavigation?.params;
  const [listShipment, setListShipment] = useState<Array<ShipmentResponse>>(
    shipments || [],
  );
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();

  const isFirstMount = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (!isFirstMount.current) {
        showIsLoadingFetchData();
        shipmentApi
          .scanShipment(refNumber)
          ?.then(shipment => {
            console.log("🚀🚀🚀 => useCallback => shipment", shipment);
            setListShipment(shipment?.data || []);
          })
          .catch(() => {
            setListShipment([]);
            Alert.error("error.errorServer");
          })
          .finally(() => {
            hideIsLoadingFetchData();
          });
      }
    }, [hideIsLoadingFetchData, refNumber, showIsLoadingFetchData]),
  );

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={refNumber}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      {isLoadingFetchData ? (
        <View style={styles.loadingView}>
          <ActivityIndicator color={Themes.colors.collGray40} />
        </View>
      ) : (
        <ListShipment shipments={listShipment} />
      )}
    </View>
  );
};
