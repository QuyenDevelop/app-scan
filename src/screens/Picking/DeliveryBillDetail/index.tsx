import { Header } from "@components";
import { SCREENS } from "@configs";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

type NavigationRoute = RouteProp<
  PickingParamsList,
  SCREENS.DELIVERY_BILL_DETAIL_SCREEN
>;

export interface DeliveryBillDetailParams {
  id: string;
}

export const DeliveryBillDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  console.log("🚀🚀🚀 => params", params);
  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.deliveryBillDetail")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <Text>DeliveryBillDetailScreen</Text>
    </View>
  );
};
