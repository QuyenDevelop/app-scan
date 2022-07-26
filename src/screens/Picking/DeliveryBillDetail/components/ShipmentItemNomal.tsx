/* eslint-disable react-native/no-inline-styles */
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
  item: any;
}

export const ShipmentItemNormal: FunctionComponent<Props> = props => {
  const { item } = props;
  return (
    <View style={styles.shipmentItem}>
      <View style={{ flex: 0.3 }}>
        <Text
          style={styles.shipment}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {item.shipmentId}
        </Text>
      </View>
      <Text style={styles.staff} numberOfLines={2}>
        {item.tracking}
      </Text>
      <Text
        style={styles.location}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
      >
        {item.location}
      </Text>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
  );
};
