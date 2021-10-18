/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { Alert, getAsyncItem, setAsyncItem, Utils } from "@helpers";
import { useShow } from "@hooks";
import { BarcodeMask, useBarcodeRead } from "@nartc/react-native-barcode-mask";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Button, ConfirmModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { ReceiveItem } from "./components/ReceiveItem";
import styles from "./styles";

export interface Barcode {
  referenceNumber: string;
  pieces: number;
  acceptedDate: string;
  acceptedByUserName: string;
  acceptedByUserId: string;
}

const getStoreBarcode = async (): Promise<Array<Barcode>> => {
  const barcodes = await getAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES);
  return barcodes && Array.isArray(barcodes) ? barcodes : [];
};

export const ReceiveScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState<Array<Barcode>>([]);
  const [isLoadingFetchData, showLoadingReceive, hideLoadingReceive] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const inputValue = useRef<string>("");
  const inputRef = useRef<TextInput>(null);
  const userInfo = useSelector((state: IRootState) => state.account.profile);
  const [isScanning, scanning, scanned] = useShow();
  const isFocused = useIsFocused();

  const { onBarcodeFinderLayoutChange } = useBarcodeRead(
    isFocused,
    barcodeData => {
      return barcodeData;
    },
    processedBarcodeData => {
      addNewCode(processedBarcodeData.trim());
    },
    2000,
  );

  useEffect(() => {
    getStoreBarcode().then((barcodes: Array<Barcode>) => {
      setCodes(barcodes);
    });
  }, []);

  const addNewCode = useCallback(
    async (code: string, noVibration?: boolean) => {
      if (!code || code.trim() === "") {
        Alert.warning("warning.dataInvalid");
        return;
      }
      const newCodes = [...codes];
      const findCodeIndex = newCodes.findIndex(
        c => c.referenceNumber === code.trim(),
      );
      if (findCodeIndex < 0) {
        newCodes.unshift({
          referenceNumber: code.trim(),
          pieces: 1,
          acceptedDate: new Date().toISOString(),
          acceptedByUserName: userInfo?.name || "",
          acceptedByUserId: userInfo?.sub || "",
        });
      } else {
        newCodes[findCodeIndex] = {
          ...newCodes[findCodeIndex],
          pieces: newCodes[findCodeIndex].pieces + 1,
        };
      }

      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES, newCodes);
      setCodes(newCodes);
      inputRef.current?.clear();
      if (!noVibration) {
        Vibration.vibrate();
      }
    },
    [codes, userInfo?.name, userInfo?.sub],
  );

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (isLoadingFetchData || isScanning) {
      return;
    }

    if (barcodes.length > 0) {
      scanning();
      if (barcodes.length > 0) {
        addNewCode(barcodes[0].data.trim());
      }
      await Utils.delay(2000);
      scanned();
    }
  };

  const receiverCode = () => {
    showLoadingReceive();
    shipmentApi
      .receiveCodes(codes)
      ?.then(async response => {
        if (response?.success) {
          await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES, []);
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

  const keyExtractor = useCallback(
    (item: Barcode) => `${item.referenceNumber}`,
    [],
  );

  const deleteItem = useCallback(
    async (item: string) => {
      const newCodes = codes.filter(c => c.referenceNumber !== item);
      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES, newCodes);
      setCodes(newCodes);
    },
    [codes],
  );

  const renderItem = useCallback(
    ({ item }: { item: Barcode }) => {
      return <ReceiveItem item={item} deleteItem={deleteItem} />;
    },
    [deleteItem],
  );

  const onPressAddCode = () => {
    addNewCode(inputValue.current.trim(), true);
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
          >
            <BarcodeMask
              width={280}
              height={100}
              edgeWidth={20}
              edgeHeight={20}
              edgeRadius={20}
              showAnimatedLine={false}
              maskOpacity={0.7}
              backgroundColor={Themes.colors.black}
              onLayoutChange={onBarcodeFinderLayoutChange}
            />
          </RNCamera>
        </View>

        <View style={styles.inputView}>
          <TextInput
            ref={inputRef}
            placeholder={translate("placeholder.scanOrType")}
            style={styles.input}
            contextMenuHidden={true}
            onChangeText={text => (inputValue.current = text)}
            onSubmitEditing={_e => {
              onPressAddCode();
            }}
            returnKeyType="done"
            returnKeyLabel="Add"
            blurOnSubmit={false}
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
