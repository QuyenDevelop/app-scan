import { shipmentApi } from "@api";
import { Header, RequireLogin } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { Account, ShipmentCODResponse } from "@models";
import { goToUpdateCodScreen } from "@navigation";
import { IRootState } from "@redux";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import debounce from "lodash/debounce";
import React, { FunctionComponent, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "./styles";

export const ScanCODScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const profile = useSelector(
    (state: IRootState) => state.account.profile,
  ) as Account | null;
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowQrCode, showQrCode, hideQrCode] = useShow(true);
  const [shipments, setShipments] = useState<ShipmentCODResponse>();

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    if (value === "") {
      setShipments(undefined);
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
          Alert.warning(shipment?.message || "", true);
        }
      })
      .catch(err => {
        Alert.error(err, true);
      })
      .finally(() => {
        Keyboard.dismiss();
        hideIsLoadingFetchData();
      });
  };

  const getShipmentOnType = useRef(debounce(getShipment, 500)).current;

  const searchShipments = (value: string) => {
    setContent(value);
    getShipmentOnType(value);
  };

  const onFocus = () => {
    hideQrCode();
  };
  const onBlur = () => {
    if (content === "" && !shipments) {
      showQrCode();
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title={translate("screens.codScreen")} />
      {profile ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Text>{translate("label.scanOrTypeShipment")}</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder={translate("placeholder.scanOrType")}
                  style={styles.inputCode}
                  defaultValue={content}
                  onChangeText={searchShipments}
                  placeholderTextColor={Themes.colors.collGray40}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => {
                    Keyboard.dismiss();
                    showQrCode();
                  }}
                >
                  <Icon
                    name="qr_code"
                    size={Metrics.icons.medium}
                    color={Themes.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {isLoadingFetchData ? (
            <View style={styles.loadingView}>
              <ActivityIndicator />
            </View>
          ) : isShowQrCode ? (
            <QRCodeScanner
              onRead={onRead}
              reactivate={true}
              reactivateTimeout={2000}
              showMarker
              fadeIn={true}
              cameraStyle={styles.camera}
            />
          ) : null}
        </>
      ) : (
        <RequireLogin />
      )}
    </View>
  );
};
