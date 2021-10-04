import { useShow } from "@hooks";
import { DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  item: string;
  deleteItem: (value: string) => void;
}

export const ReceiveItem: FunctionComponent<Props> = props => {
  const { item, deleteItem } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();
  const confirmDelete = () => {
    deleteItem(item);
  };
  return (
    <View style={styles.receiveItem}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={showDeleteModal} hitSlop={styles.hitSlop}>
        <Icon
          name="ic_delete"
          color={Themes.colors.collGray40}
          size={Metrics.icons.small}
        />
      </TouchableOpacity>
      <DeleteModal
        isVisible={isShowDeleteModal}
        closeModal={hideDeleteModal}
        message={translate("alert.deleteReceive", { number: item })}
        confirmDelete={confirmDelete}
      />
    </View>
  );
};
