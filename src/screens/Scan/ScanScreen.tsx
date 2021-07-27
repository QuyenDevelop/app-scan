import React, { FunctionComponent, useState } from "react";
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
export const ScanScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState({});

  const onRead = (e: any) => {
    console.log("🚀🚀🚀 => onRead => e", JSON.stringify(e));
    setContent(e);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <QRCodeScanner
          onRead={onRead}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker
          topContent={
            <TextInput placeholder="Scan or type" style={styles.inputCode} />
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
