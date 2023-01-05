import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import styles from "./styles";

interface OwnProps {
  isVisible: boolean;
}

type Props = OwnProps;

export const UploadWaitingModal: FunctionComponent<Props> = props => {
  const { isVisible } = props;

  return (
    <Modal
      transparent={true}
      style={[styles.container]}
      visible={isVisible}
      statusBarTranslucent={true}
    >
      <View style={styles.loading}>
        <ActivityIndicator color={Themes.colors.secondary} size={"small"} />
      </View>
    </Modal>
  );
};
