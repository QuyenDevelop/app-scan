import { SCREENS } from "@configs";
import { hasAndroidPermission } from "@helpers";
import { useToggle } from "@hooks";
import { goToPhotoLibrary, ShipmentStackParamsList } from "@navigation";
import CameraRoll from "@react-native-community/cameraroll";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Icon, Text, translate } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent, useRef, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.UPLOAD_SCREEN
>;
export interface UploadScreenParams {
  shipment: string;
  service: string;
}

export const UploadScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
  const cameraRef = useRef<RNCamera>(null);
  const [uri, setUri] = useState<string>();
  const [isFlashMode, toggleFlashMode] = useToggle();
  const [photos, setPhotos] = useState<Array<string>>([]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, imageType: "" };
      const data = await cameraRef.current?.takePictureAsync(options);
      setUri(data.uri);
      setPhotos(p => [...p, data.uri]);
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(data.uri)
        .then(() => {
          console.log("save success");
        })
        .catch(err => {
          console.log("save err: ", err);
        });
    }
  };

  const goToLibrary = () => {
    goToPhotoLibrary({ shipment: shipment, service: service });
  };
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        {isFocused && (
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
              message: "Need camera access for upload images",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
            captureAudio={false}
          />
        )}
      </View>
      <View style={styles.coverView}>
        <View style={[styles.headerView, { marginTop: insets.top }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={
                isFlashMode ? Themes.colors.warning50 : Themes.colors.white
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlashMode}>
            <Icon
              name="ic_flash"
              size={Metrics.icons.large}
              color={
                isFlashMode ? Themes.colors.warning50 : Themes.colors.white
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.flex1} />
        <View
          style={[styles.bottomCamera, { marginBottom: insets.bottom + 10 }]}
        >
          <View style={styles.imageThumbnail}>
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
            {photos.length > 0 && (
              <Text style={styles.imageThumbnailText}>
                {photos.length < 10 && (
                  <Text style={styles.imageThumbnailText}>0</Text>
                )}
                {translate("label.countPhoto", { number: photos.length })}
              </Text>
            )}
          </View>

          <TouchableOpacity onPress={takePicture}>
            <FastImage source={Images.icTakePhoto} style={styles.takePicture} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <Icon
              name="ic_upload_1"
              size={Metrics.icons.xxl}
              color={Themes.colors.transparentBlack70}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
