import { ScreenUtils } from "@helpers";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";

interface Props {}

export const ProcessCodTab: FunctionComponent<Props> = props => {
  const {} = props;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.generalTab}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.customer")}</Text>
          <TouchableOpacity style={[styles.serviceButton, styles.flex1]}>
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              ICHIBA VN
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.codAmount")}</Text>
          <TextInput
            placeholder={translate("placeholder.enterCodAmount")}
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
          />
          <TouchableOpacity style={styles.serviceButton}>
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              JPY
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.confirmPaymentBtn}>
          <Text style={styles.confirmPaymentText}>
            {translate("button.confirmPayment")}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
