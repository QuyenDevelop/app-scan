import { BaseBottomSheet, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ModeShipmentResponse } from "src/models/Response/ServiceResponse";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelectMode: (value: ModeShipmentResponse) => void;
  modes: Array<ModeShipmentResponse>;
}
export const ModeModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelectMode, modes } = props;
  const Mode = ({ mode }: { mode: ModeShipmentResponse }) => {
    const selectMode = () => {
      closeModal();
      onSelectMode(mode);
    };
    return (
      <TouchableOpacity onPress={selectMode}>
        <View style={styles.serviceSelect}>
          <View style={styles.checkIcon} />
          <Text>{mode.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>
            {translate("label.shippingMode")}
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        {modes && modes.map(mode => <Mode mode={mode} key={mode.Code} />)}
      </View>
    </BaseBottomSheet>
  );
};
