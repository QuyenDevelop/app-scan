/* eslint-disable react-hooks/exhaustive-deps */
import { useShow } from "@hooks";
import { Text, translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
interface OwnProps {
  isVisible: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  isShowReason: boolean;
  onChangeReason?: (value: string) => void;
  isLoadingSubmit?: boolean;
}

type Props = OwnProps;

export const ConfirmModal: FunctionComponent<Props> = props => {
  const {
    isVisible,
    isLoadingSubmit,
    isShowReason,
    closeModal,
    onConfirm,
    onChangeReason,
  } = props;
  const [showReason, setShowReason] = useState<number>(1);
  const [isShowInput, setShowInput, setHideInput] = useShow();

  useEffect(() => {
    if (showReason === 1) {
      onChangeReason?.("Không thấy hàng");
      setHideInput();
    } else {
      onChangeReason?.("");
      setShowInput();
    }
  }, [showReason]);

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>
              {translate("screens.picking.confirmTitle")}
            </Text>
            {isShowReason && (
              <View>
                <Text style={styles.message}>
                  {translate("screens.picking.confirmMessage")}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowReason(1)}
                  style={[styles.radioButton]}
                >
                  <View
                    style={[
                      styles.rateItemContainer,
                      {
                        backgroundColor: Themes.colors.white,
                      },
                      showReason === 1 ? styles.check : styles.uncheck,
                    ]}
                  >
                    {showReason === 1 && (
                      <View style={styles.circleCheckedContainer} />
                    )}
                  </View>
                  <Text style={[styles.buttonRateText]}>
                    {translate("screens.picking.confirmNoFindShipment")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowReason(2)}
                  style={[styles.radioButton]}
                >
                  <View
                    style={[
                      styles.rateItemContainer,
                      {
                        backgroundColor: Themes.colors.white,
                      },
                      showReason === 2 ? styles.check : styles.uncheck,
                    ]}
                  >
                    {showReason === 2 && (
                      <View style={styles.circleCheckedContainer} />
                    )}
                  </View>
                  <Text style={[styles.buttonRateText]}>
                    {translate("screens.picking.confirmReason")}
                  </Text>
                </TouchableOpacity>
                {isShowInput && (
                  <TextInput
                    // value={barcode}
                    placeholder={translate("screens.picking.reason")}
                    style={styles.input}
                    contextMenuHidden={true}
                    onChangeText={value => onChangeReason?.(value)}
                    multiline
                  />
                )}
              </View>
            )}
            <View style={styles.confirm}>
              <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Text style={styles.buttonCancel}>
                  {translate("button.cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={styles.buttonChild}>
                {isLoadingSubmit ? (
                  <ActivityIndicator color={Themes.colors.coolGray100} />
                ) : (
                  <Text style={styles.buttonSubmit}>
                    {translate("button.submit")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
