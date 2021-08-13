import { Utils } from "@helpers";
import { SubShipment } from "@models";
import { translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  subShipment: SubShipment;
  index: number;
}
export const SubShipmentItem: FunctionComponent<Props> = props => {
  const { subShipment, index } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.subShipmentContainer}>
        <Text style={styles.labelInfo}>
          {translate("label.subShipment", { index: index + 1 })}{" "}
        </Text>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.subShipmentWeight")}
          </Text>
          <Text style={styles.contentInfo}>
            {Utils.formatMoney((subShipment.TotalGrossWeight || 0) * 1000)}{" "}
          </Text>
          <Text style={styles.contentInfo}>{translate("label.gram")}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.dimension")}</Text>

          <Text style={styles.contentInfo}>
            {subShipment.Length?.toString() || "0"} x{" "}
            {subShipment.Length?.toString() || "0"} x{" "}
            {subShipment.Length?.toString() || "0"} {translate("label.cm")}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
