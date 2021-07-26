import LottieView from "lottie-react-native";
import React, { FunctionComponent, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <QRCodeScanner
        topContent={
          <Text style={styles.centerText}>{JSON.stringify(content)}</Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
        onRead={onRead}
        reactivate={true}
        reactivateTimeout={2000}
      />
      <LottieView
        source={require("../../assets/lottie/scan.json")}
        autoPlay
        loop
      />
    </View>
  );
};
