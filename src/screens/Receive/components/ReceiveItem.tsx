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
  item: ReceiveBarcode;
  index: number;
  deleteItem: (value: string) => void;
  updatePieces: (index: number, value: number) => void;
  updateImages: (index: number, value: string[]) => void;
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const { item, index, deleteItem, updatePieces, updateImages } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();
  const [isShowPhotoModal, setShowPhotoModal, setHidePhotoModal] = useShow();
  const confirmDelete = () => {
    deleteItem(item.referenceNumber);
  };

  const plusPieces = () => {
    updatePieces(index, item.pieces + 1);
  };

  const minusPieces = () => {
    updatePieces(index, item.pieces - 1);
  };

  const onViewImage = () => {
    NavigationUtils.navigate(SCREENS.RECEIVE_STACK, {
      screen: SCREENS.RECEIVE_PHOTOS_SCREEN,
      params: {
        images: item.images,
        reUpdateImagesList: updateImages,
        prefix: item.referenceNumber,
        suffix: DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages,
      },
    });
  };

  const keyExtractor = (item: any, index: number) => `${item}_${index}`;
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={onViewImage} style={styles.ImageButton}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.images}
          resizeMode="cover"
        />
      </TouchableOpacity>
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
        <Text style={styles.code}>{item.referenceNumber}</Text>
        <View style={styles.deleteItem}>
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={minusPieces}>
            <Icon
              name="ic_minus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <TextInput
            defaultValue={item.pieces.toString()}
            style={styles.quantityInput}
            keyboardType="number-pad"
            contextMenuHidden={true}
            onChangeText={(text: string) => {
              updatePieces(index, Number(text));
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
          data={[
            "https://ttol.vietnamnetjsc.vn/images/2021/08/26/09/53/Ngoc-Mai-1.jpg",
            "https://ttol.vietnamnetjsc.vn/images/2021/08/26/09/53/Ngoc-Mai-2.jpg",
            "https://anhdep123.com/wp-content/uploads/2021/01/hinh-gai-xinh-deo-mat-kinh-toc-dai.jpg",
          ]}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <DeleteModal
        isVisible={isShowDeleteModal}
        closeModal={hideDeleteModal}
        message={translate("alert.deleteReceive", {
          number: item.referenceNumber,
        })}
        confirmDelete={confirmDelete}
      />
      <TakePhotoModal
        isShowModal={isShowPhotoModal}
        closeModal={setHidePhotoModal}
        shipment={item.referenceNumber}
        shipmentIndex={index}
        updateImages={updateImages}
        images={item.images}
      />
    </View>
  );
};
