import { Header } from "@components";
import { SCREENS } from "@configs";
import { ShipmentResponse } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { ContentInfoTab } from "./components/ContentInfoTab";
import { GeneralInfoTab } from "./components/GeneralInfoTab";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.SHIPMENT_DETAIL_COD_SCREEN
>;

export interface ShipmentDetailCODScreenParams {
  item: ShipmentResponse;
  refId: string;
}

export const ShipmentDetailCODScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const routeNavigation = useRoute<NavigationRoute>();
  const { item, refId } = routeNavigation?.params || {};
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "GeneralInfoTab", title: translate("label.tab.generalInfoTab") },
    { key: "ContentInfoTab", title: translate("label.tab.contentInfoTab") },
  ]);

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

        default:
          return null;
      }
    },
    [item, refId],
  );

  const renderLazyPlaceholder = () => (
    <View style={styles.scene}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.shipmentDetail")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <TabView
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
                    color: focused
                      ? Themes.colors.coolGray100
                      : Themes.colors.coolGray60,
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
