import { DATA_CONSTANT, SCREENS } from "@configs";
import { NavigationUtils } from "@helpers";
import { ShipmentImages } from "@models";
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
export const TakePhotoModal: FunctionComponent<Props> = props => {
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
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_UPLOAD_SCREEN,
      params: {
        images: images ? images : [],
        reUpdateImagesList: reUpdateImagesList,
        prefix: service ? `${shipment}_${service}` : `${shipment}`,
        suffix: service
          ? DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices
          : DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
      },
    });
  };

  const goToLibrary = () => {
    closeModal();
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_PHOTOS_SCREEN,
      params: {
        images: images ? images : [],
        reUpdateImagesList: reUpdateImagesList,
        prefix: service ? `${shipment}_${service}` : `${shipment}`,
        suffix: service
          ? DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices
          : DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
      },
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
