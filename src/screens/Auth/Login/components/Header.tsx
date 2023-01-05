import { useShow } from "@hooks";
import { AccountAction, IRootState } from "@redux";
import { BottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";

const language = {
  VietNam: { label: "Việt Nam", value: "vi-VN" },
  English: { label: "English", value: "en-US" },
  Japan: { label: "日本語", value: "ja-JP" },
  China: { label: "中国", value: "zh-CN" },
  Taiwan: { label: "台灣", value: "zh-TW" },
};

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [
    isShowChangeLanguageModal,
    showChangeLanguageModal,
    hideChangeLanguageModal,
  ] = useShow();
  const languageSelected = useSelector(
    (state: IRootState) => state.account.language,
  );

  const languageLabel = Object.values(language).find(
    item => item.value === languageSelected,
  )?.label;
  const arrOptions = [
    {
      title: language.VietNam.label,
      onPress: () => {
        setLanguage(language.VietNam.value);
        hideChangeLanguageModal();
      },
    },
    {
      title: language.English.label,
      onPress: () => {
        setLanguage(language.English.value);
        hideChangeLanguageModal();
      },
    },
    {
      title: language.Japan.label,
      onPress: () => {
        setLanguage(language.Japan.value);
        hideChangeLanguageModal();
      },
    },
    // {
    //   title: language.China.label,
    //   onPress: () => {
    //     setLanguage(language.China.value);
    //     hideChangeLanguageModal();
    //   },
    // },
    // {
    //   title: language.Taiwan.label,
    //   onPress: () => {
    //     setLanguage(language.Taiwan.value);
    //     hideChangeLanguageModal();
    //   },
    // },
  ];

  const setLanguage = (value: any) => {
    dispatch(
      AccountAction.changeLanguage(
        { language: value },
        {
          onSuccess: () => {},
          onFailure: () => {},
          onFinish: () => {},
        },
      ),
    );
  };

  return (
    <View style={[styles.headerView, { paddingTop: insets.top }]}>
      <View style={styles.headerLeftView}>
        <Text style={styles.loginTitle}>{translate("label.login")}</Text>
      </View>
      <TouchableOpacity
        onPress={showChangeLanguageModal}
        style={styles.changeLanguageContainer}
      >
        <Icon
          color={Themes.colors.coolGray60}
          name={"ic_globe"}
          size={Metrics.icons.small}
          styles={styles.iconGoBack}
        />
        <Text style={styles.language}>{languageLabel}</Text>
        <Icon
          color={Themes.colors.coolGray60}
          name={"ic_arrow_down"}
          size={Metrics.icons.smallSmall}
          styles={styles.iconGoBack}
        />
      </TouchableOpacity>
      <BottomSheet
        isTranslated={true}
        isSearch={false}
        arrOption={arrOptions}
        isShowModal={isShowChangeLanguageModal}
        onCloseModal={hideChangeLanguageModal}
        showTitle={false}
      />
    </View>
  );
};

export default Header;
