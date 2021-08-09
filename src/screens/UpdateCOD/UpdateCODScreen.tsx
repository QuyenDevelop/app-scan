import { Header } from "@components";
import { useNavigation } from "@react-navigation/native";
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
import { NavigationState, TabBar, TabView } from "react-native-tab-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProcessCodTab } from "./components/ProcessCodTab";
import { ShipmentInformationTab } from "./components/ShipmentInformationTab";
import styles from "./styles";

const PROCESS_COD_TAB = "ProcessCodTab";
const SHIPMENT_INFO_TAB = "ShipmentInfoTab";
type Route = {
  key: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

type State = NavigationState<Route>;

export const UpdateCODScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: PROCESS_COD_TAB, title: translate("label.tab.processCodTab") },
    { key: SHIPMENT_INFO_TAB, title: translate("label.tab.shipmentInfoTab") },
  ]);

  const renderScene = useCallback(({ route }: { route: any }) => {
    switch (route.key) {
      case PROCESS_COD_TAB:
        return <ProcessCodTab />;
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
