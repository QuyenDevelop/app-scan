/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { Alert, getAsyncItem, setAsyncItem } from "@helpers";
import { useShow } from "@hooks";
import { PlatformAndroidStatic } from "@models";
import { BarcodeMask, useBarcodeRead } from "@nartc/react-native-barcode-mask";
import { useNavigation } from "@react-navigation/core";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
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
  Platform,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { ModalAddNewCode } from "./components/ModalAddNewCode";
import { ReceiveItem } from "./components/ReceiveItem";
import styles from "./styles";

export interface ReceiveBarcode {
  referenceNumber: string;
  pieces: number;
  acceptedDate: string;
  acceptedByUserName: string;
  acceptedByUserId: string;
  images: string[];
}

const getStoreBarcode = async (): Promise<Array<ReceiveBarcode>> => {
  const barcodes = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES,
  );
  return barcodes && Array.isArray(barcodes) ? barcodes : [];
};

export const ReceiveScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState<Array<ReceiveBarcode>>([]);
  const [isLoadingFetchData, showLoadingReceive, hideLoadingReceive] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const [shipmentCode, setShipmentCode] = useState<string>("");
  const [showModalAddNewCode, setShowModalAddNewCode, setHideModalAddNewCode] =
    useShow();
  const inputRef = useRef<TextInput>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userInfo = useSelector((state: IRootState) => state.account.profile);
  const isFocused = useIsFocused();
  const [isShowDetectCode, showDetectCode, hideDetectCode] = useShow();
  const [positionCode, setPositionCode] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const PlatformBrandConstraint = Platform.constants as PlatformAndroidStatic;

  const { barcodeRead, onBarcodeRead, onBarcodeFinderLayoutChange } =
    useBarcodeRead(
      isFocused,
      barcodeData => {
        return barcodeData;
      },
      processedBarcodeData => {
        addNewCode(processedBarcodeData.trim());
      },
      2000,
    );

  useFocusEffect(
    useCallback(() => {
      PlatformBrandConstraint.Brand === CONSTANT.PLATFORM_BRAND.HONEYWELL &&
        inputRef.current &&
        inputRef.current.focus();
    }, []),
  );

  useEffect(() => {
    getStoreBarcode().then((barcodes: Array<ReceiveBarcode>) => {
      setCodes(barcodes);
    });
  }, []);

  const isValidBarcode = (code: string): boolean => {
    const refactoredCode = code.trim();
    if (
      !refactoredCode ||
      refactoredCode.length < 10 ||
      /[^a-z0-9]/i.test(code)
    ) {
      return false;
    }
    return true;
  };

  const addNewCode = useCallback(
    async (code: string, noVibration?: boolean) => {
      if (!isValidBarcode(code)) {
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
          images: [],
        });
        await setAsyncItem(
          CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES,
          newCodes,
        );
        setCodes(newCodes);
        setShipmentCode("");
        inputRef.current?.clear();
        if (!noVibration) {
          Vibration.vibrate();
        }
      } else {
        setShowModalAddNewCode();
      }
    },
    [codes, userInfo?.name, userInfo?.sub],
  );

  const onRead = async ({ barcodes }: { barcodes: Array<any> }) => {
    if (isLoadingFetchData || barcodeRead) {
      return;
    }

    if (barcodes.length > 0) {
      setPositionCode({
        top: barcodes[0].bounds.origin.y,
        left: barcodes[0].bounds.origin.x,
        width: barcodes[0].bounds.size.width,
        height: barcodes[0].bounds.size.height,
      });
      showDetectCode();
      setTimeout(() => {
        hideDetectCode();
      }, 200);
      onBarcodeRead(barcodes[0]);
    }
  };

  const handleCancel = () => {
    hideConfirmModal();
    inputRef.current && inputRef.current.focus();
  };

  const handleConfirmAddCode = () => {
    const newCodes = [...codes];
    const findCodeIndex = newCodes.findIndex(
      c => c.referenceNumber === shipmentCode.trim(),
    );
    newCodes[findCodeIndex] = {
      ...newCodes[findCodeIndex],
      pieces: newCodes[findCodeIndex].pieces + 1,
    };
    setCodes(newCodes);
    setShipmentCode("");
    inputRef.current?.clear();
  };

  const handleCancelAddCode = () => {
    setShipmentCode("");
    inputRef.current?.clear();
    setHideModalAddNewCode();
  };

  const receiverCode = () => {
    showLoadingReceive();
    shipmentApi
      .receiveCodes(codes)
      ?.then(async response => {
        if (response?.success) {
          await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES, []);
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
        inputRef.current && inputRef.current.focus();
      });
  };

  const deleteItem = useCallback(
    async (item: string) => {
      const newCodes = codes.filter(c => c.referenceNumber !== item);
      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES, newCodes);
      setCodes(newCodes);
      inputRef.current && inputRef.current.focus();
    },
    [codes],
  );

  const updatePieces = useCallback(
    async (index: number, value: number) => {
      const newCodes = [...codes];
      newCodes[index] = {
        ...newCodes[index],
        pieces: isNaN(value) || value < 1 ? 1 : value,
      };
      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES, newCodes);
      setCodes(newCodes);
    },
    [codes],
  );

  const updateImages = useCallback(
    async (index: number, value: string[]) => {
      console.log("object");
      const newCodes = [...codes];
      newCodes[index] = {
        ...newCodes[index],
        images: [...newCodes[index].images, ...value],
      };
      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.RECEIVE_BARCODES, newCodes);
      setCodes(newCodes);
    },
    [codes],
  );

  const keyExtractor = (item: ReceiveBarcode) => `${item.referenceNumber}`;
  const renderItem = useCallback(
    ({ item, index }: { item: ReceiveBarcode; index: number }) => {
      return (
        <ReceiveItem
          item={item}
          index={index}
          deleteItem={deleteItem}
          updatePieces={updatePieces}
          updateImages={updateImages}
        />
      );
    },
    [deleteItem],
  );

  const isShipmentCode = (value: string) => {
    return new RegExp(/^([0-9A-Z]){9,20}$/g).test(value);
  };

  const onPressAddCode = () => {
    if (isShipmentCode(shipmentCode)) {
      addNewCode(shipmentCode.trim(), true);
    } else {
      setShipmentCode("");
      Alert.error("error.errBarCode");
    }
  };

  const onChangeInputText = (value: string) => {
    setShipmentCode(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (!isShipmentCode(value)) {
        setShipmentCode("");
        Alert.error("error.errBarCode");
      } else {
        addNewCode(value.trim(), true);
      }
    }, 2000);
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
        {PlatformBrandConstraint.Brand !==
          CONSTANT.PLATFORM_BRAND.HONEYWELL && (
          <View style={styles.cameraView}>
            {isFocused && (
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
            )}

            {isShowDetectCode && (
              <View
                style={{
                  position: "absolute",
                  top: positionCode.top,
                  left: positionCode.left,
                  height: 2,
                  width: positionCode.width,
                  backgroundColor: Themes.colors.success60,
                }}
              />
            )}
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            placeholder={translate("placeholder.scanOrType")}
            style={styles.input}
            value={shipmentCode}
            ref={inputRef}
            contextMenuHidden={true}
            onChangeText={onChangeInputText}
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
        closeModal={handleCancel}
        message={translate("alert.confirmReceive", { number: codes.length })}
        onConfirm={receiverCode}
      />
      <ModalAddNewCode
        isVisible={showModalAddNewCode}
        closeModal={handleCancelAddCode}
        message={translate("label.confirmAddCode")}
        onConfirm={handleConfirmAddCode}
      />
    </View>
  );
};
