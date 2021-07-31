import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { ScanParamsList } from "@navigation";
import CameraRoll from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { DeviceEventEmitter, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageItem } from "./ImageItem";
import styles from "./styles";

type NavigationRoute = RouteProp<ScanParamsList, SCREENS.UPLOAD_SCREEN>;
export interface PhotoLibraryScreenParams {
  shipment: string;
  service: string;
}

export const PhotoLibraryScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
  const [photos, setPhotos] = useState([]);
  const [photosSelected, setPhotosSelected] = useState<Array<string>>([]);
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const getAllPhotos = () => {
    CameraRoll.getPhotos({
      first: 40,
      assetType: "Photos",
      after: after,
    })
      .then(r => {
        setPhotos(photos => [...photos, ...r.edges]);
        setAfter(r.page_info.end_cursor);
        setHasNextPage(r.page_info.has_next_page);
      })
      .catch(err => {
        console.log("🚀🚀🚀 => getAllPhotos => err", err);
        //Error Loading Images
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
    // const listImages = await getAsyncItem(
    //   CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    // );

    // let listPush: Array<any> = [];
    // if (listImages) {
    //   listPush = [
    //     ...listImages,
    //     {
    //       shipment: shipment,
    //       service: service,
    //       photos: photosSelected,
    //     },
    //   ];
    // } else {
    //   listPush.push({
    //     shipment: shipment,
    //     service: service,
    //     photos: photosSelected,
    //   });
    // }

    // const storage = await setAsyncItem(
    //   CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    //   listPush,
    // );

    // if (storage) {
    //   DeviceEventEmitter.emit(CONSTANT.EVENT_KEY.UPLOAD_IMAGES);
    // }

    DeviceEventEmitter.emit(CONSTANT.EVENT_KEY.UPLOAD_IMAGES, {
      shipment: shipment,
      service: service,
      photos: photosSelected,
    });
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Photo library"
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        iconRightName={["ic_arrow_up"]}
        iconRightOnPress={[uploadImages]}
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
