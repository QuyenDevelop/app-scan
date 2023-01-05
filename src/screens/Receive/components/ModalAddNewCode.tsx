import { Button, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Modal, View } from "react-native";
import styles from "./styles";
interface OwnProps {
  message: string;
  iconName?: string;
  iconColor?: string;
  isVisible: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

type Props = OwnProps;

export const ModalAddNewCode: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, message, onConfirm, iconName, iconColor } =
    props;

  const pressConfirm = () => {
    closeModal();
    onConfirm();
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
          {!!iconName && (
            <Icon
              name={iconName}
              size={Metrics.icons.large}
              color={iconColor ?? Themes.colors.brand60}
              styles={styles.icon}
            />
          )}

          <Text style={styles.message}>{translate("label.haveShipment")}</Text>
          <Text style={styles.messageText}>{message}</Text>
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
              title={translate("button.confirm")}
              buttonStyle={styles.button}
              buttonChildStyle={styles.buttonChild}
              onPress={pressConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
