import { DATA_CONSTANT, SCREENS } from "@configs";
import { useStatusBar } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { AccountAction } from "@redux";
import { Button, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import MenuItem from "./components/MenuItem";
import styles from "./styles";

export const MenuScreen: FunctionComponent = () => {
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(
      AccountAction.logout(
        {},
        {
          onBeginning: () => {},
          onFailure: () => {},
          onSuccess: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.AUTH_STACK }],
            });
          },
        },
      ),
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {DATA_CONSTANT.MENU_ITEMS.map((item, index) => {
          return (
            <MenuItem
              key={index}
              title={translate(item.title)}
              icon={item.icon}
              onPress={item.onPress}
            />
          );
        })}
        <Button
          title={translate("button.logout")}
          onPress={onLogout}
          buttonChildStyle={styles.logoutButton}
          titleStyle={styles.logoutButtonTitle}
        />
      </ScrollView>
    </View>
  );
};
