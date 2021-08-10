import { Header } from "@components";
import { SCREENS } from "@configs";
import { ShipmentCODResponse } from "@models";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBar, TabView } from "react-native-tab-view";
import { ProcessCodTab } from "./components/ProcessCodTab";
import { ShipmentInformationTab } from "./components/ShipmentInformationTab";
import styles from "./styles";

const PROCESS_COD_TAB = "ProcessCodTab";
const SHIPMENT_INFO_TAB = "ShipmentInfoTab";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.UPDATE_COD_SCREEN
>;

export interface UpdateCODScreenParams {
  item: ShipmentCODResponse;
}

export const UpdateCODScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routeNavigation = useRoute<NavigationRoute>();
  const { item } = routeNavigation.params || {};
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: PROCESS_COD_TAB, title: translate("label.tab.processCodTab") },
    { key: SHIPMENT_INFO_TAB, title: translate("label.tab.shipmentInfoTab") },
  ]);

  const renderScene = useCallback(({ route }: { route: any }) => {
    switch (route.key) {
      case PROCESS_COD_TAB:
        return <ProcessCodTab item={item} />;
      case SHIPMENT_INFO_TAB:
        return <ShipmentInformationTab />;
      default:
        return null;
    }
  }, []);

  const renderLazyPlaceholder = () => (
    <View style={styles.scene}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title={translate("screens.codScreen")}
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
