import { CONSTANT, SCREENS } from "@configs";
import {
  Alert,
  getAsyncItem,
  hasAndroidPermission,
  setAsyncItem,
} from "@helpers";
import { useToggle } from "@hooks";
import { StorageImages } from "@models";
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
import {
  DeviceEventEmitter,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera, TakePictureOptions } from "react-native-camera";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.UPLOAD_SCREEN
>;
export interface UploadScreenParams {
  prefix: string;
  suffix: string;
}

export const UploadScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NavigationRoute>();
  const { prefix, suffix } = route?.params;
  const cameraRef = useRef<RNCamera>(null);
  const [uri, setUri] = useState<string>();
  const [isFlashMode, toggleFlashMode] = useToggle();
  const [photos, setPhotos] = useState<Array<string>>([]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options: TakePictureOptions = { quality: 0.5, orientation: "auto" };
      const data = await cameraRef.current?.takePictureAsync(options);
      setUri(data.uri);
      setPhotos(p => [...p, data.uri]);
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
      CameraRoll.save(data.uri).catch(err => {
        console.log("save err: ", err);
        Alert.error("error.saveImageFail");
      });
    }
  };

  const goToLibrary = () => {
    goToPhotoLibrary({ prefix: prefix, suffix: suffix });
  };

  const uploadPhoto = async () => {
    if (photos.length === 0) {
      Alert.warning("warning.noTakePhoto");
      return;
    }

    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );

    const current = new Date().getTime();
    const savePhotos = photos.map((image: string, index: number) => {
      return {
        name: `${prefix}_${current}_${index}_${suffix}.jpg`,
        uri: image,
      };
    });

    let listPush: Array<StorageImages> = [];
    if (listImages) {
      listPush = [...listImages, ...savePhotos];
    } else {
      listPush = [...savePhotos];
    }

    const storage = await setAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
      listPush,
    );

    if (storage) {
      DeviceEventEmitter.emit(CONSTANT.EVENT_KEY.UPLOAD_IMAGES);
      setPhotos([]);
      Alert.success(
        translate("success.autoUploadImage", { number: photos.length }),
        true,
      );
    } else {
      Alert.error(translate("error.errorServer"));
    }
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
          <TouchableOpacity onPress={uploadPhoto}>
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
