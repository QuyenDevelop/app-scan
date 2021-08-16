import { BaseBottomSheet, Button, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  code: string;
  onChangeCode: (value: string) => void;
  closeModal: () => void;
  onCheckCode: (value: string) => void;
}
export const EnterCodeModal: FunctionComponent<Props> = props => {
  const { isShowModal, onChangeCode, code, closeModal, onCheckCode } = props;
  const onCheck = () => {
    closeModal();
    onCheckCode(code);
  };
  return (
    <BaseBottomSheet
      isShowModal={isShowModal}
      onCloseModal={closeModal}
      keyboardAvoidingViewAndroid="padding"
    >
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>
            {translate("button.enterCode")}
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.enterCode}
          placeholder={translate("placeholder.scanOrType")}
          placeholderTextColor={Themes.colors.collGray40}
          value={code}
          onChangeText={onChangeCode}
          returnKeyType="search"
          returnKeyLabel={translate("button.search")}
          onSubmitEditing={value => {
            closeModal();
            onCheckCode(value.nativeEvent.text);
          }}
        />
        <Button title={translate("button.checkCode")} onPress={onCheck} />
      </View>
    </BaseBottomSheet>
  );
};
