import { shipmentApi } from "@api";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { AddServiceShipmentResponse } from "@models";
import { Checkbox, Icon, SuccessModal, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { PhotoModal } from "./PhotoModal";
import styles from "./styles";
interface Props {
  item: AddServiceShipmentResponse;
  isSelected: boolean;
  onSelect: (serviceSelect: AddServiceShipmentResponse) => void;
  shipment: string;
  shipmentId: string;
  updateIsProcess: (serviceId: string, value: boolean) => void;
  viewImage: (shipment: string, serviceCode: string) => void;
}
export const ServiceInfo: FunctionComponent<Props> = props => {
  const {
    item,
    isSelected,
    onSelect,
    shipment,
    updateIsProcess,
    shipmentId,
    viewImage,
  } = props;
  const [isShowPhotoModal, showPhotoModal, hidePhotoModal] = useShow();
  const [isShowSuccessModal, showSuccessModal, hideSuccessModal] = useShow();
  const selectService = () => {
    if (item.IsRequiredImage) {
      return;
    }

    if (item.IsProcessed === true) {
      return;
    }

    if (item.IsProcessed === false) {
      showSuccessModal();
    }

    onSelect(item);
  };

  const onViewImage = () => {
    viewImage(shipment, item.Code);
  };

  const onConfirm = () => {
    shipmentApi
      .completeProcessAddService({
        shipmentId: shipmentId,
        shipmentNumber: shipment,
        cargorAddServiceId: item.Id,
        cargorAddServiceCode: item.Code,
      })
      ?.then(response => {
        if (response.success) {
          updateIsProcess(item.Id, true);
        } else {
          Alert.error(response.message, true);
        }
      })
      .catch(error => {
        Alert.error(error, true);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={selectService}>
      <View style={styles.serviceInfoContainer}>
        <View style={[styles.hView, { flex: 1 }]}>
          {item.IsProcessed === undefined && (
            <Checkbox
              onChange={selectService}
              checked={item.IsProcessed !== undefined ? true : isSelected}
              style={styles.checkbox}
            />
          )}

          <Text style={styles.serviceLabel}>
            [{item.Code}] {item.Name}
          </Text>
          {item.IsProcessed !== undefined && (
            <Icon
              name="ic_check-circle"
              size={Metrics.icons.small}
              color={
                item.IsProcessed
                  ? Themes.colors.success60
                  : Themes.colors.brand60
              }
            />
          )}
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
                  name="ic_camera"
                  size={Metrics.icons.small}
                  color={Themes.colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity hitSlop={styles.hitSlop} onPress={onViewImage}>
                <Text
                  style={[
                    styles.contentInfo,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  {translate("label.viewImage")}
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
        <SuccessModal
          isVisible={isShowSuccessModal}
          closeModal={hideSuccessModal}
          title={translate("alert.completeConfirm1")}
          message={translate("alert.completeConfirm", {
            name: item.Name,
          })}
          onConfirm={onConfirm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
