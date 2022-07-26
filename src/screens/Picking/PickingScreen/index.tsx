import { Header } from "@components";
import { SCREENS } from "@configs";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

type NavigationRoute = RouteProp<PickingParamsList, SCREENS.PICKING_SCREEN>;

export interface PickingParams {
  id: string;
  tab: string;
}

export const PickingScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  // const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  console.log("🚀🚀🚀 => params", params);

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.picking")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <Text>PickingScreen</Text>
    </View>
  );
};
