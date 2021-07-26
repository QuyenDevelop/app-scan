import { ScreenUtils } from "@helpers";
import { Icon, TextInput, translate } from "@shared";
import { Icons, Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
export interface BottomSheetOption {
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
  arrOption: BottomSheetOption[];
  onCloseModal: Function;
  onModalHide?: () => void;
  isSearch?: boolean;
  titleSearch?: string;
  isTranslated?: boolean;
  titleModal?: string;
  showTitle?: boolean;
}

export const BottomSheet: FunctionComponent<IProps> = props => {
  const {
    onCloseModal,
    titleModal,
    arrOption,
    isShowModal,
    onModalHide,
    isSearch = false,
    titleSearch,
    isTranslated = true,
    showTitle = true,
  } = props;
  const [isShowModalState, setIsShowModalState] = useState(isShowModal);
  const [dataSource, setDataSource] = useState(arrOption);
  const insets = useSafeAreaInsets();
  const hideModal = function () {
    setIsShowModalState(false);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const searchFilterFunction = (searchText: string, data: any) => {
    let newData = [];
    if (searchText) {
      newData = data.filter(function (item: any) {
        const itemData = item.title.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.startsWith(textData);
      });
      setDataSource(newData);
    } else {
      setDataSource(arrOption);
    }
  };
  const [maxHeight, setMaxHeight] = useState(
    Dimensions.get("window").height * 0.9,
  );
  function onKeyboardDidShow(e: KeyboardEvent): void {
    setMaxHeight(Dimensions.get("window").height - e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setMaxHeight(Dimensions.get("window").height * 0.9);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
    };
  }, []);
  useEffect(() => {
    setIsShowModalState(isShowModal);
  }, [isShowModal]);

  useEffect(() => {
    setDataSource(arrOption);
  }, [arrOption]);

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
      swipeDirection="down"
      style={styles.modalContainer}
      isVisible={isShowModalState}
    >
      <KeyboardAvoidingView
        behavior={"position"}
        style={{
          maxHeight: maxHeight,
        }}
      >
        <View style={styles.headerContainer} />
        <View
          style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
        >
          {isSearch ? (
            <View style={styles.searchBarContainer}>
              <TextInput
                onChangeText={(text: string) => {
                  searchFilterFunction(text, arrOption);
                }}
                placeholder={titleSearch}
                inputStyle={styles.search}
                containerStyle={{ flex: 1 }}
                iconName={"ic_search"}
              />
            </View>
          ) : null}
          {showTitle && titleModal ? (
            <View style={styles.titleModalContainer}>
              <Text style={styles.titleModalText}>
                {isTranslated ? titleModal : translate(titleModal)}
              </Text>
              <TouchableOpacity onPress={() => hideModal()}>
                <Icons.Ionicons
                  name={"ios-close-outline"}
                  size={Metrics.icons.medium}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <ScrollView
            style={{ marginBottom: ScreenUtils.calculatorHeight(20) }}
            showsVerticalScrollIndicator={false}
          >
            {dataSource.map((item: BottomSheetOption, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress ? () => item.onPress() : () => {}}
                style={styles.itemContainer}
              >
                <View style={styles.titleContainer}>
                  {item.iconName && !item.isHideIcon ? (
                    <Icon
                      color={item.color ? item.color : Themes.colors.collGray40}
                      name={item.iconName}
                      size={item.iconSize ? item.iconSize : Metrics.icons.small}
                      styles={styles.icon}
                    />
                  ) : null}
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.text,
                      item.titleColor ? { color: item.titleColor } : {},
                    ]}
                  >
                    {isTranslated ? item.title : translate(item.title)}
                  </Text>
                </View>

                {item.content ? (
                  <View style={styles.contentDetailContainer}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.textContent,
                        item.contentColor ? { color: item.contentColor } : {},
                      ]}
                    >
                      {isTranslated ? item.content : translate(item.content)}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
