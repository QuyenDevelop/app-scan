import { ShipmentItemResponse } from "@models";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
interface Props {
  item?: ShipmentItemResponse;
}
export const ItemInfo: FunctionComponent<Props> = props => {
  const { item } = props;
  return (
    <View style={styles.itemInfoContainer}>
      <View style={styles.infoItem}>
        <Text>Item name: {item?.ProductName}</Text>
        <Text>Comodity: {item?.CommodityText}</Text>
        <Text>Quantity: {item?.Quantity}</Text>
        <Text>Unit: {item?.QuantityUnitCode}</Text>
        <Text>
          Value: {item?.Price} {item?.CurrencyCode}
        </Text>
      </View>
      <View />
    </View>
  );
};
