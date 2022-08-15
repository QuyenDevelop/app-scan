import { SCREENS } from "@configs";
import { Alert, hasAndroidPermission, NavigationUtils } from "@helpers";
import { useToggle } from "@hooks";
import { ShipmentImages } from "@models";
import { ShipmentStackParamsList } from "@navigation";
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
import { RNCamera, TakePictureOptions } from "react-native-camera";
import FastImage from "react-native-fast-image";
import ImageResizer from "react-native-image-resizer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.UPLOAD_SCREEN
>;
export interface ReceiveUploadScreenParams {
  prefix: string;
  suffix: string;
  images?: Array<ShipmentImages> | [];
  reUpdateImagesList?: (
    photos: Array<ShipmentImages>,
    imgList?: Array<ShipmentImages>,
  ) => void;
}

export const ReceiveUploadImagesScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NavigationRoute>();
  const { images, prefix, suffix, reUpdateImagesList } = route?.params;
  const cameraRef = useRef<RNCamera>(null);
  const [uri, setUri] = useState<string>();
  const [isFlashMode, toggleFlashMode] = useToggle();
  const [photos, setPhotos] = useState<Array<string>>([]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options: TakePictureOptions = {
        quality: 0.5,
        orientation: "auto",
        imageType: "jpeg",
      };
      const data = await cameraRef.current?.takePictureAsync(options);
      setUri(data.uri);
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }

      let imageUri = data.uri;

      await ImageResizer.createResizedImage(
        data.uri,
        data.width,
        data.height,
        "JPEG",
        80,
      ).then(response => {
        imageUri = response.uri;
        // console.log(imageUri);
      });

      setPhotos(p => [...p, imageUri]);
      CameraRoll.save(imageUri).catch(err => {
        console.log("save err: ", err);
        Alert.error("error.saveImageFail");
      });
    }
  };

  const goToLibrary = () => {
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_PHOTOS_SCREEN,
      params: {
        images: images,
        reUpdateImagesList: reUpdateImagesList,
        prefix: prefix,
        suffix: suffix,
      },
    });
  };

  const uploadPhotoShipment = async () => {
    if (photos.length === 0) {
      Alert.warning("warning.noTakePhoto");
      return;
    }

    const current = new Date().getTime();
    const updatePhotos = photos.map((imageUrl: string, index: number) => {
      const name = `${prefix}_${current}_${index}.jpg`;
      return {
        uri: imageUrl,
        name: name,
      };
    });
    console.log("🚀🚀🚀 => updatePhotos => updatePhotos", updatePhotos);

    // uploadImageShipment(updatePhotos)
    //   .then(image => {
    //     // console.log(JSON.stringify(image));
    //     reUpdateImagesList ? reUpdateImagesList(image, images) : undefined;
    //     Alert.success(
    //       translate("success.autoUploadImage", { number: photos.length }),
    //       true,
    //     );
    //   })
    //   .finally(() => {
    //     setPhotos([]);
    //   });
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
              color={Themes.colors.white}
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
              <Image
                source={uri ? { uri } : Images.productDefault}
                style={styles.image}
              />
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
          <TouchableOpacity onPress={uploadPhotoShipment}>
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
