import { useShow } from "@hooks";
import { AddServiceShipmentResponse } from "@models";
import { Checkbox, Icon, translate } from "@shared";
import { FontFamily, Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PhotoModal } from "./PhotoModal";
import styles from "./styles";
interface Props {
  item: AddServiceShipmentResponse;
  isSelected: boolean;
  onSelect: (serviceSelect: AddServiceShipmentResponse) => void;
  shipment: string;
  updateIsProcess: (serviceId: string, value: boolean) => void;
}
export const ServiceInfo: FunctionComponent<Props> = props => {
  const { item, isSelected, onSelect, shipment, updateIsProcess } = props;
  const [isShowPhotoModal, showPhotoModal, hidePhotoModal] = useShow();

  const selectService = () => {
    if (item.IsRequiredImage) {
      return;
    }

    if (item.IsProcessed === true) {
      return;
    }

    if (item.IsProcessed === false) {
      Alert.alert("", `[${item.Code}] ${item.Name}\n Xác nhận hoàn thành`, [
        {
          text: translate("button.cancel"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: translate("button.confirm"),
          onPress: () => {
            updateIsProcess(item.Id, true);
          },
        },
      ]);
    }

    onSelect(item);
  };
  return (
    <TouchableWithoutFeedback onPress={selectService}>
      <View style={styles.serviceInfoContainer}>
        <View style={[styles.hView, { flex: 1 }]}>
          <Checkbox
            onChange={selectService}
            checked={item.IsProcessed !== undefined ? true : isSelected}
          />
          <Text
            style={[
              styles.serviceLabel,
              {
                fontFamily:
                  item.IsProcessed !== undefined
                    ? FontFamily.bold
                    : isSelected
                    ? FontFamily.bold
                    : FontFamily.medium,
                color:
                  item.IsProcessed === undefined
                    ? Themes.colors.textPrimary
                    : item.IsProcessed
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
                onPress={showPhotoModal}
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
        <PhotoModal
          shipment={shipment}
          service={item.Code}
          isShowModal={isShowPhotoModal}
          closeModal={hidePhotoModal}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
