import { ShipmentResponse } from "@models";
import React, { FunctionComponent, useCallback } from "react";
import { FlatList } from "react-native";
import { Shipment } from "./Shipment";

interface Props {
  shipments: Array<ShipmentResponse>;
}
export const ListShipment: FunctionComponent<Props> = props => {
  const { shipments } = props;
  const keyExtractor = useCallback(item => item.ShipmentNumber, []);
  const renderItem = useCallback(
    ({ item }: { item: any }) => <Shipment item={item} />,
    [],
  );
  return (
    <FlatList
      data={shipments}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
