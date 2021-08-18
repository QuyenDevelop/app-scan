import { shipmentApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { ImagesAddService } from "@models";
import { goToPhotoLibrary, ShipmentStackParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DeleteModal, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageItem } from "./ImageItem";
import styles from "./styles";

type NavigationRoute = RouteProp<
  ShipmentStackParamsList,
  SCREENS.ADD_SERVICE_PHOTOS_SCREEN
>;
export interface AddServicePhotosScreenParams {
  shipment: string;
  service: string;
  photosService: Array<ImagesAddService>;
}

export const AddServicePhotosScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const [isShowDelete, showDelete, hideDelete] = useShow();
  const [isLoading, showLoading, hideLoading] = useShow();
  const { shipment, service, photosService } = route?.params || {};
  const [photos, setPhotos] = useState<Array<ImagesAddService>>(
    photosService || [],
  );
  const [photosSelected, setPhotosSelected] = useState<Array<string>>([]);

  const isSelected = (id: string) => {
    return photosSelected.includes(id);
  };

  const onSelect = (id: string) => {
    if (isSelected(id)) {
      setPhotosSelected(images => images.filter(image => image !== id));
    } else {
      setPhotosSelected(images => [...images, id]);
    }
  };

  const renderItem = ({ item }: { item: ImagesAddService }) => {
    const isCheck = isSelected(item.Id);
    return (
      <ImageItem
        id={item.Id}
        uri={item.Url}
        isChecked={isCheck}
        onSelect={onSelect}
      />
    );
  };

  const goToLibrary = () => {
    goToPhotoLibrary({ shipment: shipment, service: service });
  };

  const deletePhotos = () => {
    showLoading();
    shipmentApi
      .deleteImagesAddService(photosSelected)
      ?.then(response => {
        console.log("🚀🚀🚀 => deletePhotos => response", response);
        if (response.success) {
          setPhotos(images =>
            images.filter(image => !photosSelected.includes(image.Id)),
          );
          setPhotosSelected([]);
          Alert.success("success.deleteSuccess");
        } else {
          Alert.error(response.message, true);
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        hideLoading();
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.addServiceScreen")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.content}>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={renderItem}
          numColumns={3}
        />
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={goToLibrary}>
            <Icon
              name="ic_library"
              size={Metrics.icons.medium}
              color={Themes.colors.coolGray100}
            />
          </TouchableOpacity>
          <Text>
            {translate("label.selectedNumber", {
              number: photosSelected.length,
            })}
          </Text>
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
        </View>
        {isLoading && (
          <View style={styles.loadingView}>
            <ActivityIndicator color={Themes.colors.white} />
          </View>
        )}
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
