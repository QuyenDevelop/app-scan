import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import {
  Alert,
  getAsyncItem,
  hasAndroidPermission,
  setAsyncItem,
} from "@helpers";
import { StorageImages } from "@models";
import { ShipmentStackParamsList } from "@navigation";
import CameraRoll, {
  PhotoIdentifier,
} from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IRootState, SavePhoto, UploadImageAction } from "@redux";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { DeviceEventEmitter, FlatList, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const imagesReducer = useSelector(
    (state: IRootState) => state.uploadImage.images,
  ) as Array<SavePhoto> | [];
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
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
      dispatch(
        UploadImageAction.updateImages([...imagesReducer, ...savePhotos]),
      );
      DeviceEventEmitter.emit(CONSTANT.EVENT_KEY.UPLOAD_IMAGES);
      setPhotosSelected([]);
      Alert.success("success.autoUploadImage");
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

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.photoLibraryScreen")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        iconRightName={["ic_upload"]}
        iconRightOnPress={[uploadImages]}
        titleColor={Themes.colors.white}
      />
      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item.node.image.uri}_${index}`}
        renderItem={renderItem}
        numColumns={4}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
};
