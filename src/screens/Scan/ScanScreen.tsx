import { shipmentApi } from "@api";
import { Header } from "@components";
import { useIsMounted, useShow } from "@hooks";
import { ShipmentResponse } from "@models";
import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import debounce from "lodash/debounce";
import React, { FunctionComponent, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ListShipment } from "./components/ListShipment";
import styles from "./styles";
export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState<string>("");
  const [isShowQrCode, showQrCode, hideQrCode] = useShow(true);
  const [shipments, setShipments] = useState<Array<ShipmentResponse>>([]);
  const isMounted = useIsMounted();

  const onRead = (e: any) => {
    setContent(e.data);
    getShipment(e.data);
  };

  const getShipment = (value: string) => {
    console.log("🚀🚀🚀 => fetchData => value", value);
    shipmentApi.scanShipment(value)?.then(shipment => {
      setShipments(shipment?.data || []);
      hideQrCode();
    });
  };

  const getShipmentOnType = useRef(debounce(getShipment, 500)).current;

  const searchShipments = (value: string) => {
    setContent(value);
    getShipmentOnType(value);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Check and scan" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <Text>Scan or type shipment/reference no</Text>
          <View style={styles.input}>
            <TextInput
              placeholder="Scan or type"
              style={styles.inputCode}
              defaultValue={content}
              onChangeText={searchShipments}
              placeholderTextColor={Themes.colors.collGray40}
            />
            <TouchableOpacity style={styles.scanButton} onPress={showQrCode}>
              <Icon
                name="ic_scanner"
                size={Metrics.icons.medium}
                color={Themes.colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanButton}>
              <Icon
                name="ic_arrow_right"
                size={Metrics.icons.medium}
                color={Themes.colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {isShowQrCode ? (
        <QRCodeScanner
          onRead={onRead}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker
          fadeIn={true}
          // customMarker={<View style={styles.markerView} />}
        />
      ) : (
        <ListShipment shipments={shipments} />
      )}
    </View>
  );
};
