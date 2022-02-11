import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import {
  Alert,
  hasAndroidPermission,
  ScreenUtils,
  storeImageUploadFail,
  uploadImageService,
  uploadImageShipment,
} from "@helpers";
import { useShow, useToggle } from "@hooks";
import { ShipmentImages, StorageImages } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import CameraRoll, {
  PhotoIdentifier,
} from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon, ImagesModal, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  DeviceEventEmitter,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import BigList from "react-native-big-list";
import ImageResizer from "react-native-image-resizer";
import { UploadWaitingModal } from "./components/UploadWaitingModal";
import { ImageItem } from "./ImageItem";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.PHOTO_LIBRARY_SCREEN
>;
export interface PhotoLibraryScreenParams {
  prefix: string;
  suffix: string;
  images?: Array<ShipmentImages> | [];
  reUpdateImagesList?: (
    photos: Array<ShipmentImages>,
    imgList?: Array<ShipmentImages>,
  ) => void;
}

const ITEM_HEIGHT = (ScreenUtils.WIDTH - ScreenUtils.scale(32)) / 3;

export const PhotoLibraryScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { prefix, suffix, images, reUpdateImagesList } = route?.params;
  // const [isShowDelete, showDelete, hideDelete] = useShow();
  const [photos, setPhotos] = useState<Array<PhotoIdentifier>>([]);
  const [photosShow, setPhotosShow] = useState<Array<string>>([]);
  const [photosSelected, setPhotosSelected] = useState<Array<string>>([]);
  const [after, setAfter] = useState<string>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isSelectMode, toggleMode] = useToggle();
  const [isShowImage, showImage, hideImage] = useShow();
  const [isWaiting, setWaiting] = useState<boolean>(false);
  const [indexShowImage, setIndexShowImage] = useState<number>(0);

  const getAllPhotos = useCallback(async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 40,
      assetType: "Photos",
      after: after,
      // groupTypes: "Album",
      // groupName: CONSTANT.ALBUMS,
    })
      .then(r => {
        setPhotos(p => [...p, ...r.edges]);
        setAfter(r.page_info.end_cursor);
        setHasNextPage(r.page_info.has_next_page);
      })
      .catch(() => {
        Alert.error("error.errorServer");
      });
  }, [after]);

  useEffect(() => {
    getAllPhotos();
  }, []);

  useEffect(() => {
    setPhotosShow(photos.map(photo => photo.node.image.uri));
  }, [photos]);

  const onEndReached = () => {
    if (hasNextPage) {
      getAllPhotos();
    }
  };

  const isSelected = (uri: string) => {
    return photosSelected.includes(uri);
  };

  const onSelect = (uri: string, index: number) => {
    if (!isSelectMode) {
      setIndexShowImage(index);
      showImage();
      return;
    }

    if (isSelected(uri)) {
      setPhotosSelected(image => image.filter(img => img !== uri));
    } else {
      setPhotosSelected(image => [...image, uri]);
    }
  };

  const uploadImages = async () => {
    console.log("🚀🚀🚀 => upload images for services Shipment");
    if (photosSelected.length === 0) {
      Alert.warning("warning.noPhotoSelected");
      return;
    }

    const current = new Date().getTime();
    const savePhotos: Array<StorageImages> = [];
    const numOfPhotos = photosSelected.length;
    for (let index = 0; index < numOfPhotos; index++) {
      const uri = photosSelected[index];
      const photo = photos.find(image => image.node.image.uri === uri);
      let imageUri = uri;
      if (photo) {
        await ImageResizer.createResizedImage(
          uri,
          photo.node.image.width || ScreenUtils.WIDTH,
          photo.node.image.height || ScreenUtils.HEIGHT,
          "JPEG",
          50,
        ).then(response => {
          imageUri = response.uri;
        });
      }

      savePhotos.push({
        name: `${prefix}_${current}_${index}_${suffix}.jpg`,
        uri: imageUri,
      });
    }

    uploadImageService(savePhotos).then(image => {
      const imagesFail = savePhotos.filter(item => !image.includes(item.name));
      storeImageUploadFail(imagesFail).then(() => {
        DeviceEventEmitter.emit(CONSTANT.EVENT_KEY.UPLOAD_IMAGES);
      });
    });

    toggleMode();
    setPhotosSelected([]);
    Alert.success(
      translate("success.autoUploadImage", { number: photosSelected.length }),
      true,
    );
  };

  const uploadPhotoShipment = async () => {
    // ----------- update lại state ListImages của component cha nếu reUdate() đc truyền
    setWaiting(true);
    console.log(
      "🚀🚀🚀 => update lại state ListImages của component cha nếu reUdate() đc truyền",
    );
    if (photos.length === 0) {
      Alert.warning("warning.noTakePhoto");
      return;
    }

    const current = new Date().getTime();
    const updatePhotos: Array<{ name: string; uri: string }> = [];
    const numOfPhotos = photosSelected.length;
    for (let index = 0; index < numOfPhotos; index++) {
      const uri = photosSelected[index];
      const photo = photos.find(image => image.node.image.uri === uri);
      let imageUri = uri;
      if (photo) {
        await ImageResizer.createResizedImage(
          uri,
          photo.node.image.width || ScreenUtils.WIDTH,
          photo.node.image.height || ScreenUtils.HEIGHT,
          "JPEG",
          50,
        ).then(response => {
          imageUri = response.uri;
        });
      }
      updatePhotos.push({
        name: `${prefix}_${current}_${index}_${suffix}.jpg`,
        uri: imageUri,
      });
    }
    uploadImageShipment(updatePhotos)
      .then(image => {
        console.log(image);
        reUpdateImagesList ? reUpdateImagesList(image, images) : undefined;
        Alert.success(
          translate("success.autoUploadImage", {
            number: photosSelected.length,
          }),
          true,
        );
        navigation.goBack();
      })
      .finally(() => {
        setWaiting(false);
      });
    toggleMode();
    setPhotosSelected([]);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isCheck = isSelected(item.node.image.uri);
    return (
      <ImageItem
        uri={item.node.image.uri}
        isChecked={isCheck}
        onSelect={onSelect}
        index={index}
      />
    );
  };

  const deletePhotos = () => {
    CameraRoll.deletePhotos(photosSelected).then(() => {
      Alert.success("success.deleteSuccess");
      setPhotos(listPhoto =>
        listPhoto.filter(p => !photosSelected.includes(p.node.image.uri)),
      );
      setPhotosSelected([]);
    });
  };

  const changeMode = () => {
    setPhotosSelected([]);
    toggleMode();
  };

  const keyExtractor = useCallback((item: any) => `${item.node.image.uri}`, []);

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.photoLibraryScreen")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
        titleRight={
          isSelectMode ? translate("button.cancel") : translate("button.choose")
        }
        titleRightStyle={styles.titleRight}
        titleRightOnPress={changeMode}
      />
      <View style={styles.content}>
        <BigList
          data={photos}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={3}
          onEndReachedThreshold={0.8}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          itemHeight={ITEM_HEIGHT}
          contentContainerStyle={styles.contentContainer}
        />
        {isSelectMode && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              disabled={photosSelected.length === 0}
              onPress={deletePhotos}
            >
              <Icon
                name="ic_delete"
                size={Metrics.icons.medium}
                color={
                  photosSelected.length > 0
                    ? Themes.colors.coolGray100
                    : Themes.colors.collGray40
                }
              />
            </TouchableOpacity>
            <Text>
              {translate("label.selectedNumber", {
                number: photosSelected.length,
              })}
            </Text>
            <TouchableOpacity
              disabled={photosSelected.length === 0}
              onPress={reUpdateImagesList ? uploadPhotoShipment : uploadImages}
            >
              <Icon
                name="ic_upload_2"
                size={Metrics.icons.medium}
                color={
                  photosSelected.length > 0
                    ? Themes.colors.coolGray100
                    : Themes.colors.collGray40
                }
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <DeleteModal
        isVisible={isShowDelete}
        closeModal={hideDelete}
        message={translate("alert.deleteImages", {
          number: photosSelected.length,
        })}
        confirmDelete={deletePhotos}
      /> */}
      <ImagesModal
        images={photosShow}
        isVisible={isShowImage}
        closeModal={hideImage}
        index={indexShowImage}
        isLocalImage={true}
      />
      <UploadWaitingModal isVisible={isWaiting} />
    </View>
  );
};
