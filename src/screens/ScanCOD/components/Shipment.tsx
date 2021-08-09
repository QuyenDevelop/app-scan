import { ShipmentResponse } from "@models";
import { goToUpdateCodScreen } from "@navigation";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item } = props;
  const goToDetails = () => {
    goToUpdateCodScreen();
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.shipmentContainer}>
        <View style={styles.shipment}>
          <Text>
            {translate("label.shipmentNumber")} {item.ShipmentNumber}{" "}
          </Text>
          {item.WaitingProcessed && (
            <Text style={{ color: Themes.colors.red0033 }}>*</Text>
          )}
        </View>

        <Text>
          {translate("label.customer")} {item.CustomerName}
        </Text>
        <Text>
          {translate("label.shipmentWeight")} {item.TotalGrossWeight}{" "}
          {translate("label.gram")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
