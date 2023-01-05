import { authApi } from "@api";
import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { goToChangePasswordScreen } from "@navigation";
import { useNavigation } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Icon, RequestPasswordModal, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import * as Keychain from "react-native-keychain";
import { useSelector } from "react-redux";
import styles from "./styles";
export const UserInformationScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const accountInfo = useSelector((state: IRootState) => state.account.profile);
  console.log("🚀🚀🚀 => accountInfo", accountInfo);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isShowRequestPassword, showRequestPassword, hideRequestPassword] =
    useShow();

  const hasBiometrics = async () => {
    const checkExist = await Keychain.getSupportedBiometryType();
    console.log("🚀🚀🚀 => hasBiometrics => checkExist", checkExist);
    const hasKey = await Keychain.hasInternetCredentials("Efex_Warehouse");
    if (hasKey) {
      setIsEnabled(true);
    }
  };

  useEffect(() => {
    hasBiometrics();
  }, []);

  const toggleSwitch = async () => {
    if (isEnabled) {
      await Keychain.resetInternetCredentials("Efex_Warehouse", {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
      setIsEnabled(false);
      Alert.success("success.removeBiometricSuccess");
    } else {
      showRequestPassword();
    }
  };

  const confirmPassword = async (password: string) => {
    try {
      const login = await authApi.login(
        accountInfo?.preferred_username,
        password,
      );
      if (login) {
        const saveKey = await Keychain.setInternetCredentials(
          "Efex_Warehouse",
          accountInfo?.preferred_username || "",
          password,
          {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
          },
        );

        if (saveKey) {
          Alert.success("success.registerBiometricSuccess");
          setIsEnabled(true);
        } else {
          Alert.error("error.registerBiometricError");
        }
      }
    } catch (e) {
      Alert.error("error.registerBiometricError");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.userInfoScreen")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>ID</Text>
          <Text>{accountInfo?.preferred_username}</Text>
        </View>
        <TouchableOpacity onPress={goToChangePasswordScreen}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              {translate("label.changePassword")}
            </Text>
            <Icon
              name="ic_arrow_right"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray100}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{translate("label.contactName")}</Text>
          <Text>{accountInfo?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{translate("label.phoneNo")}</Text>
          <Text>{accountInfo?.phone_number}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{translate("label.email")}</Text>
          <Text>{accountInfo?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{translate("label.address")}</Text>
          <Text>{accountInfo?.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            {translate("label.biometricLogin")}
          </Text>
          <Switch
            trackColor={{
              false: Themes.colors.danger60,
              true: Themes.colors.success60,
            }}
            thumbColor={Themes.colors.white}
            ios_backgroundColor={Themes.colors.danger60}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <RequestPasswordModal
        isVisible={isShowRequestPassword}
        closeModal={hideRequestPassword}
        onConfirm={confirmPassword}
      />
    </View>
  );
};
