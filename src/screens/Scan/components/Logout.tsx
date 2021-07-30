import { goToLogin } from "@navigation";
import { Button, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
export const Logout: FunctionComponent = () => {
  return (
    <View style={styles.logoutContainer}>
      <Text style={styles.logoutTitle}>Vui lòng đăng nhập để sử dụng </Text>
      <Button onPress={() => goToLogin()} title={translate("button.login")} />
    </View>
  );
};
