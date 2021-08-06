import { Header } from "@components";
import { SCREENS } from "@configs";
import { useNavigation } from "@react-navigation/native";
import { AccountAction } from "@redux";
import { translate } from "@shared";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styles from "./styles";

export const MenuScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onLogout = () => {
    // customerApi.updateDeviceId("");
    dispatch(
      AccountAction.logout(
        {},
        {
          onBeginning: () => {},
          onFailure: () => {},
          onSuccess: () => {
            navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATION, {
              screen: SCREENS.SCAN_STACK,
            });
          },
        },
      ),
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title={translate("screens.menuScreen")}
        iconLeftName={["ic_menu"]}
        iconLeftOnPress={[
          () => {
            console.log("show menu");
          },
        ]}
        isCenterTitle
        iconRightName={["ic_sign-out"]}
        iconRightOnPress={[onLogout]}
      />
    </View>
  );
};
