import { ShipmentItemResponse } from "@models";
import React, { FunctionComponent } from "react";
import { FlatList } from "react-native";
import { ItemInfo } from "./ItemInfo";
interface Props {
  shipmentItems: Array<ShipmentItemResponse>;
}
export const ContentInfoTab: FunctionComponent<Props> = props => {
  const { shipmentItems } = props;
  const renderItem = ({ item }: { item: ShipmentItemResponse }) => {
    return <ItemInfo item={item} />;
  };

  return (
    <FlatList
      data={shipmentItems}
      keyExtractor={(item, index) => `$${item.ShipmentId}_${index}`}
      renderItem={renderItem}
    />
  );
};
