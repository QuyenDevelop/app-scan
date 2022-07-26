/* eslint-disable react-native/no-inline-styles */
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
  item: any;
}

export const ShipmentItemTokyo: FunctionComponent<Props> = props => {
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
        <Text
          style={styles.shipment}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {item.tracking}
        </Text>
      </View>
      <Text style={styles.staff} numberOfLines={2}>
        {item.staff}
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
