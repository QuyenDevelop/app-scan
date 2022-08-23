/* eslint-disable react-native/no-inline-styles */
import { Text, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface OwnProps {
  isVisible: boolean;
  closeModal: () => void;
  message: string;
}

type Props = OwnProps;

export const ErrorModal: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, message } = props;

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{translate("label.error")}</Text>
          <Text style={styles.message}>
            {message !== "" ? message : translate("error.errBarCode")}
          </Text>
          <View style={styles.confirm}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonCancel}>
                {translate("button.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
