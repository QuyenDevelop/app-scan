import { useShow } from "@hooks";
import { InventoryDetailTemp } from "@models";
import { Checkbox, DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  item: InventoryDetailTemp;
  index: number;
  Delete: (code: number) => void;
  Upgrades: (code: number, value: number) => void;
}

export const ShipmentItem: FunctionComponent<Props> = props => {
  const { item, index, Upgrades, Delete } = props;
  const [isShowDeleteModal, showDeleteModal, hideDeleteModal] = useShow();

  const confirmDelete = () => {
    Delete(index);
  };
  const plusPieces = () => {
    Upgrades(index, item.Pieces + 1);
  };
  const minusPieces = () => {
    Upgrades(index, item.Pieces - 1);
  };
  const onCheck = () => {
    Upgrades(index, item.ExpectedPieces);
  };

  const getBackgroundColor = (): string => {
    if (item.ExpectedPieces === item.Pieces) {
      return Themes.colors.white;
    }

    if (item.ExpectedPieces > item.Pieces) {
      return Themes.colors.danger60;
    }

    if (item.ExpectedPieces < item.Pieces) {
      return Themes.colors.warningMain;
    }
    return Themes.colors.white;
  };

  return (
    <View style={styles.receiveItemContainer}>
      <View style={styles.receiveItem}>
        <Checkbox
          checked={item.Pieces === item.ExpectedPieces}
          onChange={onCheck}
        />
        <View
          style={[
            styles.leftContainer,
            { backgroundColor: getBackgroundColor() },
          ]}
        >
          <Text style={styles.code}>{item.ShipmentNumber}</Text>
        </View>
        <View style={styles.deleteItem}>
          <TouchableOpacity onPress={minusPieces}>
            <Icon
              name="ic_minus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <Text style={styles.Pieces}>
            {item.ExpectedPieces}/{item.Pieces}
          </Text>
          <TouchableOpacity onPress={plusPieces}>
            <Icon
              name="ic_plus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.deleteItemContainer}>
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
            number: item.ShipmentNumber,
          })}
          confirmDelete={confirmDelete}
        />
      </View>
    </View>
  );
};
