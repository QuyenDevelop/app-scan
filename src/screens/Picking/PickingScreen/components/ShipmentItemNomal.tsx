/* eslint-disable react-native/no-inline-styles */
import { ShipmentSourceItem } from "@models";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

interface Props {
  item: ShipmentSourceItem;
}

export const ShipmentItemNormal: FunctionComponent<Props> = props => {
  const { item } = props;

  const getColor = () => {
    if (item.IsPicked && item.LocationName === item.LastLocation) {
      return Themes.colors.success60;
    } else {
      if (item.LastLocation !== null) {
        return Themes.colors.danger60;
      }
      return Themes.colors.coolGray100;
    }
  };

  return (
    <View style={styles.shipmentItem}>
      <View style={{ flex: 0.3 }}>
        <Text
          style={[
            styles.shipment,
            {
              color: getColor(),
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {item.ShipmentNumber}
        </Text>
      </View>
      <Text
        style={[
          styles.staff,
          {
            color: getColor(),
          },
        ]}
        numberOfLines={2}
      >
        {item.ReferenceNumber}
      </Text>
      <View>
        {item.LocationName && (
          <Text
            style={[
              styles.location,
              {
                color: getColor(),
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {item.LocationName}
          </Text>
        )}
        {item.LastLocation && item.LastLocation !== item.LocationName && (
          <Text
            style={[
              styles.location,
              {
                color: Themes.colors.success60,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {item.LastLocation}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.quantity,
          {
            color: getColor(),
          },
        ]}
      >
        {item.TotalWeight ?? 0}
      </Text>
    </View>
  );
};
