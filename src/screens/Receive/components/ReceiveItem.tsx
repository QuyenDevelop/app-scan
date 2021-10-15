import { useShow } from "@hooks";
import { Barcode } from "@screens";
import { DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  item: Barcode;
  deleteItem: (value: string) => void;
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const { item, deleteItem } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();
  const confirmDelete = () => {
    deleteItem(item.referenceNumber);
  };
  return (
    <View style={styles.receiveItem}>
      <Text style={styles.code}>{item.referenceNumber}</Text>
      <View style={styles.deleteItem}>
        <Text>
          {translate("label.quantity")}
          <Text style={styles.code}> {item.pieces}</Text>
        </Text>
        <TouchableOpacity onPress={showDeleteModal} hitSlop={styles.hitSlop}>
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
