import { shipmentApi } from "@api";
import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { useNavigation } from "@react-navigation/core";
import { Button, ConfirmModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { RNCamera } from "react-native-camera";
import { ReceiveItem } from "./components/ReceiveItem";
import styles from "./styles";

export const ReceiveScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState<Array<string>>([]);
  const [isLoadingFetchData, showLoadingReceive, hideLoadingReceive] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const inputValue = useRef<string>("");
  const inputRef = useRef<TextInput>(null);

  const addNewCode = (code: string, noVibration?: boolean) => {
    if (!code || code === "") {
      Alert.warning("warning.dataInvalid");
      return;
    }
    setCodes(listCode => {
      const newCodes = [...listCode];
      if (!newCodes.includes(code)) {
        newCodes.unshift(code);
        if (!noVibration) {
          Vibration.vibrate();
        }
      }
      return newCodes;
    });
  };

  const onRead = ({ barcodes }: { barcodes: Array<any> }) => {
    if (Platform.OS === "android") {
      return;
    }
    if (!isLoadingFetchData) {
      if (barcodes.length > 0) {
        if (
          typeof barcodes[0].data === "string" &&
          barcodes[0].data.trim().length > 0
        ) {
          addNewCode(barcodes[0].data);
        } else {
          Alert.warning("warning.dataInvalid");
        }
      }
    }
  };

  const onBarCodeRead = (e: any) => {
    if (!isLoadingFetchData) {
      if (e.data) {
        if (typeof e.data === "string" && e.data.trim().length > 0) {
          addNewCode(e.data);
        } else {
          Alert.warning("warning.dataInvalid");
        }
      }
    }
  };

  const receiverCode = () => {
    showLoadingReceive();
    shipmentApi
      .receiveCodes(codes)
      ?.then(response => {
        if (response?.success) {
          setCodes([]);

          Alert.success(
            translate("success.receiveSuccess", { number: codes.length }),
            true,
          );
        } else {
          Alert.error("error.errorServer");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        hideLoadingReceive();
      });
  };

  const keyExtractor = useCallback((item: string) => `${item}`, []);

  const deleteItem = useCallback((item: string) => {
    setCodes(listCode => listCode.filter(c => c !== item));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return <ReceiveItem item={item} deleteItem={deleteItem} />;
    },
    [deleteItem],
  );

  const onPressAddCode = () => {
    addNewCode(inputValue.current, true);
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.receive")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.content}>
        <View style={styles.cameraView}>
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            captureAudio={false}
            onGoogleVisionBarcodesDetected={onRead}
            onBarCodeRead={onBarCodeRead}
          >
            <BarcodeMask
              width="80%"
              height="80%"
              showAnimatedLine={false}
              outerMaskOpacity={0.8}
            />
          </RNCamera>
        </View>
        <View style={styles.inputView}>
          <TextInput
            ref={inputRef}
            placeholder={translate("placeholder.scanOrType")}
            style={styles.input}
            contextMenuHidden={true}
            defaultValue={inputValue.current}
            onChangeText={text => (inputValue.current = text)}
            onSubmitEditing={_e => {
              onPressAddCode();
            }}
            returnKeyType="done"
            returnKeyLabel="Add"
          />
          <TouchableOpacity style={styles.addCode} onPress={onPressAddCode}>
            <Icon
              name="ic_plus"
              color={Themes.colors.bg}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={codes || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
        {codes && codes.length > 0 && (
          <Button
            title={translate("button.receive")}
            onPress={showConfirmModal}
            buttonStyle={styles.receiveBtn}
            buttonChildStyle={styles.receiveChildBtn}
            titleStyle={styles.receiveTextBtn}
            isLoading={isLoadingFetchData}
          />
        )}
      </View>
      <ConfirmModal
        isVisible={isShowConfirmModal}
        closeModal={hideConfirmModal}
        message={translate("alert.confirmReceive", { number: codes.length })}
        onConfirm={receiverCode}
      />
    </View>
  );
};
