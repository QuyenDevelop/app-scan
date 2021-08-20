import { shipmentApi } from "@api";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { goToShipmentDetail, goToShipmentsScreen } from "@navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EnterCodeModal } from "./components/EnterCodeModal";
import styles from "./styles";

export interface ScanScreenParams {
  searchContent?: string;
}

export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isLoadingFetchData, showIsLoadingFetchData, hideIsLoadingFetchData] =
    useShow();
  const [content, setContent] = useState<string>("");
  const [isShowEnterCode, showEnterCode, hideEnterCode] = useShow();
  const [errorContent, setErrorContent] = useState<string>("");

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    setErrorContent("");
    if (value === "") {
      return;
    }
    showIsLoadingFetchData();
    shipmentApi
      .scanShipment(value)
      ?.then(shipment => {
        if (shipment?.success && shipment?.data) {
          if (shipment.data.length === 0) {
            setErrorContent(translate("error.noShipment"));
            return;
          }

          if (shipment.data.length === 1) {
            goToShipmentDetail({ item: shipment.data[0] });
            return;
          }

          goToShipmentsScreen({
            refNumber: content,
            shipments: shipment.data,
          });
        } else {
          setErrorContent(shipment?.message || "");
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        Keyboard.dismiss();
        setContent("");
        hideIsLoadingFetchData();
      });
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <QRCodeScanner
          onRead={onRead}
          reactivate={true}
          reactivateTimeout={2000}
          fadeIn={true}
          cameraStyle={styles.camera}
        />
      )}
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
          <View style={styles.centerLeftView} />
          <View style={styles.centerCenterView}>
            {isLoadingFetchData && (
              <View style={styles.loadingView}>
                <ActivityIndicator color={Themes.colors.collGray40} />
              </View>
            )}
          </View>
          <View style={styles.centerLeftView} />
        </View>
        <View
          style={[styles.bottomView, { paddingBottom: insets.bottom + 30 }]}
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
