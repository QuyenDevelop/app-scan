import { Button, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Modal, View } from "react-native";
import styles from "./styles";
interface OwnProps {
  message: string;
  isVisible: boolean;
  closeModal: () => void;
  confirmDelete: () => void;
}

type Props = OwnProps;

export const DeleteModal: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, message, confirmDelete } = props;

  const onConfirmDelete = () => {
    closeModal();
    confirmDelete();
  };
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
          <Icon
            name="ic_delete"
            size={Metrics.icons.large}
            color={Themes.colors.brand60}
            styles={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
          <View style={styles.confirm}>
            <Button
              title={translate("button.cancel")}
              buttonStyle={styles.button}
              buttonChildStyle={[
                styles.buttonChild,
                { backgroundColor: Themes.colors.colGray10 },
              ]}
              onPress={closeModal}
              titleStyle={{ color: Themes.colors.coolGray100 }}
            />
            <Button
              title={translate("button.submit")}
              buttonStyle={styles.button}
              buttonChildStyle={styles.buttonChild}
              onPress={onConfirmDelete}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
