import { DATA_CONSTANT } from "@configs";
import { goToPhotoLibrary, goToUpload } from "@navigation";
import { BaseBottomSheet, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  shipment: string;
  service: string;
}
export const PhotoModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, shipment, service } = props;
  const goToTakePhoto = () => {
    closeModal();
    goToUpload({
      prefix: `${shipment}_${service}`,
      suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices,
    });
  };

  const goToLibrary = () => {
    closeModal();
    goToPhotoLibrary({
      prefix: `${shipment}_${service}`,
      suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices,
    });
  };

  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <TouchableOpacity style={styles.serviceSelect} onPress={goToTakePhoto}>
          <Text>{translate("button.takePhoto")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceSelect} onPress={goToLibrary}>
          <Text>{translate("button.chooseLibrary")}</Text>
        </TouchableOpacity>
      </View>
    </BaseBottomSheet>
  );
};
