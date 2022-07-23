/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Header } from "@components";
import { CONSTANT } from "@configs";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { PlatformAndroidStatic } from "@models";
import { goToUpdateCodScreen } from "@navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import { RNCamera } from "react-native-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EnterCodeModal } from "./components/EnterCodeModal";
import styles from "./styles";

export const ScanCODScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowEnterCode, showEnterCode, hideEnterCode] = useShow();
  const [isLoading, setShowLoading, setHideLoading] = useShow();
  const [errorContent, setErrorContent] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
  const [shipmentCode, setShipmentCode] = useState<string>("");
  const PlatformBrandConstraint = Platform.constants as PlatformAndroidStatic;

  useEffect(() => {
    PlatformBrandConstraint.Brand === CONSTANT.PLATFORM_BRAND.HONEYWELL &&
      inputRef.current &&
      inputRef.current.focus();
  }, [PlatformBrandConstraint.Brand]);

  const onRead = ({ barcodes }: { barcodes: any }) => {
    if (!isLoadingFetchData) {
      if (barcodes.length > 0) {
        Vibration.vibrate();
        setContent(barcodes[0]?.data);
        getShipment(barcodes[0]?.data);
      }
    }
  };

  const getShipment = (value: string) => {
    setShowLoading();
    setErrorContent("");
    if (!value || value === "") {
      Alert.error("error.errBarCode");
      return;
    }
    showIsLoadingFetchData();
    shipmentApi
      .scanShipmentCOD(value)
      ?.then(shipment => {
        if (shipment?.success) {
          setContent("");
          goToUpdateCodScreen({ item: shipment?.data });
        } else {
          setErrorContent(shipment?.message || "");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        Keyboard.dismiss();
        setShipmentCode("");
        setContent("");
        hideIsLoadingFetchData();
        setHideLoading();
      });
  };

  return (
    <View style={styles.container}>
      {isFocused &&
      PlatformBrandConstraint.Brand !== CONSTANT.PLATFORM_BRAND.HONEYWELL ? (
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          onGoogleVisionBarcodesDetected={onRead}
        >
          <BarcodeMask
            width={300}
            height={Dimensions.get("screen").height * 0.3}
            showAnimatedLine={false}
            outerMaskOpacity={0.8}
          />
          <View style={styles.markerView}>
            <View style={styles.topView}>
              {!!errorContent && (
                <>
                  <Icon
                    name="ic_shipment"
                    size={Metrics.icons.tiny}
                    color={Themes.colors.warningMain}
                  />
                  <Text style={styles.errorContent}>{errorContent}</Text>
                </>
              )}
            </View>
            <View style={styles.centerView}>
              {isLoadingFetchData && Platform.OS === "ios" && (
                <View style={styles.loadingView}>
                  <ActivityIndicator color={Themes.colors.collGray40} />
                </View>
              )}
            </View>
            <View
              style={[styles.bottomView, { paddingBottom: insets.bottom + 15 }]}
            >
              <View>
                <Text style={styles.qrUserManual}>
                  {translate("label.qrUserManual")}
                </Text>
                <TouchableOpacity
                  style={styles.enterKeyboardButton}
                  onPress={showEnterCode}
                >
                  <Icon
                    name="ic_keyboad"
                    size={Metrics.icons.tiny}
                    color={Themes.colors.white}
                  />
                  <Text style={styles.qrUserManual}>
                    {translate("button.enterCode")}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="ic_close_circle"
                  size={Metrics.icons.large}
                  color={Themes.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </RNCamera>
      ) : (
        <View style={{ flex: 1 }}>
          <Header
            title={translate("screens.checkAndScan")}
            iconLeftName={["ic_arrow_left"]}
            iconLeftOnPress={[() => navigation.goBack()]}
            isCenterTitle
            titleColor={Themes.colors.white}
          />
          {isLoading ? (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              color={Themes.colors.coolGray100}
            />
          ) : (
            <View
              style={[
                {
                  flexDirection: "row",
                  paddingHorizontal: ScreenUtils.scale(20),
                  paddingVertical: ScreenUtils.scale(10),
                  alignItems: "center",
                },
              ]}
            >
              <View style={styles.inputCode}>
                <Icon
                  color={Themes.colors.coolGray60}
                  name="ic_search"
                  size={Metrics.icons.small}
                />
                <TextInput
                  placeholder={translate("placeholder.scanOrType")}
                  placeholderTextColor={Themes.colors.collGray40}
                  style={{ flex: 1 }}
                  defaultValue={shipmentCode}
                  onChangeText={text => setShipmentCode(text)}
                  ref={inputRef}
                  returnKeyType="done"
                  returnKeyLabel="Add"
                  onSubmitEditing={_e => {
                    getShipment(shipmentCode);
                  }}
                />
                {shipmentCode !== "" && (
                  <TouchableOpacity
                    onPress={() => setShipmentCode("")}
                    style={styles.clearText}
                  >
                    <Icon
                      color={Themes.colors.coolGray80}
                      name="ic_close"
                      size={Metrics.icons.smallSmall}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={{ padding: ScreenUtils.scale(8) }}
                onPress={() => getShipment(shipmentCode)}
              >
                <Icon
                  name="ic_plus"
                  color={Themes.colors.bg}
                  size={Metrics.icons.small}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <EnterCodeModal
        isShowModal={isShowEnterCode}
        closeModal={hideEnterCode}
        code={content}
        onChangeCode={setContent}
        onCheckCode={getShipment}
      />
    </View>
  );
};
