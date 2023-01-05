import { Utils } from "@helpers";
import { useShow } from "@hooks";
import { ShipmentItemResponse } from "@models";
import { Icon, ImageViewModal, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  index: number;
  item?: ShipmentItemResponse;
}
export const ItemInfo: FunctionComponent<Props> = props => {
  const { index, item } = props;
  const images = item?.Images && item.Images.map(image => image.Url);
  const [isShowImages, showImages, hideImages] = useShow();
  return (
    <View style={styles.itemInfoContainer}>
      <View style={styles.headerInfo}>
        <Text style={{ color: Themes.colors.coolGray60 }}>
          {index + 1}.<Text style={{ color: Themes.colors.brand60 }}>*</Text>{" "}
          {item?.OriginDescription}
        </Text>
        {images && (
          <TouchableOpacity
            onPress={showImages}
            style={styles.openViewImageButton}
          >
            <Text style={styles.openViewImageButtonText}>
              {translate("button.shipmentImages")}
            </Text>
            <Icon
              name="ic_arrow_right"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        )}
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
          {Utils.formatMoney(item?.Price || 0)} {item?.CurrencyCode}
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
      <ImageViewModal
        images={images || []}
        isVisible={isShowImages}
        closeModal={hideImages}
      />
    </View>
  );
};
