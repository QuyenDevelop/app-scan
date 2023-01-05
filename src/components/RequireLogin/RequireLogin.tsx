import { goToLogin } from "@navigation";
import { Button, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
export const RequireLogin: FunctionComponent = () => {
  return (
    <View style={styles.logoutContainer}>
      <Text style={styles.logoutTitle}>{translate("label.requireLogin")}</Text>
      <Button onPress={() => goToLogin()} title={translate("button.login")} />
    </View>
  );
};
