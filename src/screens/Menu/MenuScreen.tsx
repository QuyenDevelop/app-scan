import { CONSTANT, DATA_CONSTANT, SCREENS } from "@configs";
import { getAsyncItem, setAsyncItem } from "@helpers";
import { useShow, useStatusBar } from "@hooks";
import { PostOfficeItemResponse } from "@models";
import { useNavigation } from "@react-navigation/native";
import { AccountAction, IRootState } from "@redux";
import { Button, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ChoosePostOfficeModal } from "./components/ChoosePostOfficeModal";
import Header from "./components/Header";
import MenuItem from "./components/MenuItem";
import styles from "./styles";

export const MenuScreen: FunctionComponent = () => {
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, showLoading, hideLoading] = useShow();
  const postOffices = useSelector(
    (state: IRootState) => state.account.postOffices,
  );
  const [defaultPostOffice, setDefaultPostOffice] = useState<
    PostOfficeItemResponse | undefined
  >();
  const [
    isShowChoosePostOfficeModal,
    showChoosePostOfficeModal,
    hideChoosePostOfficeModal,
  ] = useShow();
  const onLogout = () => {
    showLoading();
    dispatch(
      AccountAction.logout(
        {},
        {
          onBeginning: () => {},
          onFailure: () => {
            hideLoading();
          },
          onSuccess: () => {
            hideLoading();
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.AUTH_STACK }],
            });
          },
        },
      ),
    );
  };

  useEffect(() => {
    const getPostoffice = async () => {
      const postOfficeId = await getAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
      );
      if (postOfficeId) {
        const postOffice = postOffices.find(item => item.Id === postOfficeId);
        setDefaultPostOffice(postOffice);
      }
    };
    getPostoffice();
  }, [postOffices]);

  const onSelectPostOffice = async (value: PostOfficeItemResponse) => {
    const storePostOffice = await setAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
      value.Id,
    );
    if (storePostOffice) {
      setDefaultPostOffice(value);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.postOfficeBtn}
          onPress={showChoosePostOfficeModal}
        >
          <Text>{defaultPostOffice?.Name}</Text>
          <Icon
            name="ic_arrow_down"
            size={Metrics.icons.smallSmall}
            color={Themes.colors.coolGray100}
          />
        </TouchableOpacity>

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
          isLoading={isLoading}
        />
      </ScrollView>
      <ChoosePostOfficeModal
        isShowModal={isShowChoosePostOfficeModal}
        closeModal={hideChoosePostOfficeModal}
        onSelectPostOffice={onSelectPostOffice}
      />
    </View>
  );
};
