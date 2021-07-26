import { goToLogin } from "@navigation";
import { Button, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export const HomeScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Button onPress={() => goToLogin()} title={translate("button.login")} />
    </View>
  );
};
