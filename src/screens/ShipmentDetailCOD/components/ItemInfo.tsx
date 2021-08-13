import { Utils } from "@helpers";
import { useShow } from "@hooks";
import { ShipmentItemResponse } from "@models";
import { ImageViewModal, Text, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  item?: ShipmentItemResponse;
}
export const ItemInfo: FunctionComponent<Props> = props => {
  const { item } = props;
  const images = item?.Images.map(image => image.Url);
  const [isShowImages, showImages, hideImages] = useShow();
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
        <TouchableOpacity style={styles.viewImage} onPress={showImages}>
          <Text style={styles.viewImageText}>
            {translate("button.lookPhoto")}
          </Text>
        </TouchableOpacity>
      </View>
      <View />
      <ImageViewModal
        images={images || []}
        isVisible={isShowImages}
        closeModal={hideImages}
      />
    </View>
  );
};
