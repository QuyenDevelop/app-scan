/* eslint-disable react-native/no-inline-styles */
import { DATA_CONSTANT, SCREENS } from "@configs";
import { NavigationUtils, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { ReceiveBarcode } from "@screens";
import { DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { TakePhotoModal } from "./TakePhotoModal";
interface Props {
  ShipmentData: ReceiveBarcode;
  shipmentIndex: number;
  deleteItem: (value: string) => void;
  updatePieces: (index: number, value: number) => void;
  updateImages: (index: number, value: string[]) => void;
  deleteImage: (index: number, value: string) => void;
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const {
    ShipmentData,
    shipmentIndex,
    deleteItem,
    updatePieces,
    updateImages,
    deleteImage,
  } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();
  const [isShowPhotoModal, setShowPhotoModal, setHidePhotoModal] = useShow();
  const confirmDelete = () => {
    deleteItem(ShipmentData.referenceNumber);
  };

  const plusPieces = () => {
    updatePieces(shipmentIndex, ShipmentData.pieces + 1);
  };

  const minusPieces = () => {
    updatePieces(shipmentIndex, ShipmentData.pieces - 1);
  };

  const onViewImage = () => {
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_PHOTOS_SCREEN,
      params: {
        images: ShipmentData.images,
        shipmentIndex: shipmentIndex,
        reUpdateImagesList: updateImages,
        prefix: ShipmentData.referenceNumber,
        suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
      },
    });
  };

  const keyExtractor = (item: any) => `${item}_`;
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={{ paddingTop: ScreenUtils.scale(4) }}>
        <TouchableOpacity onPress={onViewImage} style={styles.ImageButton}>
          <Image
            source={{
              uri: item,
            }}
            style={styles.images}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteImage}
          onPress={() => deleteImage(shipmentIndex, item)}
        >
          <Icon
            name="ic_close"
            color={Themes.colors.white}
            size={Metrics.icons.smallTiny}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Themes.colors.colGray20,
        paddingVertical: ScreenUtils.scale(8),
      }}
    >
      <View style={styles.receiveItem}>
        <Text style={styles.code}>{ShipmentData.referenceNumber}</Text>
        <View style={styles.deleteItem}>
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={minusPieces}>
            <Icon
              name="ic_minus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <TextInput
            defaultValue={ShipmentData.pieces.toString()}
            style={styles.quantityInput}
            keyboardType="number-pad"
            contextMenuHidden={true}
            onChangeText={(text: string) => {
              updatePieces(shipmentIndex, Number(text));
            }}
          />
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={plusPieces}>
            <Icon
              name="ic_plus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={setShowPhotoModal}
            hitSlop={styles.hitSlop}
            style={styles.deleteBtn}
          >
            <Icon
              name="ic_camera"
              color={Themes.colors.coolGray100}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showDeleteModal}
            hitSlop={styles.hitSlop}
            style={styles.deleteBtn}
          >
            <Icon
              name="ic_delete"
              color={Themes.colors.coolGray60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imagesListContainer}>
        <FlatList
          data={ShipmentData.images}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <DeleteModal
        isVisible={isShowDeleteModal}
        closeModal={hideDeleteModal}
        message={translate("alert.deleteReceive", {
          number: ShipmentData.referenceNumber,
        })}
        confirmDelete={confirmDelete}
      />
      <TakePhotoModal
        isShowModal={isShowPhotoModal}
        closeModal={setHidePhotoModal}
        shipment={ShipmentData.referenceNumber}
        shipmentIndex={shipmentIndex}
        updateImages={updateImages}
        images={ShipmentData.images}
      />
    </View>
  );
};
