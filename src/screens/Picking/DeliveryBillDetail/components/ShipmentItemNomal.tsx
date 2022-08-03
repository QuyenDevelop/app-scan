/* eslint-disable react-native/no-inline-styles */
import { ShipmentSourceItem } from "@models";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
  item: ShipmentSourceItem;
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
          {item.ShipmentNumber}
        </Text>
      </View>
      <Text style={styles.staff} numberOfLines={2}>
        {item.ReferenceNumber}
      </Text>
      <View>
        {item.LocationNames && (
          <Text
            style={styles.location}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {item.LocationNames[0]}
          </Text>
        )}
      </View>
      {/* <Text style={styles.quantity}>{item.quantity}</Text> */}
    </View>
  );
};
