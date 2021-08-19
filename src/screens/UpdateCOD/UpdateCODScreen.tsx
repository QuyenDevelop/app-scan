import { shipmentApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert } from "@helpers";
import { useIsMounted } from "@hooks";
import { ShipmentCODResponse } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
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
  const navigation = useNavigation();
  const routeNavigation = useRoute<NavigationRoute>();
  const { item } = routeNavigation.params || {};
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: PROCESS_COD_TAB, title: translate("label.tab.processCodTab") },
    { key: SHIPMENT_INFO_TAB, title: translate("label.tab.shipmentInfoTab") },
  ]);
  const isFirstFocus = useRef<boolean>(true);
  const isMounted = useIsMounted();

  useFocusEffect(
    useCallback(() => {
      if (!isFirstFocus.current) {
        shipmentApi
          .scanShipmentCOD(item.Id)
          ?.then(shipment => {
            if (shipment?.success) {
              if (isMounted) {
                navigation.setParams({ item: shipment.data });
              }
            } else {
              Alert.warning(shipment?.message || "", true);
            }
          })
          .catch(() => {
            Alert.error("error.errorServer");
          })
          .finally(() => {});
      }
    }, [isMounted, item.Id, navigation]),
  );

  useEffect(() => {
    isFirstFocus.current = false;
  }, []);

  const renderScene = useCallback(
    ({ route }: { route: any }) => {
      switch (route.key) {
        case PROCESS_COD_TAB:
          return <ProcessCodTab item={item} />;
        case SHIPMENT_INFO_TAB:
          return <ShipmentInformationTab item={item} />;
        default:
          return null;
      }
    },
    [item],
  );

  const renderLazyPlaceholder = () => (
    <View style={styles.scene}>
      <ActivityIndicator color={Themes.colors.collGray40} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.codScreen")}
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
