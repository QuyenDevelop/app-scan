import { Header } from "@components";
import { useShow } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "@themes";
import React, { FunctionComponent, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export interface UploadScreenParams {
  item: any;
}
export const UploadScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [uri, setUri] = useState<string>();
  const [isFlashMode, showFlashMode, hideFlashMode] = useShow();
  const takePicture = async () => {
    if (cameraRef.current) {
      console.log("TakePicture");
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current?.takePictureAsync(options);
      setUri(data.uri);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Upload Image"
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
      />
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.off}
        />
        <View style={styles.bottomCamera}>
          <Image source={{ uri: uri }} style={styles.image} />
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.capture} />
          </TouchableOpacity>
          <View
            style={[styles.capture, { backgroundColor: Themes.colors.white }]}
          />
        </View>
      </View>
    </View>
  );
};
