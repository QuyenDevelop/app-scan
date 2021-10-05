import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { Alert, getAsyncItem, setAsyncItem } from "@helpers";
import { useShow } from "@hooks";
import { useNavigation } from "@react-navigation/core";
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
import BarcodeMask from "react-native-barcode-mask";
import { RNCamera } from "react-native-camera";
import { ReceiveItem } from "./components/ReceiveItem";
import styles from "./styles";

const getStoreBarcode = async (): Promise<Array<string>> => {
  const barcodes = await getAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES);
  return barcodes && Array.isArray(barcodes) ? barcodes : [];
};

export const ReceiveScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const [codes, setCodes] = useState<Array<string>>([]);
  const [isLoadingFetchData, showLoadingReceive, hideLoadingReceive] =
    useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const inputValue = useRef<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    getStoreBarcode().then((barcodes: Array<string>) => {
      setCodes(barcodes);
    });
  }, []);

  const addNewCode = useCallback(
    async (code: string, noVibration?: boolean) => {
      if (!code || code === "") {
        Alert.warning("warning.dataInvalid");
        return;
      }
      const newCodes = [...codes];
      if (!newCodes.includes(code)) {
        newCodes.unshift(code);
        await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES, newCodes);
        setCodes(newCodes);
        if (!noVibration) {
          Vibration.vibrate();
        }
      }
    },
    [codes],
  );

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

  const keyExtractor = useCallback((item: string) => `${item}`, []);

  const deleteItem = useCallback(
    async (item: string) => {
      const newCodes = codes.filter(c => c !== item);
      await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.BARCODES, newCodes);
      setCodes(newCodes);
    },
    [codes],
  );

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
