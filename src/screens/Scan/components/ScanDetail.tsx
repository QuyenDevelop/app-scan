import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import styles from "./styles";

export const ScanDetail: FunctionComponent = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "GeneralInfoTab", title: translate("label.tab.generalInfoTab") },
    { key: "ContentInfoTab", title: translate("label.tab.contentInfoTab") },
    { key: "AddServicesTab", title: translate("label.tab.addServicesTab") },
  ]);
  const renderScene = useCallback(({ route }: { route: any }) => {
    switch (route.key) {
      // case "GeneralInfoTab":
      //   return <GeneralInfoTab />;
      // case "ContentInfoTab":
      //   return <ContentInfoTab />;
      // case "AddServicesTab":
      //   return <AddServicesTab />;
      default:
        return null;
    }
  }, []);

  return (
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
                { color: focused ? Themes.colors.white : Themes.colors.black },
              ]}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};
