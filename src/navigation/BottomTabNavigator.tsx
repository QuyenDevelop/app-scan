import { SCREENS } from "@configs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, ScanScreen } from "@screens";
import { Icon, translate } from "@shared";
import { Themes } from "@themes";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

const getTabBarIcon = (iconName: string, title: string, focused: boolean) => (
  <View style={styles.tabBarIcon}>
    <View>
      <Icon
        name={focused ? `${iconName}_fill` : iconName}
        size={24}
        color={focused ? Themes.colors.primary : Themes.colors.coolGray}
      />
    </View>
    <Text
      style={[
        styles.tabBarText,
        focused
          ? { color: Themes.colors.primary }
          : { color: Themes.colors.coolGray },
      ]}
    >
      {title}
    </Text>
  </View>
);

export type HomeParamsList = {
  [SCREENS.HOME_SCREEN]: undefined;
};

export type ScanParamsList = {
  [SCREENS.SCAN_SCREEN]: undefined;
};
const Tab = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator<HomeParamsList>();
const ScanStackNavigator = createStackNavigator<ScanParamsList>();
function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName={SCREENS.HOME_SCREEN}>
      <HomeStackNavigator.Screen
        name={SCREENS.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function ScanStack() {
  return (
    <ScanStackNavigator.Navigator initialRouteName={SCREENS.SCAN_SCREEN}>
      <ScanStackNavigator.Screen
        name={SCREENS.SCAN_SCREEN}
        component={ScanScreen}
        options={{
          headerShown: false,
        }}
      />
    </ScanStackNavigator.Navigator>
  );
}

export function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME_SCREEN}
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          height: 65 + insets.bottom,
          backgroundColor: "white",
          paddingBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon("ic_home", translate("label.tab.home"), focused),
        }}
      />
      <Tab.Screen
        name={SCREENS.SCAN_STACK}
        component={ScanStack}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon("ic_home", translate("label.tab.scan"), focused),
        }}
      />
      <Tab.Screen
        name={SCREENS.COD_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon("ic_home", translate("label.tab.cod"), focused),
        }}
      />
      <Tab.Screen
        name={SCREENS.SHIPMENT_STACK}
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            getTabBarIcon("ic_user", translate("label.tab.shipment"), focused),
        }}
      />
    </Tab.Navigator>
  );
}
