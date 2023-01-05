import { InventoryDetailTemp } from "@models";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
interface Props {
  item: InventoryDetailTemp;
  index: number;
  pieces: number;
}

export const InventoryItem: FunctionComponent<Props> = props => {
  const { item, pieces, index } = props;
  // console.log("item: ", JSON.stringify(item));
  // console.log("Pieces: ", pieces);

  const getBackgroundColor = (): string => {
    if (item.ExpectedPieces === pieces) {
      return Themes.colors.white;
    }

    if (item.ExpectedPieces > pieces) {
      return Themes.colors.danger60;
    }

    if (item.ExpectedPieces < pieces) {
      return Themes.colors.warningMain;
    }
    return Themes.colors.white;
  };

  return (
    <View style={styles.receiveItemContainer}>
      <View
        style={[
          styles.leftContainer,
          { backgroundColor: getBackgroundColor() },
        ]}
      >
        <Text style={styles.code}>
          {index + 1}. {item.ShipmentNumber}
        </Text>
        <Text style={styles.Pieces}>SL: {item.ExpectedPieces}</Text>
      </View>
      {/* <View style={styles.deleteItem}>
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={minusPieces}>
            <Icon
              name="ic_minus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
          <Text style={styles.code}>
            {item.ExpectedPieces}/{item.Pieces}
          </Text>
          <TouchableOpacity hitSlop={styles.hitSlop} onPress={plusPieces}>
            <Icon
              name="ic_plus"
              color={Themes.colors.danger60}
              size={Metrics.icons.small}
            />
          </TouchableOpacity>
        </View> */}
      {/* <View style={styles.deleteItemContainer}>
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
        </View> */}

      {/* <DeleteModal
          isVisible={isShowDeleteModal}
          closeModal={hideDeleteModal}
          message={translate("alert.deleteReceive", {
            number: item.ShipmentNumber,
          })}
          confirmDelete={confirmDelete}
        /> */}
      {/* {!!item.DispatchBagNumber && (
        <Text style={styles.bag}>
          {translate("label.bag")}: {item.DispatchBagNumber}
        </Text>
      )} */}
    </View>
  );
};
