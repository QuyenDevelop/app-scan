import { Utils } from "@helpers";
import { ShipmentResponse } from "@models";
import { goToShipmentDetailCODScreen } from "@navigation";
import { translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item } = props;
  const goToDetails = () => {
    goToShipmentDetailCODScreen({ item });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.shipmentContainer}>
        <View style={styles.shipment}>
          <Text>
            {translate("label.shipmentNumber")} {item.ShipmentNumber}{" "}
          </Text>
        </View>

        <Text>
          {translate("label.customer")} {item.CustomerName}
        </Text>
        <Text>
          {translate("label.shipmentWeight")}{" "}
          {Utils.formatMoney(item.TotalGrossWeight)} {translate("label.gram")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
