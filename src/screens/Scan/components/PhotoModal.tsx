import { DATA_CONSTANT } from "@configs";
import { ShipmentImages } from "@models";
import { goToPhotoLibrary, goToUpload } from "@navigation";
import { BaseBottomSheet, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  shipment: string;
  service?: string;
  images?: Array<ShipmentImages> | [];
  reUpdateImagesList?: (
    photos: Array<ShipmentImages>,
    imgList?: Array<ShipmentImages>,
  ) => void;
}
export const PhotoModal: FunctionComponent<Props> = props => {
  const {
    isShowModal,
    closeModal,
    shipment,
    service,
    images,
    reUpdateImagesList,
  } = props;

  const goToTakePhoto = () => {
    closeModal();
    goToUpload({
      images: images ? images : [],
      reUpdateImagesList: reUpdateImagesList,
      prefix: service ? `${shipment}_${service}` : `${shipment}`,
      suffix: service
        ? DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices
        : DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
    });
  };

  const goToLibrary = () => {
    closeModal();
    goToPhotoLibrary({
      images: images,
      reUpdateImagesList: reUpdateImagesList,
      prefix: service ? `${shipment}_${service}` : `${shipment}`,
      suffix: service
        ? DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices
        : DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
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
