import { Header } from "@components";
import { goToLogin } from "@navigation";
import { Button, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
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
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
      <Button onPress={() => goToLogin()} title={translate("button.login")} />
    </View>
  );
};
