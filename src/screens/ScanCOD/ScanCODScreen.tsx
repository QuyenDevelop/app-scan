import { shipmentApi } from "@api";
import { Header, RequireLogin } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { Account, ShipmentCODResponse } from "@models";
import { goToUpdateCodScreen } from "@navigation";
import { useIsFocused } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
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
  const isFocused = useIsFocused();
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
        console.log("🚀🚀🚀 => getShipment => shipment", shipment);
        if (shipment?.success) {
          setContent("");
          goToUpdateCodScreen({ item: shipment?.data });
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

  // const getShipmentOnType = useRef(debounce(getShipment, 500)).current;

  const searchShipments = (value: string) => {
    setContent(value);
    // getShipmentOnType(value);
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
    <View style={styles.container}>
      <Header title={translate("screens.codScreen")} />
      {profile ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <Text>{translate("label.scanOrTypeShipment")}</Text>
              <View style={styles.input}>
                <View style={styles.inputCode}>
                  <TextInput
                    placeholder={translate("placeholder.scanOrType")}
                    style={styles.flex1}
                    defaultValue={content}
                    onChangeText={searchShipments}
                    placeholderTextColor={Themes.colors.collGray40}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    returnKeyType="search"
                    returnKeyLabel={translate("button.search")}
                    onSubmitEditing={value => {
                      searchShipments(value.nativeEvent.text);
                      getShipment(value.nativeEvent.text);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => {
                      Keyboard.dismiss();
                      getShipment(content);
                    }}
                  >
                    <Icon
                      name="ic_search"
                      size={Metrics.icons.small}
                      color={Themes.colors.black}
                    />
                  </TouchableOpacity>
                </View>

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
              <ActivityIndicator color={Themes.colors.collGray40} />
            </View>
          ) : isShowQrCode && isFocused ? (
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
