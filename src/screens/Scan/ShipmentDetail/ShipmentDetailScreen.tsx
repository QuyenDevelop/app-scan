import { Header } from "@components";
import { SCREENS } from "@configs";
import { ShipmentResponse } from "@models";
import { ScanParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import { AddServicesTab } from "../components/AddServicesTab";
import { ContentInfoTab } from "../components/ContentInfoTab";
import { GeneralInfoTab } from "../components/GeneralInfoTab";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ScanParamsList,
  SCREENS.SHIPMENT_DETAIL_SCREEN
>;

export interface ShipmentDetailScreenParams {
  item: ShipmentResponse;
}

export const ShipmentDetailScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { item } = route?.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "GeneralInfoTab", title: translate("label.tab.generalInfoTab") },
    { key: "ContentInfoTab", title: translate("label.tab.contentInfoTab") },
    { key: "AddServicesTab", title: translate("label.tab.addServicesTab") },
  ]);
  const renderScene = useCallback(
    ({ route }: { route: any }) => {
      switch (route.key) {
        case "GeneralInfoTab":
          return (
            <GeneralInfoTab
              shipment={item.ShipmentNumber}
              reference={item.ReferenceNumber}
              subShipments={item.SubShipments}
              customer={item.CustomerName}
              cnee={item.ConsigneeName}
              service={item.CargoSPServiceId}
            />
          );
        case "ContentInfoTab":
          return <ContentInfoTab shipmentItems={item.ShipmentItems} />;
        case "AddServicesTab":
          return <AddServicesTab addServices={item.ShipmentCargoAddServices} />;
        default:
          return null;
      }
    },
    [
      item.CargoSPServiceId,
      item.ConsigneeName,
      item.CustomerName,
      item.ReferenceNumber,
      item.ShipmentCargoAddServices,
      item.ShipmentItems,
      item.ShipmentNumber,
      item.SubShipments,
    ],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Shipment detail"
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
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
