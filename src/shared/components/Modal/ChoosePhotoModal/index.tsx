import { goToPhotoLibrary, goToUpload } from "@navigation";
import { BaseBottomSheet, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  prefix: string;
  suffix: string;
}
export const ChoosePhotoModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, prefix, suffix } = props;
  const goToTakePhoto = () => {
    closeModal();
    goToUpload({
      prefix: prefix,
      suffix: suffix,
    });
  };

  const goToLibrary = () => {
    closeModal();
    goToPhotoLibrary({
      prefix: prefix,
      suffix: suffix,
    });
  };

  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <TouchableOpacity style={styles.itemSelect} onPress={goToTakePhoto}>
          <Text>{translate("button.takePhoto")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemSelect} onPress={goToLibrary}>
          <Text>{translate("button.chooseLibrary")}</Text>
        </TouchableOpacity>
      </View>
    </BaseBottomSheet>
  );
};
