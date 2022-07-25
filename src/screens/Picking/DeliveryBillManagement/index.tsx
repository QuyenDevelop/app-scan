import { Header } from "@components";
import { useNavigation } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export const DeliveryBillManagementScreen: FunctionComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.deliveryBill")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <Text>DeliveryBillManagementScreen</Text>
    </View>
  );
};
