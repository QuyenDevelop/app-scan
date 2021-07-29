import { SCREENS } from "@configs";
import { ShipmentResponse } from "@models";
import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item } = props;
  const navigation = useNavigation();

  const goToDetails = () => {
    // goToShipmentDetail({ item });
    navigation.navigate(SCREENS.SHIPMENT_DETAIL_SCREEN, {
      item,
    });
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
