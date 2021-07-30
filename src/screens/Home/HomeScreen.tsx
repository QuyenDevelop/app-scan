import { Header } from "@components";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export const HomeScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="EZBUY"
        iconLeftName={["ic_menu"]}
        iconLeftOnPress={[
          () => {
            console.log("show menu");
          },
        ]}
        isCenterTitle
        iconRightName={["ic_sign-out"]}
        iconRightOnPress={[
          () => {
            console.log("sign out");
          },
        ]}
      />
    </View>
  );
};
