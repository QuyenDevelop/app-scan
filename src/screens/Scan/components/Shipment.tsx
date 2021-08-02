import { ShipmentResponse } from "@models";
import { goToShipmentDetail } from "@navigation";
import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item } = props;
  const goToDetails = () => {
    goToShipmentDetail({ item });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.shipmentContainer}>
        <Text>Shipment: {item.ShipmentNumber}</Text>
        <Text>ReferenceNumber: {item.ReferenceNumber}</Text>
        <Text>Người nhận: {item.ConsigneeName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
