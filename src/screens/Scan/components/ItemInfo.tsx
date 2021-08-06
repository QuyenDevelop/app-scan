import { Utils } from "@helpers";
import { ShipmentItemResponse } from "@models";
import { translate } from "@shared";
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
        <Text>
          {translate("label.itemName")} {item?.ProductName}
        </Text>
        <Text>
          {translate("label.commodity")} {item?.CommodityText}
        </Text>
        <Text>
          {translate("label.quantity")} {item?.Quantity}
        </Text>
        <Text>
          {translate("label.unit")} {item?.QuantityUnitCode}
        </Text>
        <Text>
          {translate("label.value", { currency: item?.CurrencyCode })} ¥
          {Utils.formatMoney(item?.Price || 0)} {}
        </Text>
      </View>
      <View />
    </View>
  );
};
