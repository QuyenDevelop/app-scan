import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

interface OwnProps {}

type Props = OwnProps;

export const Footer: FunctionComponent<Props> = () => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.footer,
        Platform.OS === "ios" && { paddingBottom: insets.bottom },
      ]}
      onPress={() => {}}
    >
      <Icon
        name={"ic_user_headset"}
        size={Metrics.icons.medium}
        color={Themes.colors.primary}
      />
      <View style={styles.right}>
        <Text style={styles.help}>{translate("label.needHelp")}</Text>
        <Text style={styles.contact}>{translate("label.contact")}</Text>
      </View>
    </TouchableOpacity>
  );
};
