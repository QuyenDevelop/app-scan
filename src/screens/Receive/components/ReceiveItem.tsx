/* eslint-disable react-native/no-inline-styles */
import { ScreenUtils } from "@helpers";
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
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const { item, index, deleteItem, updatePieces } = props;
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

  const onViewImage = () => {};

  const keyExtractor = (item: any, index: number) => `${item}_${index}`;
  const renderItem = ({ item }: { item: any }) => {
    console.log("🚀🚀🚀 => renderItem => item", item);
    return (
      <TouchableOpacity style={styles.ImageButton} onPress={onViewImage}>
        <Image
          source={{
            uri: "https://cdn.efex.asia/file/fmobile/2021/11/21/IB08211079549JP_009_1637538240665_0_shipment_add_service_suffix.jpg",
          }}
          style={styles.images}
          resizeMode="contain"
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
          data={["1", "2"]}
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
        reUpdateImagesList={() => {}}
        images={[]}
      />
    </View>
  );
};
