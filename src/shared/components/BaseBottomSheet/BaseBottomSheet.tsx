import { ScreenUtils } from "@helpers";
import { Metrics } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

interface BottomSheetOption {
  color?: string;
  iconName?: string;
  iconSize?: number;
  isHideIcon?: boolean;
  title?: string;
  key?: string;
  titleColor?: string;
  content?: string;
  contentColor?: string;
  onPress: (value?: string) => void;
  isChecked?: boolean;
}

interface IProps {
  header?: string;
  isShowModal: boolean;
  onCloseModal: Function;
  onModalHide?: () => void;
  children: JSX.Element;
}

export const BaseBottomSheet: FunctionComponent<IProps> = props => {
  const { onCloseModal, isShowModal, onModalHide, children } = props;
  const [isShowModalState, setIsShowModalState] = useState(isShowModal);
  const insets = useSafeAreaInsets();
  const hideModal = function () {
    setIsShowModalState(false);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  useEffect(() => {
    setIsShowModalState(isShowModal);
  }, [isShowModal]);

  return (
    <Modal
      useNativeDriver
      useNativeDriverForBackdrop
      statusBarTranslucent
      propagateSwipe={true}
      hardwareAccelerated={false}
      onBackdropPress={() => hideModal()}
      onBackButtonPress={() => hideModal()}
      onSwipeComplete={() => hideModal()}
      onModalHide={onModalHide ? () => onModalHide() : () => {}}
      // swipeDirection="down"
      style={styles.modalContainer}
      isVisible={isShowModalState}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            maxHeight:
              Metrics.screenHeight -
              insets.top -
              ScreenUtils.calculatorHeight(Metrics.baseMargin * 40),
          }}
        >
          <View style={styles.headerContainer} />
          <View
            style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
          >
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
