/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { Alert, getAsyncItem, setAsyncItem } from "@helpers";
import { useShow } from "@hooks";
import { LocationResponse } from "@models";
import { BarcodeMask, useBarcodeRead } from "@nartc/react-native-barcode-mask";
import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { IRootState } from "@redux";
import {
  Button,
  ConfirmModal,
  Icon,
  LocationModal,
  Text,
  translate,
} from "@shared";
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
import { InventoryItem } from "./components/InventoryItem";
import styles from "./styles";

export interface InventoryBarcode {
  referenceNumber: string;
  pieces: number;
  acceptedDate: string;
  acceptedByUserName: string;
  acceptedByUserId: string;
}

const getStoreBarcode = async (): Promise<Array<InventoryBarcode>> => {
  const barcodes = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES,
  );
  return barcodes && Array.isArray(barcodes) ? barcodes : [];
};

export const InventoryScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState<Array<InventoryBarcode>>([]);
  const [isLoadingFetchData, showLoadingInventory, hideLoadingInventory] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const [isShowLocationModal, showLocationModal, hideLocationModal] = useShow();
  const inputValue = useRef<string>("");
  const inputRef = useRef<TextInput>(null);
  const userInfo = useSelector((state: IRootState) => state.account.profile);
  const isFocused = useIsFocused();
  const [isShowDetectCode, showDetectCode, hideDetectCode] = useShow();
  const [locationSelected, setLocationSelected] = useState<LocationResponse>();
  const [positionCode, setPositionCode] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
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

  useEffect(() => {
    getStoreBarcode().then((barcodes: Array<InventoryBarcode>) => {
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
        });
        await setAsyncItem(
          CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES,
          newCodes,
        );
        setCodes(newCodes);
        inputRef.current?.clear();
        if (!noVibration) {
          Vibration.vibrate();
        }
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

  const inventoryCode = () => {
    showLoadingInventory();
    shipmentApi
      .inventoryCodes(codes)
      ?.then(async response => {
        if (response?.success) {
          await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES, []);
          setCodes([]);
          Alert.success(
            translate("success.inventoryCode", { number: codes.length }),
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
        hideLoadingInventory();
      });
  };

  const keyExtractor = useCallback(
    (item: InventoryBarcode) => `${item.referenceNumber}`,
    [],
  );

  const deleteItem = useCallback(
    async (item: string) => {
      const newCodes = codes.filter(c => c.referenceNumber !== item);
      await setAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES,
        newCodes,
      );
      setCodes(newCodes);
    },
    [codes],
  );

  const updatePieces = useCallback(
    async (index: number, value: number) => {
      console.log("🚀🚀🚀 => value", value);
      const newCodes = [...codes];
      newCodes[index] = {
        ...newCodes[index],
        pieces: isNaN(value) || value < 1 ? 1 : value,
      };
      await setAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.INVENTORY_BARCODES,
        newCodes,
      );
      setCodes(newCodes);
    },
    [codes],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: InventoryBarcode; index: number }) => {
      return (
        <InventoryItem
          item={item}
          index={index}
          deleteItem={deleteItem}
          updatePieces={updatePieces}
        />
      );
    },
    [deleteItem, updatePieces],
  );

  const onPressAddCode = () => {
    addNewCode(inputValue.current.trim(), true);
  };

  const onSelectLocation = (location: LocationResponse) => {
    console.log("🚀🚀🚀 => onSelectLocation => location", location);
    setLocationSelected(location);
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.inventory")}
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
        <View style={styles.toolView}>
          <TouchableOpacity
            style={styles.locationBtn}
            onPress={showLocationModal}
          >
            <Icon
              name="ic_location"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.red0722}
            />
            <Text style={styles.locationText}>
              {locationSelected?.Name || translate("button.selectLocation")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
          <Text>
            -/- {translate("label.system")}/{translate("label.reality")}
          </Text>
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
            title={translate("button.inventory")}
            onPress={showConfirmModal}
            buttonStyle={styles.inventoryBtn}
            buttonChildStyle={styles.inventoryChildBtn}
            titleStyle={styles.inventoryTextBtn}
            isLoading={isLoadingFetchData}
          />
        )}
      </View>
      <ConfirmModal
        isVisible={isShowConfirmModal}
        closeModal={hideConfirmModal}
        message={translate("alert.confirmInventory", { number: codes.length })}
        onConfirm={inventoryCode}
      />
      <LocationModal
        isShowModal={isShowLocationModal}
        closeModal={hideLocationModal}
        onSelectLocation={onSelectLocation}
      />
    </View>
  );
};
