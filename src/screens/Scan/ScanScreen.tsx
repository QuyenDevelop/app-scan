import { shipmentApi } from "@api";
import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { Account, ShipmentResponse } from "@models";
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
import { ListShipment } from "./components/ListShipment";
import { Logout } from "./components/Logout";
import styles from "./styles";
export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const profile = useSelector(
    (state: IRootState) => state.account.profile,
  ) as Account | null;
  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowQrCode, showQrCode, hideQrCode] = useShow(true);
  const [shipments, setShipments] = useState<Array<ShipmentResponse>>([]);

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    if (value === "") {
      setShipments([]);
      return;
    }
    showIsLoadingFetchData();
    shipmentApi
      .scanShipment(value)
      ?.then(shipment => {
        setShipments(shipment?.data || []);
        if (shipment?.success) {
          hideQrCode();
        } else {
          Alert.warning(shipment?.message || "", true);
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
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
    if (content === "" && shipments.length === 0) {
      showQrCode();
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title={translate("screens.checkAndScan")} />
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
                  returnKeyType="search"
                  returnKeyLabel={translate("button.search")}
                  onSubmitEditing={value =>
                    searchShipments(value.nativeEvent.text)
                  }
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
          ) : (
            <ListShipment shipments={shipments} />
          )}
        </>
      ) : (
        <Logout />
      )}
    </View>
  );
};
