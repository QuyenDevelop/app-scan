import { AddServiceShipmentResponse } from "@models";
import { goToUpload } from "@navigation";
import { Checkbox, Icon } from "@shared";
import { FontFamily, Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
interface Props {
  item: AddServiceShipmentResponse;
  isSelected: boolean;
  onSelect: () => void;
  shipment: string;
  isHandled: boolean;
}
export const ServiceInfo: FunctionComponent<Props> = props => {
  const { item, isSelected, onSelect, shipment, isHandled } = props;
  const goToUploadImage = () => {
    goToUpload({ shipment: shipment, service: item.Code });
  };
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.serviceInfoContainer}>
        <View style={[styles.hView, { flex: 1 }]}>
          <Checkbox onChange={onSelect} checked={isSelected} />
          <Text
            style={[
              styles.serviceLabel,
              {
                fontFamily: isSelected ? FontFamily.bold : FontFamily.medium,
                color: !isSelected
                  ? Themes.colors.textPrimary
                  : isHandled
                  ? Themes.colors.success60
                  : Themes.colors.red0722,
              },
            ]}
          >
            [{item.Code}] {item.Name}
          </Text>
        </View>
        <View style={styles.hView}>
          {item?.IsRequiredImage && (
            <>
              <TouchableOpacity
                style={styles.button}
                hitSlop={styles.hitSlop}
                onPress={goToUploadImage}
              >
                <Icon
                  name="ic_camera-retro"
                  size={Metrics.icons.small}
                  color={Themes.colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity hitSlop={styles.hitSlop}>
                <Text
                  style={[
                    styles.contentInfo,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  View
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
