import { Header } from "@components";
import { ScreenUtils } from "@helpers";
import { useNavigation } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Text, View } from "react-native";
import { TabBar, TabBarIndicator, TabView } from "react-native-tab-view";
import { FinishingPickingComponent } from "./Component/FinishingPickingComponent";
import { PickingComponent } from "./Component/PickingComponent";
import { WaitingPickingComponent } from "./Component/WaitingPickingComponent";
import styles from "./styles";

const TabKey = {
  WAITING: "WAITING",
  PROGRESS: "PROGRESS",
  FINISHED: "FINISHED",
};

const routes = [
  {
    key: TabKey.WAITING,
    title: translate("screens.picking.waiting"),
  },
  {
    key: TabKey.PROGRESS,
    title: translate("screens.picking.process"),
  },
  {
    key: TabKey.FINISHED,
    title: translate("screens.picking.finished"),
  },
];

export const DeliveryBillManagementScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);

  const renderScene = useCallback(
    ({ route }: { route: { key: string; title: string } }) => {
      switch (route.key) {
        case TabKey.WAITING:
          return <WaitingPickingComponent />;
        case TabKey.PROGRESS:
          return <PickingComponent />;
        case TabKey.FINISHED:
          return <FinishingPickingComponent />;
        default:
          return null;
      }
    },
    [],
  );

  const renderTabBar = useCallback(props => {
    return (
      <TabBar
        {...props}
        style={{ backgroundColor: Themes.colors.white }}
        renderIndicator={indicatorProps => (
          <TabBarIndicator {...indicatorProps} style={styles.indicatorStyle} />
        )}
        renderLabel={({ route, focused }) => (
          <Text
            style={[
              styles.tabBarLabel,
              {
                color: focused
                  ? Themes.colors.primary
                  : Themes.colors.coolGray60,
              },
            ]}
          >
            {route.title}
          </Text>
        )}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.deliveryBill")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: ScreenUtils.WIDTH }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
