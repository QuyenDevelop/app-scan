import { uploadApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { useToggle } from "@hooks";
import { goToPhotoLibrary, ScanParamsList } from "@navigation";
import CameraRoll from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Themes } from "@themes";
import React, { FunctionComponent, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

type NavigationRoute = RouteProp<ScanParamsList, SCREENS.UPLOAD_SCREEN>;
export interface UploadScreenParams {
  shipment: string;
  service: string;
}

export const UploadScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
  const cameraRef = useRef(null);
  const [uri, setUri] = useState<string>();
  const [isFlashMode, toggleFlashMode] = useToggle();
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, imageType: "" };
      const data = await cameraRef.current?.takePictureAsync(options);
      setUri(data.uri);
      CameraRoll.save(data.uri)
        .then(() => {
          console.log("save success");
        })
        .catch(err => {
          console.log("save err: ", err);
        });

      const fileName = `${shipment}_${service}_${new Date().getTime()}.jpg`;
      const imageForm = new FormData();
      imageForm.append("files", {
        uri: data.uri,
        type: "image/jpeg",
        name: fileName,
      });
      uploadApi
        .uploadImage(imageForm)
        ?.then(response => {
          console.log("🚀🚀🚀 => uploadApi.uploadImage => response", response);
        })
        .catch(err => {
          console.log("🚀🚀🚀 => uploadApi.uploadImage => err", err);
        });
    }
  };

  const goToLibrary = () => {
    goToPhotoLibrary({ shipment: shipment, service: service });
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
          flashMode={
            isFlashMode
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          captureAudio={false}
        />

        <View style={styles.bottomCamera}>
          <TouchableOpacity onPress={goToLibrary}>
            {uri ? (
              <Image source={{ uri: uri }} style={styles.image} />
            ) : (
              <View
                style={[
                  styles.image,
                  {
                    backgroundColor: Themes.colors.black,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.capture} />
          </TouchableOpacity>
          <View
            style={[styles.capture, { backgroundColor: Themes.colors.white }]}
          />
        </View>
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
          <Text style={styles.flashText}>Flash</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
