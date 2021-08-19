import { Utils } from "@helpers";
import { ShipmentItemResponse } from "@models";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import styles from "./styles";
interface Props {
  index: number;
  item?: ShipmentItemResponse;
}
export const ItemInfo: FunctionComponent<Props> = props => {
  const { index, item } = props;

  return (
    <View style={styles.itemInfoContainer}>
      <View style={styles.contentInfoRow}>
        <Text>
          {index + 1}.<Text style={{ color: Themes.colors.brand60 }}>*</Text>{" "}
          {item?.OriginDescription}
        </Text>
      </View>
      <View style={styles.contentInfoRow}>
        <Icon
          name="ic_type"
          size={Metrics.icons.small}
          color={Themes.colors.brand60}
        />
        <Text style={styles.infoText}>{item?.OriginCommodityText}</Text>
      </View>

      <View style={styles.contentInfoRow}>
        <Icon
          name="ic_money"
          size={Metrics.icons.smallSmall}
          color={Themes.colors.brand60}
        />
        <Text style={styles.infoText}>
          ¥ {Utils.formatMoney(item?.Price || 0)} {}
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.contentChild}>
          <Icon
            name="ic_quantity"
            size={Metrics.icons.small}
            color={Themes.colors.brand60}
          />
          <Text style={styles.infoText}>
            {translate("label.quantity")} {item?.Quantity}
          </Text>
        </View>
        <View style={styles.contentChild}>
          <Text style={styles.infoText}>
            {translate("label.unit")} {item?.QuantityUnitCode || "item"}
          </Text>
        </View>
      </View>
      <View />
    </View>
  );
};
