import { BaseBottomSheet } from "@shared";
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
      <TouchableOpacity style={styles.serviceSelect} onPress={selectMode}>
        <Text>{mode.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        {modes && modes.map(mode => <Mode mode={mode} key={mode.Code} />)}
      </View>
    </BaseBottomSheet>
  );
};
