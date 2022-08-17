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
  shipmentIndex: number;
  images?: Array<ShipmentImages> | Array<string>;
  updateImages: (shipmentIndex: number, imgList: Array<string>) => void;
}
export const TakePhotoModal: FunctionComponent<Props> = props => {
  const {
    isShowModal,
    closeModal,
    shipment,
    images,
    shipmentIndex,
    updateImages,
  } = props;

  const goToTakePhoto = () => {
    closeModal();
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_UPLOAD_SCREEN,
      params: {
        shipmentIndex: shipmentIndex,
        images: images,
        reUpdateImagesList: updateImages,
        prefix: shipment,
        suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
      },
    });
  };

  const goToLibrary = () => {
    closeModal();
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_PHOTOS_SCREEN,
      params: {
        shipmentIndex: shipmentIndex,
        images: images,
        reUpdateImagesList: updateImages,
        prefix: shipment,
        suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
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
