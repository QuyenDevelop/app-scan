import { Alert } from "@helpers";
import { Button, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import { Modal, TextInput, View } from "react-native";
import styles from "./styles";

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  onConfirm: (password: string) => void;
}

export const RequestPasswordModal: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, onConfirm } = props;
  const [password, setPassword] = useState<string>("");

  const cancelRequest = () => {
    setPassword("");
    closeModal();
  };

  const confirmPassword = () => {
    if (password.trim()) {
      onConfirm(password);
      setPassword("");
      closeModal();
    } else {
      Alert.error("error.validation.password");
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={cancelRequest}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Icon
            name="ic_check-circle-outline"
            size={Metrics.icons.large}
            color={Themes.colors.success60}
          />
          <Text style={styles.title}>
            {translate("label.pleaseEnterPassword")}
          </Text>
          <TextInput
            placeholder={translate("placeholder.password")}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.confirm}>
            <Button
              title={translate("button.cancel")}
              buttonStyle={styles.button}
              buttonChildStyle={[
                styles.buttonChild,
                { backgroundColor: Themes.colors.colGray10 },
              ]}
              onPress={cancelRequest}
              titleStyle={{ color: Themes.colors.coolGray100 }}
            />
            <Button
              title={translate("button.submit")}
              buttonStyle={styles.button}
              buttonChildStyle={styles.buttonChild}
              onPress={confirmPassword}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
