import { Header } from "@components";
import { goToChangePasswordScreen } from "@navigation";
import { useNavigation } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

export const UserInformationScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const accountInfo = useSelector((state: IRootState) => state.account.profile);
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
      </View>
    </View>
  );
};
