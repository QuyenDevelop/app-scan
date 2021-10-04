import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { useNavigation } from "@react-navigation/core";
import { Button, ConfirmModal, translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import { FlatList, Platform, Vibration, View } from "react-native";
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
          setCodes(listCode => {
            const newCodes = [...listCode];
            if (!newCodes.includes(barcodes[0].data)) {
              newCodes.unshift(barcodes[0].data);
              Vibration.vibrate();
            }
            return newCodes;
          });
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
          setCodes(listCode => {
            const newCodes = [...listCode];
            if (!newCodes.includes(e.data)) {
              newCodes.unshift(e.data);
              Vibration.vibrate();
            }
            return newCodes;
          });
        } else {
          Alert.warning("warning.dataInvalid");
        }
      }
    }
  };

  const receiverCode = () => {
    showLoadingReceive();
    setCodes([]);
    hideLoadingReceive();
    Alert.success(
      translate("success.receiveSuccess", { number: codes.length }),
      true,
    );
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
        <FlatList
          data={codes || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
