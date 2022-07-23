import { useShow } from "@hooks";
import { ReceiveBarcode } from "@screens";
import { DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ReceiveBarcode;
  index: number;
  deleteItem: (value: string) => void;
  updatePieces: (index: number, value: number) => void;
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const { item, index, deleteItem, updatePieces } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();
  const confirmDelete = () => {
    deleteItem(item.referenceNumber);
  };

  const plusPieces = () => {
    updatePieces(index, item.pieces + 1);
  };

  const minusPieces = () => {
    updatePieces(index, item.pieces - 1);
  };
  return (
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
          onPress={showDeleteModal}
          hitSlop={styles.hitSlop}
          style={styles.deleteBtn}
        >
          <Icon
            name="ic_delete"
            color={Themes.colors.collGray40}
            size={Metrics.icons.small}
          />
        </TouchableOpacity>
      </View>
      <DeleteModal
        isVisible={isShowDeleteModal}
        closeModal={hideDeleteModal}
        message={translate("alert.deleteReceive", {
          number: item.referenceNumber,
        })}
        confirmDelete={confirmDelete}
      />
    </View>
  );
};
