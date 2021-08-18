import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import {
  Alert,
  getAsyncItem,
  hasAndroidPermission,
  setAsyncItem,
} from "@helpers";
import { useShow } from "@hooks";
import { StorageImages } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import CameraRoll, {
  PhotoIdentifier,
} from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DeleteModal, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageItem } from "./ImageItem";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.PHOTO_LIBRARY_SCREEN
>;
export interface PhotoLibraryScreenParams {
  shipment: string;
  service: string;
}

export const PhotoLibraryScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
  const [isShowDelete, showDelete, hideDelete] = useShow();
  const [photos, setPhotos] = useState<Array<PhotoIdentifier>>([]);
  const [photosSelected, setPhotosSelected] = useState<Array<string>>([]);
  const [after, setAfter] = useState<string>();
  const [hasNextPage, setHasNextPage] = useState(false);
  const getAllPhotos = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 40,
      assetType: "Photos",
      after: after,
    })
      .then(r => {
        setPhotos(p => [...p, ...r.edges]);
        setAfter(r.page_info.end_cursor);
        setHasNextPage(r.page_info.has_next_page);
      })
      .catch(() => {
        Alert.error("error.errorServer");
      });
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  const onEndReached = () => {
    if (hasNextPage) {
      getAllPhotos();
    }
  };

  const isSelected = (uri: string) => {
    return photosSelected.includes(uri);
  };

  const onSelect = (uri: string) => {
    if (isSelected(uri)) {
      setPhotosSelected(images => images.filter(image => image !== uri));
    } else {
      setPhotosSelected(images => [...images, uri]);
    }
  };

  const uploadImages = async () => {
    if (photosSelected.length === 0) {
      Alert.warning("warning.noPhotoSelected");
      return;
    }
    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );

    const current = new Date().getTime();
    const savePhotos = photosSelected.map((image: string, index: number) => {
      return {
        name: `${shipment}_${service}_${current}_${index}.jpg`,
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
      setPhotosSelected([]);
      Alert.success(
        translate("success.autoUploadImage", { number: photosSelected.length }),
        true,
      );
    } else {
      Alert.error(translate("error.errorServer"));
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const isCheck = isSelected(item.node.image.uri);
    return (
      <ImageItem
        uri={item.node.image.uri}
        isChecked={isCheck}
        onSelect={onSelect}
      />
    );
  };

  const deletePhotos = () => {};

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.photoLibraryScreen")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.content}>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => `${item.node.image.uri}_${index}`}
          renderItem={renderItem}
          numColumns={3}
          onEndReachedThreshold={0.8}
          onEndReached={onEndReached}
        />
        <View style={styles.bottomView}>
          <TouchableOpacity
            disabled={photosSelected.length === 0}
            onPress={showDelete}
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
            onPress={uploadImages}
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
      </View>

      <DeleteModal
        isVisible={isShowDelete}
        closeModal={hideDelete}
        message={translate("alert.deleteImages", {
          number: photosSelected.length,
        })}
        confirmDelete={deletePhotos}
      />
    </View>
  );
};
