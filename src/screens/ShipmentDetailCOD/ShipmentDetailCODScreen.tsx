import { shipmentApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { ShipmentAddServiceResponse, ShipmentResponse } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import { CodDetailTab } from "./components/CodDetailTab";
import { ContentInfoTab } from "./components/ContentInfoTab";
import { GeneralInfoTab } from "./components/GeneralInfoTab";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.SHIPMENT_DETAIL_COD_SCREEN
>;

export interface ShipmentDetailCODScreenParams {
  item: ShipmentResponse;
}

export const ShipmentDetailCODScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routeNavigation = useRoute<NavigationRoute>();
  const { item } = routeNavigation?.params || {};
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [addServices, setAddServices] = useState<
    Array<ShipmentAddServiceResponse>
  >([]);

  const [routes] = useState([
    { key: "GeneralInfoTab", title: translate("label.tab.generalInfoTab") },
    { key: "ContentInfoTab", title: translate("label.tab.contentInfoTab") },
    { key: "CodDetailTab", title: translate("label.tab.codDetailTab") },
  ]);

  const getShipmentAddServices = useCallback(() => {
    shipmentApi
      .getDetailShipment({
        shipmentId: item.ShipmentId,
        option: 1,
      })
      ?.then(response => {
        if (response && response.success) {
          setAddServices(response.data.ShipmentCargoAddServices || []);
        }
      });
  }, [item.ShipmentId]);

  useEffect(() => {
    getShipmentAddServices();
  }, [getShipmentAddServices]);

  const renderScene = useCallback(
    ({ route }: { route: any }) => {
      switch (route.key) {
        case "GeneralInfoTab":
          return (
            <GeneralInfoTab
              shipment={item.ShipmentNumber}
              shipmentId={item.ShipmentId}
              reference={item.ReferenceNumber}
              customer={item.CustomerName}
              cnee={item.ConsigneeName}
              service={item.CargoSPServiceId}
              mode={item.CargoShippingMethod}
              isDirectShipment={item.IsDirectShipment}
            />
          );
        case "ContentInfoTab":
          return <ContentInfoTab shipmentId={item.ShipmentId} />;
        case "CodDetailTab":
          return <CodDetailTab />;
        default:
          return null;
      }
    },
    [
      item.CargoSPServiceId,
      item.CargoShippingMethod,
      item.ConsigneeName,
      item.CustomerName,
      item.IsDirectShipment,
      item.ReferenceNumber,
      item.ShipmentId,
      item.ShipmentNumber,
    ],
  );

  const renderLazyPlaceholder = () => (
    <View style={styles.scene}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title={translate("screens.shipmentDetail")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
      />
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderLazyPlaceholder={renderLazyPlaceholder}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            labelStyle={styles.labelStyle}
            indicatorStyle={styles.indicatorStyle}
            renderLabel={({ route, focused }) => (
              <Text
                style={[
                  styles.labelStyle,
                  {
                    color: focused ? Themes.colors.white : Themes.colors.black,
                  },
                ]}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};
